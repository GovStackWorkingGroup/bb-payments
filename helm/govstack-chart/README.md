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
