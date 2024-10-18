# Use the official Node.js image as a base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the server will run on
EXPOSE 3000

# Run the server
CMD ["npm", "run", "dev"]