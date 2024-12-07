import { deasync, logDebug } from "../util";
import axios from "axios";
async function main() {
  console.log("Script Running");
  const response = await axios.get(
    "https://www.github.com"
  );
  // handle success
  console.log(
    "----------------------------- Got HTTP Response:"
  );
  console.log(
    (response.data as string).substring(0, 200)
  );
  console.log("-----------------------------");
  alert(
    "Successfuly made http request and response has been written to the log!"
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

deasync(() => main(), 5000);
