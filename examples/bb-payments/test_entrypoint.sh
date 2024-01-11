#!/bin/bash
echo hello 
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
sudo mkdir -p /etc/apt/keyrings
sudo touch -y /etc/apt/keyrings/kubernetes-apt-keyring.gpg
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
kubectl version
#Setup Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
sudo dpkg -i minikube_latest_amd64.deb
minikube start
sleep 30
minikube kubectl -- get po -A #Interact with Minikube cluster
echo minikube started
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
#helm install
sudo apt-get update
sudo apt-get install helm

#hello world install
kubectl create namespace hello-world
kubectl get -A namespace
helm repo add hello-world https://ayazuddin007.github.io/Helm3/
helm install my-hello-world hello-world/hello-world --version 0.2.0 -n hello-world
helm test my-hello-world -n hello-world

# #payment install
# kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_servicemonitors.yaml #Install ServiceMonitor
# kubectl create namespace paymenthub
# kubectl get -A namespace  
# helm repo add g2p-sandbox-1-3-1 https://fynarfin.io/images/ph-ee-g2psandbox-1.3.1/
# helm install ph-ee-g2psandbox g2p-sandbox-1-3-1/ph-ee-g2psandbox --version 1.3.1 -n paymenthub 

# git clone -b 7.17 https://github.com/elastic/helm-charts.git elastic/helm-charts
# # sleep 300
# cd elastic/helm-charts/elasticsearch/examples/security/
# make secrets || echo "elastic-secrets" already exists
# git clone -b 7.17 https://github.com/elastic/helm-charts.git elastic/helm-charts
# cd elastic/helm-charts/kibana/examples/security/
# make secrets || echo "kibana-secrets" already exists
# kubectl get secret elastic-certificate-crt -n default -o yaml | sed 's/namespace: default/namespace: paymenthub/' | kubectl create -f -
# kubectl get secret elastic-certificate-pem -n default -o yaml | sed 's/namespace: default/namespace: paymenthub/' | kubectl create -f -
# kubectl get secret elastic-certificates -n default -o yaml | sed 's/namespace: default/namespace: paymenthub/' | kubectl create -f -
# kubectl get secret elastic-credentials -n default -o yaml | sed 's/namespace: default/namespace: paymenthub/' | kubectl create -f -
# kubectl get secret kibana -n default -o yaml | sed 's/namespace: default/namespace: paymenthub/' | kubectl create -f -
# kubectl get secrets -n paymenthub
# kubectl get configmap -n paymenthub

# # sleep 5m
# kubectl get pods -n paymenthub
# #insatll netcat
# apt install -y netcat
# # until nc -vz ph-ee-zeebe-ops 80; do echo "Waiting for zeebe-ops service"; sleep 2; done;
# #Deploy BPMN 
# kubectl port-forward service/ph-ee-zeebe-ops 5000:80 -n paymenthub & #portforward zeebe-ops &'
# git clone https://github.com/openMF/ph-ee-env-labs.git openMF/ph-ee-env-labs
# cd openMF/ph-ee-env-labs/orchestration
# ls
# sed -i "/HOST=/c\HOST=http://localhost:5000/zeebe/upload" deployBpmn.sh
# cat deployBpmn.sh
# cd ..
# sh orchestration/deployBpmn.sh

# kubectl get pods -n paymenthub
# # kubectl describe po -n paymenthub `kubectl get pods -n paymenthub | grep ph-ee-zeebe-ops |cut -d ' ' -f1` || echo ' '
# # helm list -n paymenthub

# # kubectl get pods -n paymenthub
# helm test ph-ee-g2psandbox -n paymenthub --timeout 5m
# # no_output_timeout=900

