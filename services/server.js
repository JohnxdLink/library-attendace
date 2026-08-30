const env = require("./src/config/env.js");

const app = require("./src/app.js");

app.listen(env.server.port, () => {
  console.log(`Server running at http://${env.server.host}:${env.server.port}`);
});
