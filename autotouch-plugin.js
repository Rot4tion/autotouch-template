const path = require("path");
const fs = require("fs");
const http = require("http");

class AutoTouchPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    if (!this.options.isAutoUpload) return;

    compiler.hooks.afterEmit.tapAsync(
      "UploadPlugin",
      (compilation, callback) => {
        console.log(
          `AutoTouch Host http://${this.options.host}:${this.options.port}`
        );
        const outputPath =
          compilation.options.output.path;
        const outputFile = path.resolve(
          outputPath,
          "bundle.js"
        );

        fs.readFile(
          outputFile,
          (err, fileData) => {
            if (err) {
              console.error(
                "Failed to read file:",
                err
              );
              return callback(err);
            }

            const boundary =
              "----WebKitFormBoundary" +
              Math.random()
                .toString(36)
                .substring(2);
            let body = `--${boundary}\r\n`;
            body += `Content-Disposition: form-data; name="file"; filename="${path.basename(
              outputFile
            )}"\r\n`;
            body += `Content-Type: application/octet-stream\r\n\r\n`;
            body += fileData.toString("binary");
            body += `\r\n--${boundary}--\r\n`;

            const options = {
              hostname: this.options.host,
              port: this.options.port,
              path: `/file/upload?path=${this.options.filename}`,
              method: "POST",
              headers: {
                "Content-Type": `multipart/form-data; boundary=${boundary}`,
                "Content-Length":
                  Buffer.byteLength(body),
              },
            };

            const req = http.request(
              options,
              (res) => {
                let responseData = "";
                res.on("data", (chunk) => {
                  responseData += chunk;
                });
                res.on("end", () => {
                  if (res.statusCode === 200) {
                    console.log(
                      "File uploaded successfully:",
                      responseData
                    );
                    if (
                      this.options.isAutoStart
                    ) {
                      this.restartScript(
                        callback
                      );
                    } else {
                      callback();
                    }
                  } else {
                    console.error(
                      "File upload failed with status:",
                      res.statusCode
                    );
                    callback(
                      new Error(
                        `Upload failed with status: ${res.statusCode}`
                      )
                    );
                  }
                });
              }
            );

            req.on("error", (e) => {
              console.error(
                "File upload failed:",
                e
              );
              callback(e);
            });

            req.write(body);
            req.end();
          }
        );
      }
    );
  }

  restartScript(callback) {
    fetch(
      `http://${this.options.host}:${this.options.port}/control/stop_playing?path=${this.options.filename}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Stop script success", data);
        return fetch(
          `http://${this.options.host}:${this.options.port}/control/start_playing?path=${this.options.filename}`,
          {
            method: "GET",
          }
        );
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Start script success", data);
        callback();
      })
      .catch((error) => {
        console.error(
          "Script control failed:",
          error
        );
        callback(error);
      });
  }
}
module.exports = AutoTouchPlugin;
