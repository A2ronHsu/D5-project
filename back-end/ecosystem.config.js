module.exports = {
  apps : [{
    name   : "server",
    script : "dist/server.js",
    env_file:".env",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }],
  deploy: {
    production: {
      env: {
        // Load environment variables from a file
        // You can replace this with your actual .env file path
        "source_env": ".env" 
      }
    }
  }
};