#!/usr/bin/env bash

# This is a building script for Nginx with PageSpeed
# Check PageSpeed version at https://groups.google.com/forum/#!forum/ngx-pagespeed-announce
NPS_VERSION=1.9.32.3
NGX_VERSION=1.8.0

# Add nginx sources for the package manager
sudo cp /srv/config/nginx.list /etc/apt/sources.list.d/nginx.list

# Create folder to download the source files
mkdir -p ~/tmp/nginx_source
cd ~/tmp/nginx_source

# Get the nginx signing key an register it in the package manager
wget http://nginx.org/packages/keys/nginx_signing.key
cat nginx_signing.key | sudo apt-key add -

# update & install all needed building tools
sudo apt-get update
sudo apt-get install dpkg-dev build-essential zlib1g-dev libpcre3 libpcre3-dev -y

# get a specfic version of the sources of nginx
sudo apt-get source nginx=${NGX_VERSION} -y
sudo apt-get build-dep nginx=${NGX_VERSION} -y

# get a specific version of the sources of pagespeed
mkdir -p ~/tmp/ngx_pagespeed
cd ~/tmp/ngx_pagespeed
wget https://github.com/pagespeed/ngx_pagespeed/archive/release-${NPS_VERSION}-beta.zip
unzip release-${NPS_VERSION}-beta.zip

# get a spacific version of psol for pagespeed
cd ngx_pagespeed-release-${NPS_VERSION}-beta/
wget https://dl.google.com/dl/page-speed/psol/${NPS_VERSION}.tar.gz
tar -xzvf ${NPS_VERSION}.tar.gz

# build nginx
cd ~/tmp/nginx_source/nginx-${NGX_VERSION}
sudo dpkg-buildpackage -b

REP='\.\/configure \\'
MOD="       --add-module=../../ngx_pagespeed/ngx_pagespeed-release-${NPS_VERSION}-beta \\\ "

# modify the rules file to build nginx with the pagespeed
sudo sed "/$REP/a $MOD" ~/tmp/nginx_source/nginx-${NGX_VERSION}/debian/rules > ~/tmp/nginx_source/temp_rules
sudo sed -i "s/\s*$//g" ~/tmp/nginx_source/temp_rules
sudo mv ~/tmp/nginx_source/temp_rules ~/tmp/nginx_source/nginx-${NGX_VERSION}/debian/rules

cd ~/tmp/nginx_source/nginx-${NGX_VERSION}
sudo dpkg-buildpackage -b

sudo dpkg -i ~tmp/nginx_source/nginx_${NGX_VERSION}-1~trusty_amd64.deb

rm -R ~/temp