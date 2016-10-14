# webTool_angularJS

###/webTool_angularJS
   The website for pc and pad


###/m.webTool_angularJS
   The website for mobile device


### index.html
   The html file which includes all the contents shown on the browser


### controller.js
   The js file for controller



## Instructions
###Setup virtual host
Go to setup_vh.m


###Setup mobile website

      sudo a2enmod rewrite

      sudo vi /var/www/html/webTool_angularJS/.htaccess

      <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteCond %{HTTP_USER_AGENT} "android|blackberry|googlebot-mobile|iemobile|ipad|iphone|ipod|opera mobile|palmos|webos" [NC]
      RewriteRule ^$ http:// your server ip address:8080/ [L,R=302]
      </IfModule>

      sudo vi /var/www/html/m.webTool_angularJS/.htaccess
      <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteCond %{HTTP_USER_AGENT} "!(android|blackberry|googlebot-mobile|iemobile|ipad|iphone|ipod|opera mobile|palmos|webos)" [NC]
      RewriteRule ^$ http:// your server ip address/[L,R=302]
      </IfModule>


###Setup Redis database

      sudo apt install php libapache2-mod-php
      
      sudo apt-get install -y php-pear
      
      sudo pear channel-discover pear.nrk.io
      
      sudo pear install nrk/Predis
      
      sudo apt-get install build-essential
      
      sudo apt-get install tcl8.5
      
      wget http://download.redis.io/releases/redis-stable.tar.gz
      
      tar xzf redis-stable.tar.gz
      
      cd redis-stable/
      
      make
      
      make test
      
      cd src
      
      make test
      
      sudo make install
      
      cd utils
      
      sudo ./install_server.sh
      
      sudo service redis_6379 start

      
      check if redis is working:
      ps aux|grep redis

      sudo vi /etc/hosts
      
      add   redis-master redis-slave  behind the 127.0.0.1 localhost
      save file
      
      sudo service redis_6379 restart

###Deploy the application:
   
      First of all, you need setup the mobile website and virtual host
      if not, go to setup_mobile.m
      
      setup the Redis database if you don't have
      
      cd /var/www/html

      sudo git clone https://github.com/AndersonHJ/webTool.git

      
      sudo service apache2 restart
   
   
###input the URL below on the browser to use this application

      Load balancer: http://130.211.38.182/

      Balancing mode: request per second

      VM1: http://104.198.108.13

      VM2: http://104.199.126.90

      VM3: http://104.199.119.167


###using application

      You can input user first name, last name, birthday, address and city information

      After click submit the information will display in the textaera with json format


   
