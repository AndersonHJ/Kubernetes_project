# Kubernetes_project
A chat room web application

## chat_room_project
   All the file of chat room application, including .html, .js, .php


## kubernetes_yaml
   kubernetes configure files
    
    
## Deploy your application to kubernetes of Google cloud engine
   
### You need:
      1. image
      2. pod configure file(.yaml)
      3. service configure file(.yaml)
      
### Push your image to gcloud
  You need the Dockerfile
      
      FROM php:5-apache

      RUN apt-get update
      RUN apt-get install -y php-pear
      RUN pear channel-discover pear.nrk.io
      RUN pear install nrk/Predis

      ADD yourapp.php /var/www/html/yourapp.php
      ADD yourindex.html /var/www/html/yourindex.html
      ADD yourcontroller.js /var/www/html/yourcontroller.js

  push
  
      $ docker build -t gcr.io/$PROJECT_ID/chat-room:v1 .
      $ gcloud docker -- push gcr.io/$PROJECT_ID/chat-room:v1
      
### Create pods and services
   Create redis master
    
      $ kubectl create -f redis-master-controller.yaml
      $ kubectl create -f redis-master-service.yaml
      
   Create redis slave
   
      $ kubectl create -f redis-slave-controller.yaml
      $ kubectl create -f redis-slave-service.yaml
      
   Create webpage
   
      $ kubectl create -f webpage-controller.yaml
      $ kubectl create -f webpage-service.yaml
      
      
#### Result
    
      $ kubectl get pods
      
      NAME                 READY     STATUS    RESTARTS   AGE       IP          NODE
      chat-room-5atqj      1/1       Running   0          3h        10.0.2.10   gke-chat-room-default-pool-69585f69-cmys
      chat-room-6in40      1/1       Running   0          3h        10.0.0.12   gke-chat-room-default-pool-69585f69-lygk
      chat-room-dk6j7      1/1       Running   0          3h        10.0.1.11   gke-chat-room-default-pool-69585f69-b46p
      redis-master-crtef   1/1       Running   0          3h        10.0.2.11   gke-chat-room-default-pool-69585f69-cmys
      redis-slave-5qxm9    1/1       Running   0          13h       10.0.2.5    gke-chat-room-default-pool-69585f69-cmys
      redis-slave-hdwp2    1/1       Running   0          13h       10.0.1.5    gke-chat-room-default-pool-69585f69-b46p
      redis-slave-liie9    1/1       Running   0          13h       10.0.1.6    gke-chat-room-default-pool-69585f69-b46p

      $ kubectl get services

      NAME           CLUSTER-IP     EXTERNAL-IP       PORT(S)    AGE
      chat-room      10.3.245.240   104.196.227.217   80/TCP     13h
      kubernetes     10.3.240.1     <none>            443/TCP    14h
      redis-master   10.3.249.231   <none>            6379/TCP   3h
      redis-slave    10.3.255.236   <none>            6379/TCP   3h
      

    
