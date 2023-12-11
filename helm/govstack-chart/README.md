# Deployment 

1. `helm dep up helm/govstack-chart`
2. `helm package helm/govstack-chart`
3. `helm repo index .`
4. `helm install g2p-sandbox helm/govstack-chart --namespace paymenthub --create-namespace`

5. manually delete  "ph-ee-config" configmaps
6. `helm upgrade -f helm/govstack-chart/values.yaml g2p-sandbox helm/govstack-chart --install --create-namespace --namespace paymenthub`

## Fix Known Issue
Migration script race condition Operation app startup issue work around

1. On pod: operationsmysql-0 in {namespace} with PortForward or Shell in the pod
2. connect the mysql with root passwrod
3. delete tenants
4. Run the SQL scripts which didn’t run successfully

```sql
DROP DATABASE `tenants`;
DROP DATABASE `rhino`;
DROP DATABASE `gorilla`;

CREATE DATABASE `tenants`;
GRANT ALL PRIVILEGES ON `tenants`.* TO 'mifos';
CREATE DATABASE `rhino`;
CREATE DATABASE `gorilla`;
GRANT ALL PRIVILEGES ON `rhino`.* TO 'mifos';
GRANT ALL PRIVILEGES ON `gorilla`.* TO 'mifos';
GRANT ALL ON *.* TO 'root'@'%';
```

5. restart ph-ee-operations-app pod

## Apply secrets
### Kibana
```
export ENV_NAMESPACE=paymenthub
cd helm/es-secret/
make secrets || echo "elastic-certificates" already exists
```
### Elastic Search
```
// Clone repo or directory from the link above

export ENV_NAMESPACE=paymenthub
cd helm/es-secret/
make secrets || echo "elastic-certificates" already exists
```
### bulk-processor secret 
* ID and KEY are in file keys.txt in S3 bucket
```
export ENV_NAMESPACE=paymenthub
export S3_ACCESS_KEY_ID=[[should be obtained from previously created bucked and acces keys]]
export S3_SECRET_ACCESS_KEY=[[should be obtained from previously created bucked and acces keys]]

kubectl delete secret bulk-processor-secret -n $ENV_NAMESPACE || echo "delete the secret if exist"
kubectl create secret generic bulk-processor-secret \
--from-literal=aws-access-key="$S3_ACCESS_KEY_ID" \
--from-literal=aws-secret-key="$S3_SECRET_ACCESS_KEY" -n $ENV_NAMESPACE
```

## Upload BPMN-s
1. Sync repository: [Repo](https://github.com/openMF/ph-ee-env-labs/tree/master)
2. move orchestration directory in the project root dir.
3. Exec: 
```
./helm/bpmn-upload/deployBpmn.sh
```

## Test
```
helm test g2p-sandbox --namespace paymenthub
```
