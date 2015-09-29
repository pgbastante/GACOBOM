#!/usr/bin/env bash

echo "Start provisioning..."

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

    git
	nodejs
	curl

	unzip

)

echo "Check for apt packages to install..."

# Loop through each of our packages that should be installed on the system. If
# not yet installed, it should be added to the array of packages to install.
for pkg in "${apt_package_check_list[@]}"; do
	package_version="$(dpkg -s $pkg 2>&1 | grep 'Version:' | cut -d " " -f 2)"
	if [[ -n "${package_version}" ]]; then
		space_count="$(expr 20 - "${#pkg}")" #11
		pack_space_count="$(expr 30 - "${#package_version}")"
		real_space="$(expr ${space_count} + ${pack_space_count} + ${#package_version})"
		printf " * $pkg %${real_space}.${#package_version}s ${package_version}\n"
	else
		echo " *" $pkg [not installed]
		apt_package_install_list+=($pkg)
	fi
done


if [[ $ping_result == *bytes?from* ]]; then

    echo "Generating & Configuring locales"
    sudo locale-gen en_US en_US.UTF-8 es_ES.UTF-8 es_ES > /dev/null
    sudo dpkg-reconfigure locales > /dev/null

    echo "Installing Node from deb.nodesource.com"
    curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash - > /dev/null

	# If there are any packages to be installed in the apt_package_list array,
	# then we'll run `apt-get update` and then `apt-get install` to proceed.
	if [[ ${#apt_package_install_list[@]} = 0 ]]; then
		echo -e "No apt packages to install.\n"
	else
		# Before running `apt-get update`, we should add the public keys for
		# the packages that we are installing from non standard sources via
		# our appended apt source.list

		# update all of the package references before installing anything
		echo "Running apt-get update..."
		apt-get update --assume-yes > /dev/null

		# install required packages
		echo "Installing apt-get packages..."
		apt-get install --assume-yes ${apt_package_install_list[@]} > /dev/null

		# Clean up apt caches
		apt-get clean > /dev/null
	fi

	# npm
	#
	# Make sure we have the latest npm version and the update checker module
	echo "Installing NPM global packages"
	sudo npm install -g npm > /dev/null
	sudo npm install -g npm-check-updates > /dev/null

    echo "Installing bower"
    sudo npm install bower -g > /dev/null
    echo "Installing grunt"
    sudo npm install grunt-cli -g > /dev/null

    # nginx
    #
    # build nginx from source

    # Copy nginx configuration from local
    cp /srv/config/nginx.conf /etc/nginx/nginx.conf
    rm -rf /etc/nginx/sites-available/default

    sudo mkdir /etc/nginx/sites-available > /dev/null
    sudo mkdir /etc/nginx/sites-enabled > /dev/null

    cp /srv/config/nginx_default.conf /etc/nginx/sites-available/default > /dev/null
    cp /srv/config/nginx_node.conf /etc/nginx/sites-available/app.gacobom.com > /dev/null

    # Create symlinks with the avaliable sites to the enabled sites

    sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
    sudo ln -s /etc/nginx/sites-available/app.gacobom.com /etc/nginx/sites-enabled/app.gacobom.comm

    # Make a symbolic with between our shared client folder and the nginx server folder
    sudo rm -r /usr/share/nginx/html
    sudo ln -s /var/www/html/ /usr/share/nginx/

    # Configuration for nginx SSL
    if [[ ! -e /etc/nginx/server.key ]]; then
        echo "Generate Nginx server private key..."
        vvvgenrsa="$(openssl genrsa -out /etc/nginx/server.key 2048 2>&1)"
        echo "$vvvgenrsa" > /dev/null
    fi
    if [[ ! -e /etc/nginx/server.csr ]]; then
        echo "Generate Certificate Signing Request (CSR)..."
        openssl req -new -batch -key /etc/nginx/server.key -out /etc/nginx/server.csr > /dev/null
    fi
    if [[ ! -e /etc/nginx/server.crt ]]; then
        echo "Sign the certificate using the above private key and CSR..."
        vvvsigncert="$(openssl x509 -req -days 365 -in /etc/nginx/server.csr -signkey /etc/nginx/server.key -out /etc/nginx/server.crt 2>&1)"
        echo "$vvvsigncert" > /dev/null
    fi

    # Start nginx server
    # echo "Starting nginx server"

    # service nginx status       # to get the current status
    # sudo service nginx stop    # to stop any servers if any
    # sudo service nginx start   # to start the server

    # node /usr/share/nodejs/app.js

else
    echo -e "\nNo network connection available, skipping package installation"
fi

end_seconds="$(date +%s)"
echo "-----------------------------"
echo "Provisioning complete in '$(expr $end_seconds - $start_seconds)' seconds"