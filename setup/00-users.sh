#!/usr/bin/env bash
echo -n "Type the name of the user and press [ENTER]:"
read name

sudo adduser ${name} --disabled-password
sudo su - ${name}
cd && mkdir .ssh && chmod 700 .ssh/
touch .ssh/authorized_keys
chmod 600 .ssh/authorized_keys

echo -n "Paste the public SSH key and press [ENTER]:"
read key

echo ${key} > .ssh/authorized_keys

echo -n "Add a new line for the user to emit password"
sudo visudo -f /etc/sudoers.d/90-cloud-init-users