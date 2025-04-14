#!/bin/sh
$HOST= "kubectl port-forward service/ph-ee-zeebe-ops 5000:80 -n paymenthub"
HOST="$HOST/zeebe/upload"
deploy(){
    cmd="curl --insecure --location --request POST $HOST \
    --header 'Platform-TenantId: gorilla' \
    --form 'file=@\"$PWD/$1\"'"
    echo $cmd
    eval $cmd 
    #If curl response is not 200 it should fail the eval cmd
    
    cmd="curl --insecure --location --request POST $HOST \
    --header 'Platform-TenantId: rhino' \
    --form 'file=@\"$PWD/$1\"'"
    echo $cmd
    eval $cmd
    #If curl response is not 200 it should fail the eval cmd
}

LOC=https://github.com/openMF/ph-ee-env-labs/tree/master/orchestration/feel/*.bpmn
for f in $LOC; do
    deploy $f
done

LOC2=https://github.com/openMF/ph-ee-env-labs/tree/master/orchestration/feel/example/*.bpmn
for f in $LOC2; do
    deploy $f
done