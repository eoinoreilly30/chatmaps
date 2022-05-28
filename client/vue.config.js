const fs = require("fs");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    https: {
      key: fs.readFileSync("../ssl/localhost.key"),
      cert: fs.readFileSync("../ssl/localhost.crt")
    },
    public: "https://localhost:8080/"
  }
};
