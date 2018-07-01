#!/usr/bin/env bash
# Update the server
sudo apt-get update

# Install nginx
sudo apt-get install nginx

# Adjust the firewall
sudo ufw allow 'Nginx HTTP'
sudo ufw status

# Finally check the webserver
systemctl status nginx

# Change folder permissions
sudo chown -R root:www-data /var/www
sudo chmod 2775 /var/www # 2=set group id, 7=rwx root, 7=rwx www-data, 5=rx for world (including apache www-data user)
sudo find /var/www -type d -exec chmod 2775 {} + # Set folder permissions
sudo find /var/www -type f -exec chmod 0664 {} + # Set file permissions
echo "umask 0002" | sudo tee --append /etc/profile

# In order to add users to www-data:
# sudo usermod -aG www-data ${name}