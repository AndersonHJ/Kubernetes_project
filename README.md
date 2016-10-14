# webTool_angularJS

###/webTool_angularJS
The website for pc and pad.


###/m.webTool_angularJS
The website for mobile device.


### index.html
The html file which includes all the contents shown on the browser.


### controller.js
The js file for controller.



## Instructions
###Setup mobile website
Go to setup_mobile.m


###Setup Redis database
Got to setup_redis.m



###Deploy the application:
   
      cd /var/www/html

      sudo git clone https://github.com/AndersonHJ/webTool.git

      cd /etc/apache2/sites-available

      sudo vi 000-default.conf

      You should find DocumentRoot

      change the value to:  DocumentRoot /var/www/html/webTool_angularJS

      save the modifications

      sudo service apache2 restart
   
   
###input the URL below on the browser to use this application.

      Load balancer: http://130.211.38.182/

      Balancing mode: request per second

      VM1: http://104.198.108.13

      VM2: http://104.199.126.90

      VM3: http://104.199.119.167


###using application

      You can input user first name, last name, birthday, address and city information.

      After click submit the information will display in the textaera with json format.


   
