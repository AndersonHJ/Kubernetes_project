# Deploy your web application to kubernetes

## 1. Create the cluster

    $ gcloud container clusters create clustername
    
## 2. Push your docker container image to google cloud

### mongodb Dockerfile
        FROM httpd:2.4
        EXPOSE 80
        COPY index.html controller.js /usr/local/apache2/htdocs/

### build and push to Google Container Registry
        $ docker build -t gcr.io/$PROJECT_ID/mongo-webapp:v1 .
        
        $ gcloud docker push gcr.io/$PROJECT_ID/mongo-webapp:v1
        
## 3. Create yaml configuration files, then set up the pods and service
        mongo-controller.yaml       --configure mongodb database controller(create pods)
        mongo-service.yaml          --configure mongodb service
        mongo-webapp.yaml           --configure mongo web application controller(create pods)
        mongo-webapp-service.yaml   --configure mongo web application service
        
### set up
        $ kubectl create -f mongo-controller.yaml
        $ kubectl create -f mongo-service.yaml
        $ kubectl create -f mongo-webapp.yaml
        $ kubectl create -f mongo-webapp-service.yaml
        
### check pods and services
        $ kubectl get pods -o wide
        
    NAME                     READY     STATUS    RESTARTS   AGE       IP          NODE
    mongo-controller-633dv   1/1       Running   0          20h       10.0.0.8    gke-mongo-webpage-default-pool-76065913-f4d9
    mongo-webapp-6z326       1/1       Running   0          7h        10.0.0.17   gke-mongo-webpage-default-pool-76065913-f4d9
    mongo-webapp-cva8q       1/1       Running   0          7h        10.0.0.18   gke-mongo-webpage-default-pool-76065913-f4d9
    mongo-webapp-fvrdx       1/1       Running   0          7h        10.0.2.16   gke-mongo-webpage-default-pool-76065913-dk87

        $ kubectl get services
    NAME           CLUSTER-IP     EXTERNAL-IP       PORT(S)     AGE
    kubernetes     10.3.240.1     <none>            443/TCP     1d
    mongo          10.3.246.214   104.198.106.106   27017/TCP   16h
    mongo-webapp   10.3.242.17    104.198.15.146    80/TCP      7h
