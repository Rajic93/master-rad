# cleanup
echo "> cleanup old setup"
kubectl delete service --all=true
kubectl delete deployment --all=true
echo "\n"


# start services
echo "> starting services"
echo "\n"

# 1. users database
echo "> starting users database (MySQL)\n"
echo "> kubectl apply -f ./users-database/persistent-volume.yaml"
kubectl apply -f ./users-database/persistent-volume.yaml
echo "> kubectl apply -f ./users-database/persistent-volume-claim.yaml"
kubectl apply -f ./users-database/persistent-volume-claim.yaml
echo "> kubectl apply -f ./users-database/deployment.yaml"
kubectl apply -f ./users-database/deployment.yaml
echo "> kubectl apply -f ./users-database/service.yaml"
kubectl apply -f ./users-database/service.yaml
echo "\n"

# 2 users service
echo "> starting users service\n"
echo "> kubectl apply -f ./users-service/secret.yaml"
kubectl apply -f ./users-service/secret.yaml
echo "> kubectl apply -f ./users-service/deployment.yaml"
kubectl apply -f ./users-service/deployment.yaml
echo "> kubectl apply -f ./users-service/service.yaml"
kubectl apply -f ./users-service/service.yaml
echo "\n"

# 3. artefacts service
echo "> starting artefacts service\n"
echo "> kubectl apply -f ./artefacts-service/config-map.yaml"
kubectl apply -f ./artefacts-service/config-map.yaml
echo "> kubectl apply -f ./artefacts-service/secret.yaml"
kubectl apply -f ./artefacts-service/secret.yaml
echo "> kubectl apply -f ./artefacts-service/deployment.yaml"
kubectl apply -f ./artefacts-service/deployment.yaml
echo "> kubectl apply -f ./artefacts-service/service.yaml"
kubectl apply -f ./artefacts-service/service.yaml
echo "\n"

# 3. clustering engine
echo "> starting clustering engine\n"
echo "> kubectl apply -f ./clustering-engine/deployment.yaml"
kubectl apply -f ./clustering-engine/deployment.yaml
echo "> kubectl apply -f ./clustering-engine/service.yaml"
kubectl apply -f ./clustering-engine/service.yaml
echo "\n"

# 3. api gateway
echo "> starting api gateway\n"
echo "> kubectl apply -f ./api-gateway/config-map.yaml"
kubectl apply -f ./api-gateway/config-map.yaml
echo "> kubectl apply -f ./api-gateway/secret.yaml"
kubectl apply -f ./api-gateway/secret.yaml
echo "> kubectl apply -f ./api-gateway/deployment.yaml"
kubectl apply -f ./api-gateway/deployment.yaml
echo "> kubectl apply -f ./api-gateway/service.yaml"
kubectl apply -f ./api-gateway/service.yaml
echo "\n"
