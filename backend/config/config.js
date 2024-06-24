// config/config.js

module.exports = {
  mongodb: {
    // MongoDB connection URI. Update <username>, <password>, <cluster-url>, <database-name> as per your MongoDB setup.
    uri: "mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
  }
};
