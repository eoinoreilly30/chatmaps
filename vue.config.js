const fs = require("fs");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    https: {
      key: fs.readFileSync("devSSL/localhost.key"),
      cert: fs.readFileSync("devSSL/localhost.crt")
    },
    public: "https://localhost:8080/"
  }
};
