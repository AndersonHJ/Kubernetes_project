FROM php:5-apache

RUN apt-get update
RUN apt-get install -y php-pear
RUN pear channel-discover pear.nrk.io
RUN pear install nrk/Predis

ADD app.php /var/www/html/app.php
ADD chat.html /var/www/html/chat.html
ADD index.html /var/www/html/index.html
ADD chatshowcontroller.js /var/www/html/chatshowcontroller.js
ADD javascript_Nan.js /var/www/html/javascript_Nan.js
ADD signup.html /var/www/html/signup.html
ADD userinfo.html /var/www/html/userinfo.html
ADD userinfo.js /var/www/html/userinfo.js
ADD forgotpassword.html /var/www/html/forgotpassword.html
ADD login.js /var/www/html/login.js