export const testTextRecognition = () => {
  /**
   * Get supported languages of text recognition
   * at.recognizeTextSupportedLanguages()
   * @return {object} languages
   */
  const supportedLanguages =
    at.recognizeTextSupportedLanguages();
  console.log(
    `Supported languages of text recognition:\n${JSON.stringify(
      supportedLanguages,
      null,
      "    "
    )}`
  );

  console.log(
    `--------------------------------------`
  );

  const options = {
    // OPTIONAL, area of the screen you want to detect
    region: {
      x: 0,
      y: 100,
      width: 300,
      height: 300,
    },

    // OPTIONAL, an array of strings to supplement the recognized languages at the word recognition stage.
    // customWords: ['Deploy', 'Troops'],

    // OPTIONAL, the minimum height of the text expected to be recognized, relative to the region/screen height, default is 1/32
    // minimumTextHeight: 1 / 32,

    // OPTIONAL, 0 means accurate first, 1 means speed first
    level: 0,

    // OPTIONAL, an array of languages to detect, in priority order, only `en-US` supported now. ISO language codes: http://www.lingoes.net/en/translator/langcode.htm
    // Use function `at.recognizeTextSupportedLanguages()` to get the supported languages
    languages: ["en-US", "fr-FR", "zh-Hans"],

    // OPTIONAL, whether use language correction during the recognition process.
    // correct: false,

    // OPTIONAL, you can choose to produce debug image
    debug: true,
  };

  /**
   * Recognize text on the screen or a specified region
   * at.recognizeText(options, callback)
   * @param {object} options - recognition options
   * @param {function} callback - callback function for handling the result or error
   */
  at.recognizeText(options, (result, error) => {
    if (error) {
      alert(error);
    } else {
      console.log(
        `Got result of recognizeText:\n${JSON.stringify(
          result,
          null,
          "    "
        )}`
      );
      // Got result of recognizeText:
      // [
      //     {
      //         "text": "Example",
      //         "rectangle": {
      //             "bottomRight": {
      //                 "x": 300.47,
      //                 "y": 177.78
      //             },
      //             "topRight": {
      //                 "x": 300.47,
      //                 "y": 237.52
      //             },
      //             "topLeft": {
      //                 "x": 33.51,
      //                 "y": 237.42
      //             },
      //             "bottomLeft": {
      //                 "x": 33.51,
      //                 "y": 177.68
      //             }
      //         }
      //     }
      // ]
    }
  });

  console.log(
    `>>>>>>>>> 1111111 Executing here at ${new Date().toLocaleString()}`
  );

  //------------------------------------------------
  /**
   * METHOD 1: keep doing findText continually for specified times or specified long time or till a specified time
   * at.findText(params)
   * @param {object} params - object of params
   */
  at.findText({
    options: {
      debug: true,
    }, // OPTIONAL, options for text recoginition, same as function recognizeText().
    matchMethod: (text) =>
      text.toLowerCase() === "examples", // REQUIRED, How to do matching to determine found.
    duration: 10, // OPTIONAL, how long time you want it to keep finding? Three formats are supported: 1. `duration: 10` means repeat finding 10 times, the value must be a number, can't be a string; 2. `duration: '60s'` means keep finding for 60 seconds, the value must be seconds + a character 's'; 3. `duration: '2020-05-30 12:00:00'` means keep finding till 2020-05-30 12:00:00. Default is `duration: 10` means repeat 10 times, the value must be a string.
    interval: 1000, // OPTIONAL, interval between loops in milliseconds, default is 1000 milliseconds.
    exitIfFound: true, // OPTIONAL, if exit findText if got a result successfully, default is true.
    eachFindingCallback: () => {
      // OPTIONAL, will call this function after each finding loop.
      console.log(
        `------Did a time of finding text at ${new Date().toLocaleString()}-------`
      );
    },
    foundCallback: (result) => {
      // OPTIONAL, will call this function while getting matched result, returns the rectangle coordinate matching the action you specified through `matchMethod`.
      console.log(
        `Got result of findText:\n${JSON.stringify(
          result,
          null,
          "    "
        )}`
      );
      alert(
        `Got result of findText:\n${JSON.stringify(
          result
        )}`
      );
    },
    errorCallback: (error) => {
      // OPTIONAL, handle any error, will exit findText if got error, if no errorCallback provide, it will alert while getting error.
      alert(error);
    },
    completedCallback: () => {
      // OPTIONAL, callback when all finding completed
      console.log("findText compeleted!");
    },
    block: false, // OPTIONAL, you want to run findColors asynchronously or synchronously, block=true means it will run synchronously and block here till completed, default is false, doesn't block here.
  });

  //------------------------------------------------

  console.log(
    `>>>>>>>>> 2222222 Executing here at ${new Date().toLocaleString()}`
  );

  //------------------------------------------------
  /**
   * METHOD 2: do findText a single time synchronously
   * at.findText(options, matchMethod)
   * @param {object} options - recognitionOptions, same with recognizeText
   * @param {function} matchMethod - matchMethod, same with METHOD 1 of findText
   * @returns {array} - array of [result, error]
   */
  const [result, error] = at.findText(
    {},
    (text) => text.toLowerCase() === "examples"
  );
  if (error) {
    alert(
      "Failed to findText, error: %s",
      error
    );
  } else {
    console.log(
      "Got result by findText synchronously",
      result
    );
  }

  //------------------------------------------------

  console.log(
    `>>>>>>>>> 3333333 Executing here at ${new Date().toLocaleString()}`
  );

  //------------------------------------------------
  /**
   * METHOD 3: do findText a single time asynchronously
   * at.findText(options, matchMethod, callback)
   * @param {object} options - recognition options, same with recognizeText
   * @param {function} matchMethod - same with METHOD 1 of findText
   * @param {function} callback - callback function for handling the result or error
   */
  at.findText(
    {},
    (text) => text.toLowerCase() === "examples",
    (result, error) => {
      if (error) {
        alert(
          "Failed to findText, error: %s",
          error
        );
        return;
      }
      console.log(
        "Got result by findText asynchronously",
        result
      );
    }
  );

  //------------------------------------------------

  console.log(
    `>>>>>>>>> 4444444 Executing here at ${new Date().toLocaleString()}`
  );

  // Format of findText result:
  // [
  //     {
  //         "bottomRight": {
  //             "x": 355.99,
  //             "y": 1442.97
  //         },
  //         "topRight": {
  //             "x": 355.99,
  //             "y": 1504.57
  //         },
  //         "topLeft": {
  //             "x": 35.7,
  //             "y": 1505.92
  //         },
  //         "bottomLeft": {
  //             "x": 35.7,
  //             "y": 1444.33
  //         }
  //     }
  // ]
};
