# ReactJs Frontend Setup Guide

This guide will walk you through the setup and installation process for the ReactJs Frontend project. Please follow the steps outlined below to ensure the application is configured and running correctly.

## Prerequisites

- Docker and Docker Compose should be installed on your machine.
- Node.js should be installed if you plan to run the server locally without Docker.

## Installation Steps

### Step 1: Clone the Repository

Clone the project repository and navigate into the directory:

```bash
    git https://github.com/wsmr9/ecommerce-manager-interview.git
    cd ecommerce-manager-interview
```

### Step 2: Set Up Environment Variables

Copy the `.env.example` file to create a `.env` file. This file will store all your environment-specific settings.

```bash
    cp .env.example .env
```

Open the `.env` file and make any necessary changes to fit your local development environment, but you can leave it as it is.


### Step 3: Launch Docker Containers


Use Docker Compose to launch the services defined in your `docker-compose.yml`:

```bash
    docker-compose up -d
```

Verifying the Installation
--------------------------

To verify that your frontend is set up correctly, navigate to the following URL.

```bash
    http://localhost:3000
```

Troubleshooting
---------------

If you encounter any problems, check the following:
- Ensure that all environment variables in the `.env` file are set correctly.
- Check the Docker container logs for any error messages:

```bash
    docker logs [container-name]
```

If issues persist, consider restarting the Docker containers or reinitializing the database.

Additional Help
---------------

For additional help or to report issues, please create an issue in the project's GitHub repository or contact the project maintainers directly.
