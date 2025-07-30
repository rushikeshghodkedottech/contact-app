docker buildx build --platform linux/amd64,linux/arm64 .

docker run --network=three-tier  -p 80:80 contact-app-frontend

docker run -p 3000:3000-e DB_PORT=3306   -e DB_HOST=funny_ritchie   -e DB_USER=root   -e DB_PASSWORD=rootpass   -e DB_NAME=contacts_db   --network=three-tier   contact-app-backend