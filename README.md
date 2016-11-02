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
   Go to setup_vh.md


###Setup mobile website  and Redis database
   Go to Setup_Redis_Mobileweb.md


###Setup Mongodb and sleepy.mongoose Http api
####Download and install Mongodb
      $ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
      
      $ echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
      
      $ sudo apt-get update
      
      $ sudo apt-get install -y mongodb-org
      
####Use mongodb
      $ sudo service mongod start

      'The port it uses should be 27017'
      
      'Using command in your shell'
      
      $ mongo
      > show dbs
      > use database name(test)
      you will create this database name if you don't have the database with this name, and you can see this new database until you create collections in it.
      > db.web_tool.insert({title: "visit record"})
      you will create a new collection called 'web_tool' by using this command, and you will insert a document.
      > quit()
      

####Setup sleepy.mongoose Http api
      $ sudo git clone "https://github.com/mongodb-labs/sleepy.mongoose.git"
      
      $ sudo apt-get install python-setuptools
      
      $ sudo easy_install pymongo==2.7
      
      $ sudo easy_install pyOpenSSL
      
      open a new command windon
      $ cd /the directory of your sleepy.mongoose
      
      $ python httpd.py -x
      
      you will get:
      =================================
      |      MongoDB REST Server      |
      =================================

      listening for connections on http://localhost:27080
      

####Test on your server shell and pc browser
      Sleepy.Mongoose only uses GETs and POSTs right now.

      URIs are of the form /db_name/collection_name/_command
      
      curl -X GET 'http://localhost:27080/test/web_tool/_find'

For more details please check [the wiki](https://github.com/10gen-labs/sleepy.mongoose/wiki) page of sleepy.mongoose
      
      

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

      VM1: http://104.199.119.167


###using application

      You can input user first name, last name, birthday, address and city information

      After click submit the information will display in the textaera with json format


   
