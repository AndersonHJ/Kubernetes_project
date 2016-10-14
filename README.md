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
###Setup mobile website
Go to setup_mobile.m


###Setup virtual host
Go to setup_vh.m


###Setup Redis database
Got to setup_redis.m



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


   
