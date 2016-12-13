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
      

###Some commands update
      log into the specific pod
      
      $ gcloud compute ssh gke-chat-room-default-pool-69585f69-cmys

      WARNING: The private SSH key file for Google Compute Engine does not exist.
      WARNING: You do not have an SSH key for Google Compute Engine.
      WARNING: [/usr/bin/ssh-keygen] will be executed to generate a key.
      Generating public/private rsa key pair.
      Enter passphrase (empty for no passphrase): 
      Enter same passphrase again: 
      Your identification has been saved in /Users/houjian/.ssh/google_compute_engine.
      Your public key has been saved in /Users/houjian/.ssh/google_compute_engine.pub.
      The key fingerprint is:
      SHA256:rr3Ymi5IwZzmeGEp5comftgOzm/sTxyrEbr+2s05t8s houjian@Jians-MacBook-Pro.local
      The key's randomart image is:
      +---[RSA 2048]----+
      |                 |
      |  .              |
      | = o             |
      |. @              |
      |.B + .  S        |
      |+o= o o.         |
      |+=+o +  .        |
      |oo==B.oB         |
      |.*OB.BOE*.       |
      +----[SHA256]-----+
      Updating project ssh metadata.../Updated [https://www.googleapis.com/compute/v1/projects/boxwood-ellipse-148321].                    
      Updating project ssh metadata...done.                                                                                                
      Warning: Permanently added 'compute.5255375488056805703' (RSA) to the list of known hosts.

      Welcome to Kubernetes v1.4.6!

      You can find documentation for Kubernetes at:
        http://docs.kubernetes.io/

      The source for this release can be found at:
        /home/kubernetes/kubernetes-src.tar.gz
      Or you can download it at:
        https://storage.googleapis.com/kubernetes-release/release/v1.4.6/kubernetes-src.tar.gz

      It is based on the Kubernetes source at:
        https://github.com/kubernetes/kubernetes/tree/v1.4.6

      For Kubernetes copyright and licensing information, see:
        /home/kubernetes/LICENSES
        
        
        
      houjian@gke-chat-room-default-pool-69585f69-cmys ~ $ docker ps
      
      CONTAINER ID        IMAGE                                                                  COMMAND                  CREATED             STATUS              PORTS               NAMES
      7405235c72ef        gcr.io/google_containers/redis:e2e                                     "redis-server /etc/re"   7 hours ago         Up 7 hours                              k8s_master.85deb593_redis-master-crtef_default_f304cabe-bbed-11e6-8f9a-42010a8a004e_2f43bb61
      910e94df6bca        gcr.io/google_containers/pause-amd64:3.0                               "/pause"                 7 hours ago         Up 7 hours                              k8s_POD.d8dbe16c_redis-master-crtef_default_f304cabe-bbed-11e6-8f9a-42010a8a004e_43f05b12
      c1249c0d9fa7        gcr.io/boxwood-ellipse-148321/chat-room:v4                             "apache2-foreground"     7 hours ago         Up 7 hours                              k8s_chat-room.41a6d377_chat-room-5atqj_default_56aff84a-bbea-11e6-8f9a-42010a8a004e_222a29b5
      e61bfa4be1da        gcr.io/google_containers/pause-amd64:3.0                               "/pause"                 7 hours ago         Up 7 hours                              k8s_POD.d8dbe16c_chat-room-5atqj_default_56aff84a-bbea-11e6-8f9a-42010a8a004e_5c1334f0
      0ca2e3e06df0        gcr.io/google_samples/gb-redisslave:v1                                 "/entrypoint.sh /bin/"   18 hours ago        Up 18 hours                             k8s_slave.b16bd268_redis-slave-5qxm9_default_6d3fa959-bb92-11e6-8f9a-42010a8a004e_23715725
      01bef90eb841        gcr.io/google_containers/pause-amd64:3.0                               "/pause"                 18 hours ago        Up 18 hours                             k8s_POD.d8dbe16c_redis-slave-5qxm9_default_6d3fa959-bb92-11e6-8f9a-42010a8a004e_53a263a7
      438dbb57a1c4        gcr.io/google_containers/fluentd-gcp:1.21                              "/bin/sh -c 'rm /lib/"   18 hours ago        Up 18 hours                             k8s_fluentd-cloud-logging.b9b07452_fluentd-cloud-logging-gke-chat-room-default-pool-69585f69-cmys_kube-system_d80fb8aa36d238ab5c6990d354d39176_2b4890ac
      5f865dfd03c0        gcr.io/google_containers/pause-amd64:3.0                               "/pause"                 18 hours ago        Up 18 hours                             k8s_POD.d8dbe16c_fluentd-cloud-logging-gke-chat-room-default-pool-69585f69-cmys_kube-system_d80fb8aa36d238ab5c6990d354d39176_a1b09952
      025bee02e5ca        gcr.io/google_containers/kube-proxy:b87ffd2bf726a72a00bbc021970cb855   "/bin/sh -c 'kube-pro"   18 hours ago        Up 18 hours                             k8s_kube-proxy.53c119d3_kube-proxy-gke-chat-room-default-pool-69585f69-cmys_kube-system_77eaa19de3eeb2d4b1a9768d52e73cc6_f3a518ed
      9ecd8da1697d        gcr.io/google_containers/pause-amd64:3.0                               "/pause"                 18 hours ago        Up 18 hours
      
      
      $ docker exec -it c1249c0d9fa7 sh
      
      # cd /var/www/html	
      # ls
      app.php    chatshowcontroller.js  index.html	     login.js	  userinfo.html
      chat.html  forgotpassword.html	  javascript_Nan.js  signup.html  userinfo.js
