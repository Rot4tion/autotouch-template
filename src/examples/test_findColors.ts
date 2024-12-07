export const testFindColor = () => {
  // options for findColors
  const options = {
    colors: [
      // REQUIRED, colors and their relative positions
      { color: 16661296, x: 0, y: 0 },
      { color: 1751033, x: -53, y: 67 },
    ],
    count: 3, // OPTIONAL, default is 0, 0 means no limitation
    region: null, // OPTIONAL, default is null, null means the whole screen
    debug: true, // OPTIONAL, default is false, true means turn on the debug mode which will produce an image showing the finding process
    rightToLeft: false, // OPTIONAL, default is false, true means do the finding from right to left of the screen
    bottomToTop: false, // OPTIONAL, default is false, true means do the finding from bottom to top of the screen
  };

  //------------------------------------------------

  console.log(
    `>>>>>>>>> 11111111 Executing here at ${new Date().toLocaleString()}`
  );

  //------------------------------------------------
  /**
   * METHOD 1: keep doing findColors continually for specified times or specified long time or till a specified time
   * at.findColors(params)
   * @param {object} params - object of params
   */
  at.findColors({
    options, // OPTIONAL, options for finding colors.
    duration: 10, // OPTIONAL, how long time you want it to keep finding? Three formats are supported: 1. `duration: 10` means repeat finding 10 times, the value must be a number, can't be a string; 2. `duration: '60s'` means keep finding for 60 seconds, the value must be seconds + a character 's'; 3. `duration: '2020-05-30 12:00:00'` means keep finding till 2020-05-30 12:00:00. Default is `duration: 10` means repeat 10 times, the value must be a string.
    interval: 1000, // OPTIONAL, interval between loops in milliseconds, default is 1000 milliseconds.
    exitIfFound: true, // OPTIONAL, if exit findColors if got a result successfully, default is true.
    eachFindingCallback: () => {
      // OPTIONAL, will call this function after each finding loop.
      console.log(
        `------Did a time of findColors at ${new Date().toLocaleString()}-------`
      );
    },
    foundCallback: (result) => {
      // OPTIONAL, will call this function while getting matched result, returns the rectangle coordinate matching the action you specified through `matchMethod`.
      console.log(
        `Got result of findColors:\n${JSON.stringify(
          result,
          null,
          "    "
        )}`
      );
    },
    errorCallback: (error) => {
      // OPTIONAL, handle any error, will exit findColors if got error, if no errorCallback provide, it will alert while getting error.
      alert(error);
    },
    completedCallback: () => {
      // OPTIONAL, callback when all finding completed
      console.log("findColors compeleted!");
    },
    block: false, // OPTIONAL, you want to run findColors asynchronously or synchronously, block=true means it will run synchronously and block here till completed, default is false, doesn't block here.
  });

  //------------------------------------------------

  console.log(
    `>>>>>>>>> 22222222 Executing here at ${new Date().toLocaleString()}`
  );

  //------------------------------------------------
  /**
   * METHOD 2: do findColors a single time synchronously
   * at.findColors(options)
   * @param {object} options - find colors options
   * @returns {array} - array of [result, error]
   */
  const [result, error] = at.findColors(options);
  if (error) {
    alert(
      "Failed to find colors, error: %s",
      error
    );
  } else {
    console.log(
      "Got result by findColors synchronously",
      result
    );
  }

  //------------------------------------------------

  console.log(
    `>>>>>>>>> 33333333 Executing here at ${new Date().toLocaleString()}`
  );

  //------------------------------------------------
  /**
   * METHOD 3: do findColors a single time asynchronously
   * at.findColors(options, callback)
   * @param {object} options - find colors options
   * @param {function} callback - callback function for handling the result or error
   */
  at.findColors(options, (result, error) => {
    if (error) {
      alert(
        "Failed to find colors, error: %s",
        error
      );
      return;
    }
    console.log(
      "Got result by findColors asynchronously",
      result
    );
  });

  //------------------------------------------------

  console.log(
    `>>>>>>>>> 44444444 Executing here at ${new Date().toLocaleString()}`
  );
};
