# master-rad

## STARTUP

Most of the apps are dockerized, except clustering engine and front end react application.
API gateway should be used as an interface to the backend but other services are available through ports defined below.

Ideally, when deployed only API Gateway should be exposed.

In order to start them execute
```
docker-compose up
```
or 
```
docker-compose up -d
```
The first command will start them in the foreground, while the second will start them in the background.

The rest two apps must be started manually.

## Ports
- API Gateway: `9080`
- Artefacts service: `9002`
- Users service: `9000`
- Neural network: `5001`
- Postgres: `5003`
- Clustering engine: `5000`
- React app: `8080`


Sistem

NN - mora da bude pod dokerom i da ima proxy na nju zbog local hosta
 - iz klastera se proxy gadja preko ngrok-a
clustering engine ide u klaster

Koraci
1. Podici ngrok na 5099
    1. azurirati u bazi ngrok url da bi servisi iz minikube mogli da pogode ostatak sistema
2. podici reverse proxy sa npm run dev
3. podici nn_load_balancer sa docker compose
    1. njemu je dependency neural_network tako da ce sam da podigne def broj replika
4. podici minikube service api-gateway-service
5. azurirati base url sa portom iz prethodnog koraka na frot app
6. podici front
