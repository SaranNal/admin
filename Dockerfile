# FROM 729047448122.dkr.ecr.us-east-1.amazonaws.com/saran-app-base-image:latest
FROM 484537496937.dkr.ecr.us-east-1.amazonaws.com/saran-app-base-image:latest

WORKDIR /app

# # copy the package.json to install dependencies
COPY ./package.json ./

# Install the dependencies and make the folder
RUN npm install --force

COPY . .

# Build the project and copy the files
RUN npm run build

COPY ./.env ./build/.env

COPY ./admin-nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

ARG COMMIT_HASH=COMMIT_ID

RUN mkdir -p /usr/share/nginx/html/admin/${COMMIT_HASH}

# Copy from the stahg 1
RUN cp ./build/index.html /usr/share/nginx/html/admin

RUN cp -r ./build/* /usr/share/nginx/html/admin/${COMMIT_HASH}

EXPOSE 8081

ENTRYPOINT ["nginx", "-g", "daemon off;"]
