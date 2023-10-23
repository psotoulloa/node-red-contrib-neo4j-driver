# node-red-contrib-neo4j-driver

This Node-RED custom node allows you to interact with a Neo4j database. It supports both reading and writing operations based on user configurations. It also provides flexibility in terms of the response format.

## Installation

To install the neo4j-driver node in your Node-RED instance, you can:

1. Navigate to your `.node-red` directory in your terminal or command prompt.
2. Run the following command:
  ```npm install @psotoulloa/node-red-neo4jdriver```


## Features

- **Dynamic Query Execution**: Execute Cypher queries dynamically from the input payload or from the node's configuration.
- **Read & Write Modes**: You can configure the node to perform read or write operations based on your requirement.
- **Flexible Result Format**: Choose between Neo4j's default result format or a simple, more readable format.
- **Secure Credential Management**: Store and retrieve the database URI, username, and password securely using Node-RED's credentials feature.

## How to Use

1. Drag and drop the "neo4j-driver" node from the palette to your flow.
2. Double click on the node to configure its properties:
   - **Name**: A descriptive name for the node (optional).
   - **Type**: Choose between `Read` or `Write` based on the operation you want to perform.
   - **Cypher query**: Provide the Cypher query you want to execute. The node will attempt to use `msg.query` first if available.
   - **Results**: Choose the result format. Either the default Neo4j result format or a simplified format.
   - **Uri**: Database URI (default from environment variable `NEO4J_URI`).
   - **Username**: Database username (default from environment variable `NEO4J_USER`).
   - **Password**: Database password (default from environment variable `NEO4J_PASSWORD`).
3. Connect the node to other nodes in your flow, provide an input payload, and see the results in the output.

### Input Payload

The node expects the input payload (`msg.payload`) to contain the parameters for the Cypher query. For example, if your Cypher query is:


## Development Environment
To develop in this node, you must install node-red globaly 

Then you must do a symbolic link to this folder, like this
```ln -s /Users/${user}-${projectpath}/node-red-contrib-neo4j-driver ~/.node-red/nodes/node-red-contrib-neo4j-driver```

Then inside this folder use to run node-red and do the tests
```nodemon -e js,html --exec "node-red"```

Finally when you make a change in this source, you will need to reload whole node-red


