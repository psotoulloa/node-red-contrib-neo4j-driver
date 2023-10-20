const neo4j = require('neo4j-driver');
let driverInstance = null;
let driverKey = null;

const createDriver = (uri, username, password) => {
  uri = process.env.NEO4J_URI || uri;
  username = process.env.NEO4J_USER || username;
  password = process.env.NEO4J_PASSWORD || password;
  return neo4j.driver(uri, neo4j.auth.basic(username, password));
};

const getDriver = (uri, username, password) => {
  const newDriverKey = `${uri}:${username}:${password}`;
  if (driverKey !== newDriverKey) {
    closeDriver();
    driverInstance = createDriver(uri, username, password);
  } else if (!driverInstance) {
    driverInstance = createDriver(uri, username, password);
  }
  driverKey = newDriverKey;
  return driverInstance;
};

const closeDriver =  () => {
  try {
    driverInstance.close();
  } catch (error) {
    //pass
  } finally {
    driverInstance = null;
  }
};

module.exports = {
  getDriver,
  closeDriver
};