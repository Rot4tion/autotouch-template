// config actions after build
// API https://docs.autotouch.net/http-api.html
module.exports = {
  isAutoUpload: true, // Auto upload build file to AutoTouch host
  isAutoStart: false, // Auto start script it will stop current playing script and run new build script
  host: "192.168.1.117",// Your phone ip address
  port: 8080,
  filename: "bundle.js",
};
