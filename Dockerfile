# stage1 as builder
# FROM ACCOUNT_NO.dkr.ecr.us-east-1.amazonaws.com/reblie-node-base:latest as builder
# FROM node-base:latest as builder
FROM 729047448122.dkr.ecr.us-east-1.amazonaws.com/saran-node-base-image:latest as builder
# FROM 729047448122.dkr.ecr.us-east-1.amazonaws.com/base-test:latest as builder

# RUN mkdir /app

WORKDIR /app

# # copy the package.json to install dependencies
COPY ./package.json ./

# Install the dependencies and make the folder
RUN npm install --force

COPY . .

# Build the project and copy the files
RUN npm run build

COPY ./.env ./build/.env

#stage2
# FROM ACCOUNT_NO.dkr.ecr.us-east-1.amazonaws.com/reblie-nginx-base:latest
# FROM ngnix-base:latest
FROM 729047448122.dkr.ecr.us-east-1.amazonaws.com/saran-nginx-base-image:latest

COPY ./admin-nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

ARG COMMIT_HASH=123456

RUN mkdir -p /usr/share/nginx/html/admin/${COMMIT_HASH}

# Copy from the stahg 1
COPY --from=builder /app/build/index.html /usr/share/nginx/html/admin

COPY --from=builder /app/build/ /usr/share/nginx/html/admin/${COMMIT_HASH}

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]
