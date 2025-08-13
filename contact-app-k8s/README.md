# contact-app-k8s

This project is a Kubernetes deployment for a contact management application consisting of a frontend, backend, and a MySQL database. The application is designed to run in a Kubernetes cluster and utilizes Docker images for each component.

## Project Structure

```
contact-app-k8s
├── k8s
│   ├── frontend
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── backend
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── configmap.yaml
│   ├── database
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── secret.yaml
│   │   └── persistent-volume.yaml
│   └── ingress.yaml
├── skaffold.yaml
└── README.md
```

## Setup Instructions

1. **Docker Images**: Ensure that you have built and pushed the Docker images for the frontend, backend, and MySQL database to Docker Hub.

2. **Kubernetes Cluster**: Set up a Kubernetes cluster using a local solution like Minikube or a cloud provider like GKE, EKS, or AKS.

3. **Persistent Storage**: The MySQL database uses a Persistent Volume (PV) and Persistent Volume Claim (PVC) defined in `k8s/database/persistent-volume.yaml` to manage persistent storage. Ensure your cluster supports dynamic provisioning or configure the PV manually.

4. **Deploying the Application**:
   - Apply the Kubernetes configurations using `kubectl`:
     ```bash
     kubectl apply -f k8s/
     ```
   - This command will create all the necessary deployments, services, and other resources defined in the YAML files.

5. **Accessing the Application**: 
   - Use the Ingress resource defined in `k8s/ingress.yaml` to manage external access to the services. Ensure you have an Ingress controller installed in your cluster.

6. **Skaffold**: Use Skaffold for continuous development and deployment. Run the following command to start the Skaffold workflow:
   ```bash
   skaffold dev
   ```

## Usage

- The frontend application communicates with the backend API to manage contacts.
- The backend application interacts with the MySQL database to perform CRUD operations on contact data.

## Additional Information

- Ensure that your environment variables for the database connection are correctly set in the `k8s/database/secret.yaml` and `k8s/backend/configmap.yaml`.
- Monitor the logs of the pods for troubleshooting using:
  ```bash
  kubectl logs <pod-name>
  ```

This README provides a high-level overview of the project and instructions for setting up and deploying the contact management application on Kubernetes.