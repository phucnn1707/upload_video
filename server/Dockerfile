# Use the official Node.js 20 image as the base image
FROM node:20

# Install necessary packages (FFmpeg, fontconfig)
RUN apt-get update && apt-get install -y \
  ffmpeg \
  fontconfig \
  && rm -rf /var/lib/apt/lists/*

# Copy the pre-downloaded NotoSansJP font into the container
COPY ./server/src/assets/fonts/NotoSansJP-VariableFont_wght.ttf /usr/share/fonts/truetype/noto/NotoSansJP-VariableFont_wght.ttf

# Update the font cache to include the new font
RUN fc-cache -fv

# Copy the rest of the application code
COPY ./server ./app

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
# COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
# COPY . .

# Copy the wait-for-it script and make it executable
# COPY wait-for-it.sh /app/wait-for-it.sh
# RUN chmod +x /app/wait-for-it.sh

# Expose the port the server will run on
EXPOSE 3000

# Run the server after MySQL is ready
CMD ["npm", "start"]
