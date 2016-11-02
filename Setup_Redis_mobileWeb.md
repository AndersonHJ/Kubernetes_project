
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
      
      cd ..
      
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
