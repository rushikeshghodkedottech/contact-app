#!/bin/bash

echo "Cleaning up Contact App resources..."

# Kill port forwarding processes
if [ -f .frontend-pid ]; then
    kill $(cat .frontend-pid) 2>/dev/null
    rm .frontend-pid
fi

if [ -f .backend-pid ]; then
    kill $(cat .backend-pid) 2>/dev/null
    rm .backend-pid
fi

# Delete all resources
kubectl delete -f k8s/ --namespace contact-app

# Delete namespace
kubectl delete namespace contact-app

echo "Cleanup complete!"