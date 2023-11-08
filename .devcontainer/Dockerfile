# Use the specified image as the base
FROM mcr.microsoft.com/devcontainers/python:3.8

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs npm

# Update PATH for npm and install Azure Functions Core Tools
RUN export PATH=$PATH:$(dirname $(which npm)) && npm install -g azure-functions-core-tools@4

# Install python azure libraries
RUN pip install azure-identity
RUN pip install azure-keyvault-secrets

# Install python venv
RUN apt install python3.11-venv -y

# Install typescript
RUN npm install -g typescript 

