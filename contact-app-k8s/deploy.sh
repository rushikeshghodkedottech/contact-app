#!/bin/bash

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Kubernetes is running
if ! kubectl cluster-info &>/dev/null; then
    echo -e "${RED}Error: Kubernetes cluster is not running${NC}"
    exit 1
fi

# Create namespace
echo -e "${GREEN}Creating namespace...${NC}"
kubectl create namespace contact-app
kubectl config set-context --current --namespace=contact-app

# Deploy Database
echo -e "${GREEN}Deploying Database components...${NC}"
kubectl apply -f k8s/database/secret.yaml
kubectl apply -f k8s/database/persistent-volume.yaml
kubectl apply -f k8s/database/service.yaml
kubectl apply -f k8s/database/deployment.yaml

# Wait for MySQL to be ready
echo -e "${YELLOW}Waiting for MySQL to be ready...${NC}"
kubectl wait --for=condition=ready pod -l app=mysql --timeout=120s

# Deploy Backend
echo -e "${GREEN}Deploying Backend components...${NC}"
kubectl apply -f k8s/backend/configmap.yaml
kubectl apply -f k8s/backend/service.yaml
kubectl apply -f k8s/backend/deployment.yaml

# Deploy Frontend
echo -e "${GREEN}Deploying Frontend components...${NC}"
kubectl apply -f k8s/frontend/service.yaml
kubectl apply -f k8s/frontend/deployment.yaml

# Wait for all pods to be ready
echo -e "${YELLOW}Waiting for all pods to be ready...${NC}"
kubectl wait --for=condition=ready pod -l app=backend --timeout=60s
kubectl wait --for=condition=ready pod -l app=frontend --timeout=60s

# Start port forwarding in background
echo -e "${GREEN}Starting port forwarding...${NC}"
kubectl port-forward svc/frontend-service 3000:80 &
kubectl port-forward svc/backend-service 3001:80 &

# Save port forwarding PIDs
echo $! > .frontend-pid
echo $! > .backend-pid

echo -e "\n${GREEN}Deployment complete!${NC}"
echo "Frontend available at: http://localhost:3000"
echo "Backend available at: http://localhost:3001"
echo -e "\nTo clean up, run: ./cleanup.sh"