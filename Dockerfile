#Use alpine-node v8
FROM mhart/alpine-node:8

# Defined app directory
WORKDIR /app

RUN apk update \
  && apk add --no-cache curl bash make gcc g++ git python

# Copy app dependencies
COPY . .

# Install package
RUN npm install
RUN npm rebuild bcrypt --build-from-source

RUN npm install -g pm2

# Open 3000 Port
EXPOSE 3000

# Run npm start when container start
CMD [ "pm2", "start", "app.js", "--no-daemon"]
