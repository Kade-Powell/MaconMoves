module.exports = {
  apps : [
      {
        name: "MaconMoves",
        script: "./server.js",
        watch: true,
        env: {
            "NODE_ENV": "production",
        }
      }
  ]
}

