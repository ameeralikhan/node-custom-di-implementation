# NODE TS Quickstart

Nodejs App with Custom DI implementation

# Documentation

### commands to get you started

1. git clone https://github.com/ameeralikhan/node-custom-di-implementation.git and go to project folder.
2. create [.env](#sample-.env) file in config directory
3. `npm install` (install packages locally, since we don't mount node_modules in container)
4. `npm run build:start` (to run api server)

### API & Swagger Url
1. http://localhost:4001/api/v1/ping
2. http://localhost:4001/api-docs
3. Postman collection ```demo-api.postman_collection.json``` also available in source code if you want to use please import that collection.


### Run & Debug
1. for debugging create launch.json in .vscode folder, and copy following code

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Start",
      "program": "${workspaceFolder}/bin/server",
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      "type": "pwa-node",
      "envFile": "${workspaceFolder}/config/.env"
    },
    {
      "type": "node",
      "request": "attach",
      "name": "Docker: Attach to Node",
      "port": 9229,
      "address": "localhost",
      "localRoot": "${workspaceFolder}/dist",
      "remoteRoot": "/app/dist",
      "protocol": "inspector",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "skipFiles": ["<node_internals>/**/*.js"],
      "smartStep": true,
      "restart": true,
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "/app/**/*": "${workspaceRoot}/**/*"
      }
    }
  ]
}
```

### Sample .env

```
NODE_ENV=local
NODE_PORT=4001
```
