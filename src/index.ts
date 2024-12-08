import { logDebug, readFile } from "./util";

function main() {
  console.log("Script Running");
  console.log(
    readFile(
      "/var/mobile/Documents/Screenshots/confirm-tool.PNG"
    )
  );

  alert(
    "Can you give me a github star for this <3"
  );
}

//@ts-ignore
global.onStop = function (error) {
  const message = error
    ? `Running stopped, got error: ${error}`
    : `Running stopped!`;
  // alert(message);
  logDebug(message);
};

main();
