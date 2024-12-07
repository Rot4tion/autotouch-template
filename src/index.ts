import { logDebug } from "./util";

function main() {
  console.log("Script Running");
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
