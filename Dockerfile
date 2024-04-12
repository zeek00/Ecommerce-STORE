# Stage 1: Build the server-side (Node.js) application
FROM node:14 AS server-build

# Set the working directory for the server-side code
WORKDIR /Ecommerce-STORE/server

# Copy package.json and package-lock.json for server dependencies
COPY server/package*.json ./

# Install server-side dependencies
RUN npm install

# Copy the server-side source code into the container
COPY server ./

# Build the server-side application
RUN npm run build

# Stage 2: Build the client-side (React) application
FROM node:14 AS client-build

# Set the working directory for the client-side code
WORKDIR /Ecommerce-STORE/frontend

# Copy package.json and package-lock.json for client dependencies
COPY frontend/package*.json ./

# Install client-side dependencies
RUN npm install

# Copy the client-side source code into the container
COPY frontend ./frontend

# Build the client-side application
RUN npm run build

# Stage 3: Final image with both server and client
FROM node:14-alpine

# Create a non-root user
RUN adduser -D wrek

# Set the working directory for the application
WORKDIR /Ecommerce-STORE

# Copy built files from server and client
COPY --from=server-build /Ecommerce-STORE/server/build ./server/build
COPY --from=client-build /Ecommerce-STORE/frontend/build ./frontend/build

# Change ownership to the non-root user
RUN chown -R wrek:wrek .

# Switch to the non-root user
USER wrek

# Expose server port
EXPOSE 4001

# Define environment variable
ENV NODE_ENV production

# Command to start the server
CMD ["npm", "run", "dev"]
