const { getDriver, closeDriver } = require("./neo4j")
const neo4j = require('neo4j-driver');

module.exports = function (RED) {
  function Neo4jDriver(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", async function (msg) {
      try {
        const credentials = this.credentials; // Acceso correcto a las credenciales
        const driver = getDriver(credentials.uri, credentials.username, credentials.password);
        const session = driver.session({
          defaultAccessMode: neo4j.session.WRITE,
        });
        const query = config.query || msg.query;
        const params = config.payload || msg.payload;
        try {
          let res;
          if (config.neo4jType === "write") {
            res = await session.executeWrite(tx => {            
              return tx.run(query, params);
            });
          } else {
            res = await session.readTransaction((tx) => {
              return tx.run(query, params);
            });
          }
          // Función de transformación
          if (config.neo4jFormat === "simple") {
            const transformedData = res.records.map(record => {
              const obj = {};
              record.keys.forEach((key, index) => {
                obj[key] = record._fields[index];
              });
              return obj;
            });
            msg.payload = transformedData;
          } else {
            msg.payload = res;
          }
        } catch (e) {
          closeDriver()
          node.status({fill:"red",shape:"dot",text:e.toString()});
          node.error(e.toString(), msg);
        } finally {
          session.close();
        }
      } catch (e) {
        closeDriver()
        node.status({fill:"red",shape:"dot",text:e.toString()});
        node.error(e.toString(), msg);
      }
      node.send(msg);
    });
  }
  RED.nodes.registerType("neo4j-driver", Neo4jDriver, {
    credentials: {
      uri: { type: "text" },
      username: { type: "text" },
      password: { type: "password" },
    },
  });
};
