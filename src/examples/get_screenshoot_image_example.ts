import {
  getScreenshotImage,
  logDebug,
} from "../util";

function main() {
  console.log("Script Running");
  logDebug("base64 image ", getScreenshotImage());
}

main();
