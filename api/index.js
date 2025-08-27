// api/index.js
const app = require("../server");   // import the Express app you built in server.js

// Vercel expects a function (req, res) => {}
module.exports = (req, res) => {
  return app(req, res);
};
