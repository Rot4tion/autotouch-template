const targetImagePath =
  "images/test_finding_image.png";

const region = {
  x: 20,
  y: 50,
  width: 200,
  height: 300,
};

// Capture specified area from the current screen
at.screenshot(targetImagePath, region);

// Prepare parameters
const options = {
  targetImagePath: targetImagePath,
  count: 3, // OPTIONAL, default is 0, 0 means no limitation
  threshold: 0.9, // OPTIONAL, default is 0.9
  region: null, // OPTIONAL, default is null, null means the whole screen
  debug: true, // OPTIONAL, default is false, true means turn on the debug mode which will produce an image showing the finding process
  method: 1, // OPTIONAL, default is 1, 2 means a more intelligent method
};

//------------------------------------------------

console.log(
  `>>>>>>>>> 11111111 Executing here at ${new Date().toLocaleString()}`
);

//------------------------------------------------
/**
 * METHOD 1: keep doing findImage continually for specified times or specified long time or till a specified time
 * at.findImage(params)
 * @param {object} params - object of params
 */
at.findImage({
  options, // OPTIONAL, options for finding image.
  duration: 10, // OPTIONAL, how long time you want it to keep finding? Three formats are supported: 1. `duration: 10` means repeat finding 10 times, the value must be a number, can't be a string; 2. `duration: '60s'` means keep finding for 60 seconds, the value must be seconds + a character 's'; 3. `duration: '2020-05-30 12:00:00'` means keep finding till 2020-05-30 12:00:00. Default is `duration: 10` means repeat 10 times, the value must be a string.
  interval: 1000, // OPTIONAL, interval between loops in milliseconds, default is 1000 milliseconds.
  exitIfFound: true, // OPTIONAL, if exit findImage if got a result successfully, default is true.
  eachFindingCallback: () => {
    // OPTIONAL, will call this function after each finding loop.
    console.log(
      `------Did a time of findImage at ${new Date().toLocaleString()}-------`
    );
  },
  foundCallback: (result) => {
    // OPTIONAL, will call this function while getting matched result, returns the rectangle coordinate matching the action you specified through `matchMethod`.
    console.log(
      `Got result of findImage:\n${JSON.stringify(
        result,
        null,
        "    "
      )}`
    );
  },
  errorCallback: (error) => {
    // OPTIONAL, handle any error, will exit findImage if got error, if no errorCallback provide, it will at.alert while getting error.
    at.alert(error);
  },
  completedCallback: () => {
    // OPTIONAL, callback when all finding completed
    console.log("findImage compeleted!");
  },
  block: false, // OPTIONAL, you want to run findImage asynchronously or synchronously, block=true means it will run synchronously and block here till completed, default is false, doesn't block here.
});

//------------------------------------------------

console.log(
  `>>>>>>>>> 2222222 Executing here at ${new Date().toLocaleString()}`
);

//------------------------------------------------
/**
 * METHOD 2: do findImage a single time synchronously
 * at.findImage(options)
 * @param {object} options - find image options
 * @returns {array} - array of [result, error]
 */
const [result, error] = at.findImage(options);
if (error) {
  at.alert(
    "Failed to findImage, error: %s",
    error
  );
} else {
  console.log(
    "Got result by findImage synchronously",
    result
  );
}

//------------------------------------------------

console.log(
  `>>>>>>>>> 3333333 Executing here at ${new Date().toLocaleString()}`
);

//------------------------------------------------
/**
 * METHOD 3: do findImage a single time asynchronously
 * at.findImage(options, callback)
 * @param {object} options - find image options
 * @param {function} callback - callback function for handling the result or error
 */
at.findImage(options, (result, error) => {
  if (error) {
    at.alert(
      "Failed to findImage, error: %s",
      error
    );
    return;
  }
  console.log(
    "Got result by findImage asynchronously",
    result
  );
});

//------------------------------------------------

console.log(
  `>>>>>>>>> 4444444 Executing here at ${new Date().toLocaleString()}`
);
