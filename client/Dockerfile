# Use the official Node.js image as a base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port that the app will run on
EXPOSE 5173

# Set the command to start the application
CMD ["npm", "run", "dev"]
