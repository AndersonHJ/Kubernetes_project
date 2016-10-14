#Setup virtual host
You can setup two or more virtual host on your server based on server name or IP or port
Here I use different port access diff websites
port 80 and 8080

##1. Configure Google cloud network

      go to google cloud platform console--->Network--->Firewall rules

      create firewall rules---> Source filter:allow from any source  ---> create
                                Allowed protocols and ports: tcp:8080


##2.Set virtual host port

      sudo vi /etc/apache2/ports.conf

      add port under "listen 80":
      listen 8080


      sudo vi /etc/apache2/sites-available/000-default.conf

      <VirtualHost *:80>
        ..........

        DocumentRoot /var/www/html/webTool_angularJS

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        <Directory /var/www/html/webTool_angularJS>
          AllowOverride All
        </Directory>
      </VirtualHost>

      <VirtualHost *:8080>
        ..........

        DocumentRoot /var/www/html/m.webTool_angularJS

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        <Directory /var/www/html/m.webTool_angularJS>
                AllowOverride all
        </Directory>
      </VirtualHost>


##3.Make virtual host directory

      sudo mkdir -p /var/www/html/webTool_angularJS

      sudo mkdir -p /var/www/html/m.webTool_angularJS

      sudo chown -R www-data:www-data /var/www/html/webTool_angularJS

      sudo chown -R www-data:www-data /var/www/html/m.webTool_angularJS

      sudo chmod -R 755 /var/www/html



      sudo a2ensite 000-default.conf


      sudo service apache2 restart

