export const testOnStop = () => {
  /**
   * Set a callback function to the global variable `onStop` which accpets a parameter `error` which might be null or not null
   * onStop will be called if the running:
   * 1. stopped normally;
   * 2. stopped for an error;
   * 3. stopped by `stop()` function;
   * 4. stopped by main control action(volume down button holding)
   */
  global.onStop = function (error) {
    if (error) {
      alert(
        `Running stopped, got error: ${error}`
      );
    } else {
      alert(`Running stopped!`);
    }
  };

  for (let i = 0; i < 10; i++) {
    console.log(`>>>>>>>AAA loop to ${i}`);
  }

  // Use stop() function to exit the running
  // at.stop()

  for (let i = 0; i < 10; i++) {
    console.log(`>>>>>>>BBB loop to ${i}`);
  }
};
