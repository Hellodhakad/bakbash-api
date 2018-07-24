const express = require("express");
const app = express();
const mongoose = require("mongoose");

module.exports = {
  createServer: function(port) {
    port = port || process.env.PORT;
    return app.listen(port, function() {
      console.log(`Server is listening on ${port}`);
    });
  },
  connection: function(uri) {
    const options = {
      useNewUrlParser: true,
      autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };
    mongoose.connect(
      uri,
      options,
      err => {
        if (mongoose.connection.readyState == 1) {
          return console.log("Successfully Connected to database");
        } else {
          return console.log("Error while connecting to Database");
        }
      }
    );
  } //,
};
