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

##Ports
- API Gateway: `9080`
- Artefacts service: `9002`
- Users service: `9000`
- Neural network: `5001`
- Postgres: `5003`
- Clustering engine: `5000`
- React app: `8080`
