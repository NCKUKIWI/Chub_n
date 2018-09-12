#Use alpine-node v8
FROM mhart/alpine-node:8

# Defined app directory
WORKDIR /app

# Copy app dependencies
COPY . .

# Install package
RUN npm install

RUN npm install -g pm2

RUN npm install -g sequelize-cli

# Open 3000 Port
EXPOSE 3000

# Run npm start when container start
CMD [ "pm2", "start", "app.js", "--no-daemon"]