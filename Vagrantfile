# -*- mode: ruby -*-
# vi: set ft=ruby :

dir = Dir.pwd
vagrant_dir = File.expand_path(File.dirname(__FILE__))

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # BOX
  #
  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "gacobom"

  config.vm.provider "virtualbox" do |v|
      v.name = "gacobom"
      v.customize ["modifyvm", :id, "--memory", "1024"]
      v.cpus = 2
  end

  # NETWORK
  #
  # Create a private network, which allows host-only access to the machine using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.22"

  # Local Machine Hosts
  #
  # If the Vagrant plugin hostsupdater (https://github.com/cogitatio/vagrant-hostsupdater) is
  # installed, the following will automatically configure your local machine's hosts file to
  # be aware of the domains specified below.
  if defined?(VagrantPlugins::HostsUpdater)
    config.hostsupdater.aliases = ['gacobom.com','www.gacobom.com']
    config.hostsupdater.remove_on_suspend = true
  end

  # Forward Agent
  #
  # Enable agent forwarding on vagrant ssh commands. This allows you to use identities
  # established on the host machine inside the guest. See the manual for ssh-add
  config.ssh.forward_agent = true

  # SHARED FOLDERS
  #
  # Share an additional folder to the guest VM. The first argument is the path on the host to the actual folder.
  # The second argument is the path on the guest to mount the folder.
  config.vm.synced_folder "client/", "/var/www/html", :owner => "www-data", :mount_options => [ "dmode=775", "fmode=774" ]
  config.vm.synced_folder "server/", "/usr/share/nodejs", :owner => "www-data", :mount_options => [ "dmode=775", "fmode=774" ]
  config.vm.synced_folder "provision/config/", "/srv/config"

  # FIXES
  #
  # Fix for stdin: is not a tty vagrant
  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"

  # PROVISION
  #
  # Define the bootstrap file: A (shell) script that runs after first setup of your box (= provisioning)
  config.vm.provision :shell, path: "provision/bootstrap.sh"

end
