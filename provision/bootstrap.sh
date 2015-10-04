#!/usr/bin/env bash
log_location='/tmp/provision.log'

echo "Start provisioning..." | tee -a ${log_location}

start_seconds="$(date +%s)"

if [[ ! -d /var/www/html ]]; then
    mkdir /var/www/html
fi

# Capture a basic ping result to Google's primary DNS server to determine if
# outside access is available to us. If this does not reply after 2 attempts,
# we try one of Level3's DNS servers as well. If neither IP replies to a ping,
# then we'll skip a few things further in provisioning rather than creating a
# bunch of errors.
ping_result="$(ping -c 2 8.8.4.4 2>&1)"
if [[ $ping_result != *bytes?from* ]]; then
    ping_result="$(ping -c 2 4.2.2.2 2>&1)"
fi

# PACKAGE INSTALLATION
#
# Build a bash array to pass all of the packages we want to install to a single
# apt-get command. This avoids doing all the leg work each time a package is
# set to install. It also allows us to easily comment out or add single
# packages. We set the array as empty to begin with so that we can append
# individual packages to it as required.
apt_package_install_list=()

# Start with a bash array containing all packages we want to install in the
# virtual machine. We'll then loop through each of these and check individual
# status before adding them to the apt_package_install_list array.
apt_package_check_list=(

    nodejs
    nginx
    git
    curl
    unzip

)

echo "Check for apt packages to install..." | tee -a ${log_location}

# Loop through each of our packages that should be installed on the system. If
# not yet installed, it should be added to the array of packages to install.
for pkg in "${apt_package_check_list[@]}"; do
    package_version="$(dpkg -s $pkg 2>&1 | grep 'Version:' | cut -d " " -f 2)"
    if [[ -n "${package_version}" ]]; then
        space_count="$(expr 20 - "${#pkg}")" #11
        pack_space_count="$(expr 30 - "${#package_version}")"
        real_space="$(expr ${space_count} + ${pack_space_count} + ${#package_version})"
        printf " * $pkg %${real_space}.${#package_version}s ${package_version}\n" | tee -a ${log_location}
    else
        echo " *" $pkg [not installed] | tee -a ${log_location}
        apt_package_install_list+=($pkg)
    fi
done


if [[ $ping_result == *bytes?from* ]]; then

    echo "Generating & Configuring locales" | tee -a ${log_location}
    sudo locale-gen en_US en_US.UTF-8 es_ES.UTF-8 es_ES &>> ${log_location}
    sudo dpkg-reconfigure locales &>> ${log_location}

    echo "Add Node from deb.nodesource.com" | tee -a ${log_location}
    curl -sL https://deb.nodesource.com/setup_4.x | sudo bash &>> ${log_location}

    echo "Add nginx to sources" | tee -a ${log_location}
    sudo add-apt-repository ppa:nginx/development -y &>> ${log_location}

    # If there are any packages to be installed in the apt_package_list array,
    # then we'll run `apt-get update` and then `apt-get install` to proceed.
    if [[ ${#apt_package_install_list[@]} = 0 ]]; then
        echo -e "No apt packages to install" | tee -a ${log_location}
    else
        # Before running `apt-get update`, we should add the public keys for
        # the packages that we are installing from non standard sources via
        # our appended apt source.list

        # update all of the package references before installing anything
        echo "Running apt-get update..." | tee -a ${log_location}
        sudo apt-get update --assume-yes &>> ${log_location}

        # install required packages
        echo "Installing apt-get packages..." | tee -a ${log_location}
        sudo apt-get install --assume-yes ${apt_package_install_list[@]} &>> ${log_location}

        # Clean up apt caches
        sudo apt-get clean &>> ${log_location}
    fi

    # npm
    #
    # Make sure we have the latest npm version and the update checker module
    echo "Installing NPM global packages" | tee -a ${log_location}
    sudo npm install -g npm &>> ${log_location}
    sudo npm install -g npm-check-updates &>> ${log_location}

    echo "Installing bower" | tee -a ${log_location}
    sudo npm install bower -g &>> ${log_location}
    echo "Installing grunt" | tee -a ${log_location}
    sudo npm install grunt-cli -g &>> ${log_location}

    # nginx

    echo "Nginx configuration" | tee -a ${log_location}
    # Copy nginx configuration from local
    sudo cp /srv/config/nginx.conf /etc/nginx/nginx.conf
    sudo rm -rf /etc/nginx/sites-available/default

    sudo cp /srv/config/nginx_default.conf /etc/nginx/sites-available/default &>> ${log_location}
    sudo cp /srv/config/nginx_node.conf /etc/nginx/sites-available/app.gacobom.com &>> ${log_location}

    # Create symlinks with the avaliable sites to the enabled sites

    sudo ln -s /etc/nginx/sites-available/app.gacobom.com /etc/nginx/sites-enabled/app.gacobom.comm

    # Make a symbolic with between our shared client folder and the nginx server folder
    sudo rm -r /usr/share/nginx/html
    sudo ln -s /var/www/html/ /usr/share/nginx/

    # Configuration for nginx SSL
    if [[ ! -e /etc/nginx/server.key ]]; then
        echo "Generate Nginx server private key..." | tee -a ${log_location}
        vvvgenrsa="$(openssl genrsa -out /etc/nginx/server.key 2048 2>&1)"
        echo "$vvvgenrsa" &>> ${log_location}
    fi
    if [[ ! -e /etc/nginx/server.csr ]]; then
        echo "Generate Certificate Signing Request (CSR)..." | tee -a ${log_location}
        openssl req -new -batch -key /etc/nginx/server.key -out /etc/nginx/server.csr &>> ${log_location}
    fi
    if [[ ! -e /etc/nginx/server.crt ]]; then
        echo "Sign the certificate using the above private key and CSR..." | tee -a ${log_location}
        vvvsigncert="$(openssl x509 -req -days 365 -in /etc/nginx/server.csr -signkey /etc/nginx/server.key -out /etc/nginx/server.crt 2>&1)"
        echo "$vvvsigncert" &>> ${log_location}
    fi

    # Start nginx server
    echo "Starting nginx server" | tee -a ${log_location}
    rm /var/www/html/index.nginx-debian.html &>> ${log_location}
    service nginx status       # to get the current status
    service nginx stop    # to stop any servers if any
    service nginx start   # to start the server

    # Install pm2 node process manager
    sudo npm install pm2 -g &>> ${log_location}

    echo "Setting up PM2 for Node" | tee -a ${log_location}
    # pm2 list &>> ${log_location}
    # sudo pm2 startup -u vagrant &>> ${log_location}
    # pm2 start /usr/share/nodejs/bin/www &>> ${log_location}
    # pm2 save &>> ${log_location}

    echo "To run the node server as a deamon use pm2 with the following commands: " | tee -a ${log_location}
    echo "sudo pm2 startup -u vagrant" | tee -a ${log_location}
    echo "pm2 start /usr/share/nodejs/bin/www" | tee -a ${log_location}
    echo "pm2 save" | tee -a ${log_location}

else
    echo -e "No network connection available, skipping package installation" | tee -a ${log_location}
fi

end_seconds="$(date +%s)"
echo "-----------------------------" | tee -a ${log_location}
echo "Provisioning complete in '$(expr $end_seconds - $start_seconds)' seconds" | tee -a ${log_location}