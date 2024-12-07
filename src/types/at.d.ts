declare type RecognizeTextResult = Array<{
  text: string;
  rectangle: Rectangle;
}>;

declare namespace at {
  type Region = {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  /**
   * Log message to Log View.
   * @param message - The message to log.
   */
  function log(
    message?: any,
    ...optionalParams: any[]
  ): void;

  /**
   * Popup a message.
   * @param message - The message to display.
   */
  function alert(
    message?: any,
    ...optionalParams: any[]
  ): void;

  /**
   * Sleep several microseconds (1/1000000 second).
   * @param microseconds - The number of paused microseconds.
   */
  function usleep(microseconds: number): void;

  /**
   * Simulate touch down at (x, y).
   * @param id - Finger ID.
   * @param x - x-coordinate on the screen.
   * @param y - y-coordinate on the screen.
   */
  function touchDown(
    id: number,
    x: number,
    y: number
  ): void;

  /**
   * Move the finger to coordinate (x,y).
   * @param id - Finger ID.
   * @param x - x-coordinate on the screen.
   * @param y - y-coordinate on the screen.
   */
  function touchMove(
    id: number,
    x: number,
    y: number
  ): void;

  /**
   * Lift the finger from coordinate (x,y).
   * @param id - Finger ID.
   * @param x - x-coordinate on the screen.
   * @param y - y-coordinate on the screen.
   */
  function touchUp(
    id: number,
    x: number,
    y: number
  ): void;

  /**
   * Simulate the pressing of physical key.
   * @param keyType - Physical key identification.
   */
  function keyDown(keyType: number): void;

  /**
   * Simulate the lifting of physical key.
   * @param keyType - Physical key identification.
   */
  function keyUp(keyType: number): void;

  /**
   * Get the color value of the pixel point of the specified coordinate on current screen.
   * @param x - x-coordinate on the screen.
   * @param y - y-coordinate on the screen.
   * @returns [result, error]
   */
  function getColor(
    x: number,
    y: number
  ): [number | undefined, string | undefined];

  /**
   * Get the color values of the pixel points of the specified coordinates on current screen.
   * @param locations - A group of coordinates.
   * @returns [result, error]
   */
  function getColors(
    locations: Array<{ x: number; y: number }>
  ): [number[], string];

  type FindColorOptions = {
    colors: {
      color: number;
      x: number;
      y: number;
    }[];
    count?: number;
    region?: Region | null;
    debug?: boolean;
    rightToLeft?: boolean;
    bottomToTop?: boolean;
  };
  /**
   * Search the coordinates of the pixel points matching the specified color on current screen.
   * @param params - Configuration for findColor.
   * @returns [coordinates, error]
   */
  function findColor(params: {
    color: number;
    count?: number;
    region?: Region;
    debug?: boolean;
    rightToLeft?: boolean;
    bottomToTop?: boolean;
  }): [Array<{ x: number; y: number }>, string];

  function findColors(params: {
    options: FindColorOptions;
    duration?: number | string;
    interval?: number;
    exitIfFound?: boolean;
    eachFindingCallback: () => void;
    foundCallback: (result: any) => void;
    errorCallback?: (error) => void;
    completedCallback?: () => void;
    block?: boolean;
  }): void;

  function findColors(
    options: FindColorOptions
  ): [result: any, error: any];
  function findColors(
    options: FindColorOptions,
    callback: (result: any, error: any) => void
  ): void;

  type FindImageOptions = {
    targetImagePath: string;
    count?: number;
    threshold?: number;
    region?: Region | null;
    debug?: boolean;
    method?: number;
  };
  type FindImageResult = [
    Array<{ x: number; y: number }>,
    string
  ];
  /**
   * Search areas matching the specified image on current screen and return the center coordinates.
   * @param params - Configuration for findImage.
   * @returns [coordinates, error]
   */
  function findImage(
    params: FindImageOptions
  ): FindImageResult;

  function findImage(params: {
    options: FindImageOptions;
    duration?: number | string; // OPTIONAL, how long time you want it to keep finding? Three formats are supported: 1. `duration: 10` means repeat finding 10 times, the value must be a number, can't be a string; 2. `duration: '60s'` means keep finding for 60 seconds, the value must be seconds + a character 's'; 3. `duration: '2020-05-30 12:00:00'` means keep finding till 2020-05-30 12:00:00. Default is `duration: 10` means repeat 10 times, the value must be a string.
    interval?: number; // OPTIONAL, interval between loops in milliseconds, default is 1000 milliseconds.
    exitIfFound?: boolean; // OPTIONAL, if exit findImage if got a result successfully, default is true.
    eachFindingCallback: () => void;
    foundCallback: (result: any) => void;
    errorCallback?: (error) => void;
    completedCallback?: () => void;
    block?: boolean; // OPTIONAL, you want to run findImage asynchronously or synchronously, block=true means it will run synchronously and block here till completed, default is false, doesn't block here.
  });

  function findImage(
    options: FindImageOptions,
    callback: (
      result: FindImageResult,
      error: any
    ) => void
  );
  /**
   * Take a screenshot for the whole screen or specified area.
   * @param savePath - Where to save the image.
   * @param region - Rectangular area of the screen to capture.
   * @param scale - Scale image.
   * @param quality - Quality image.
   */
  function screenshot(
    savePath?: string,
    region?: Region,
    scale?: number,
    quality?: number
  ): void;

  /**
   * Run specified application.
   * @param appIdentifier - Application identifier.
   */
  function appRun(appIdentifier: string): void;

  /**
   * Kill specified application.
   * @param appIdentifier - Application identifier.
   */
  function appKill(appIdentifier: string): void;

  /**
   * Get the running state of the specified application.
   * @param appIdentifier - Application identifier.
   * @returns State of the application.
   */
  function appState(
    appIdentifier: string
  ): "NOT RUNNING" | "ACTIVATED" | "DEACTIVATED";

  /**
   * Get the default directory address of the saved script.
   * @returns Default directory address.
   */
  function rootDir(): string;

  /**
   * Show messages with Toast style and delay for some seconds.
   * @param message - Content to be showed.
   * @param delay - How long time to keep showing.
   */
  function toast(
    message: string,
    delay?: number
  ): void;

  /**
   * Show messages with Toast style and delay for some seconds.
   * @param message - Content to be showed.
   * @param position .
   * @param delay - How long time to keep showing.
   */
  function toast(
    message: string,
    position?: "top" | "center" | "bottom",
    delay?: number
  ): void;

  /**
   * Vibrate once。
   */
  function vibrate(): void;

  /**
   * Get orientation of the device.
   * @returns Screen orientation.
   */
  function getDeviceOrientation(): string;

  /**
   * Get Serial Number of the device.
   * @returns Serial Number.
   */
  function getSN(): string;

  /**
   * Get version of AutoTouch.
   * @returns Version of AutoTouch.
   */
  function getVersion(): string;

  /**
   * Get identifier of current front most App.
   * @returns App Identifier.
   */
  function frontMostAppId(): string;

  /**
   * Get orientation of current front most App.
   * @returns Orientation of the app.
   */
  function frontMostAppOrientation(): number;

  /**
   * Copy specified text to clipboard.
   * @param text - Text to be copied.
   */
  function copyText(text: string): void;

  /**
   * Get the text in the clipboard.
   * @returns Text copied in the clipboard.
   */
  function clipText(): string;

  /**
   * Input text to the input box selected now.
   * @param text - Text to be input.
   */
  function inputText(text: string): void;

  /**
   * Pop up self-defined dialog box to accept the user input.
   * @param params - Configuration for the dialog.
   * @returns Flag of tapped button.
   */
  function dialog(params: {
    controls: Array<any>;
    orientations?: Array<any>;
  }): number;

  /**
   * Clear the remembered values of the dialog created by the function dialog.
   * @param scriptPath - Script relative path or absolute path.
   */
  function clearDialogValues(
    scriptPath: string
  ): void;

  /**
   * Open url, or open other apps' url scheme.
   * @param url - Target to open.
   */
  function openURL(url: string): void;

  /**
   * Get current license status of AutoTouch.
   * @returns License type.
   */
  function license(): "BASIC" | "PRO" | null;

  /**
   * Switch on/off a script as auto launch.
   * @param filePath - Path to the script.
   * @param on - Switch auto launch on or off.
   */
  function setAutoLaunch(
    filePath: string,
    on: boolean
  ): void;

  /**
   * List all auto launch scripts.
   * @returns List of auto launch scripts.
   */
  function listAutoLaunch(): string[];

  /**
   * Stop the current script execution.
   */
  function stop(): void;

  /**
   * Get supported languages of text recognition.
   * @returns Supported languages.
   */
  function recognizeTextSupportedLanguages(): object;

  /**
   * Recognize text on the screen.
   * @param options - Recognition options.
   * @param callback - Callback function for handling the result or error.
   */
  function ocr(
    options: any,
    callback?: (
      result: any,
      error: string
    ) => void
  ): [any, string] | void;

  /**
   * Get the speficied App's displayName,executablePath,bundleContainerPath,dataContainerPath.
   * @param appIdentifier - App identifier.
   * @returns App info table.
   */
  function appInfo(appIdentifier: string): any;

  /**
   * Set timer for a script.
   * @param scriptPath - Path to the script.
   * @param fireTime - When should the timer trigger.
   * @param repeat - If the timer should run repeatedly.
   * @param interval - Repeat interval in seconds.
   * @returns If successful.
   */
  function setTimer(
    scriptPath: string,
    fireTime: string | number,
    repeat: boolean,
    interval: number
  ): boolean;

  /**
   * Remove timer of a script.
   * @param filePath - Path to the script.
   * @returns If successful.
   */
  function removeTimer(filePath: string): boolean;

  /**
   * Keep AutoTouch awake against iOS idle sleep.
   * @param keepAwake - Keep AutoTouch awake or not
   */
  function keepAutoTouchAwake(
    keepAwake: boolean
  ): void;

  /**
   * Execute a shell command.
   * @param command - Command to execute.
   * @returns Result of the command.
   */
  function exec(command: string): string;

  /**
   * Save an image or video from specific path to system album.
   * @param filePath - File relative path or absolute path.
   * @param albumName - Album name.
   */
  function saveToSystemAlbum(
    filePath: string,
    albumName?: string
  ): void;

  /**
   * Clear all images and videos in system album.
   * @param albumName - Album name.
   */
  function clearSystemAlbum(
    albumName?: string
  ): void;

  /**
   * Recognize text on the screen or a specified region
   * @param options - Recognition options.
   * @param callback - Callback function for handling the result or error.
   */
  function recognizeText(
    options: {
      region?: Region;
      level?: number;
      languages?: string[];
      debug?: boolean;
    },
    callback: (
      result: RecognizeTextResult,
      error: string
    ) => void
  ): void;

  /**
   * Find text on the screen, either continually or once.
   * @param params - Object of parameters for continuous or single find.
   */
  function findText(params: {
    options?: {
      region?: Region;
      debug?: boolean;
      [key: string]: any; // Additional optional options can be included.
    };
    matchMethod: (text: string) => boolean;
    duration?: number | string;
    interval?: number;
    exitIfFound?: boolean;
    eachFindingCallback?: () => void;
    foundCallback?: (result: Rectangle[]) => void;
    errorCallback?: (error: string) => void;
    completedCallback?: () => void;
    block?: boolean;
  }): void;

  /**
   * Overloaded findText method for single synchronous find.
   * @param options - Recognition options.
   * @param matchMethod - Method for matching found text.
   * @returns An array [result, error].
   */
  function findText(
    options: object,
    matchMethod: (text: string) => boolean
  ): [any[], string];

  /**
   * Overloaded findText method for single asynchronous find.
   * @param options - Recognition options.
   * @param matchMethod - Method for matching found text.
   * @param callback - Callback for handling result or error.
   */
  function findText(
    options: object,
    matchMethod: (text: string) => boolean,
    callback: (
      result: any[],
      error: string
    ) => void
  ): void;

  export function playAudio(
    audioFilePath: string,
    repeatTimes: number
  ) {
    throw new Error("Function not implemented.");
  }

  export function pauseAudio() {
    throw new Error("Function not implemented.");
  }

  export function resumeAudio() {
    throw new Error("Function not implemented.");
  }

  export function stopAudio() {
    throw new Error("Function not implemented.");
  }
}

declare namespace utils {
  /**
   * Transit integer color to independent values of R,G,B.
   * @param intColor - Integer color value.
   * @returns [R, G, B]
   */
  function intToRgb(
    intColor: number
  ): [number, number, number];

  /**
   * Transit values of R,G,B to integer color value.
   * @param R - Red color value.
   * @param G - Green color value.
   * @param B - Blue color value.
   * @returns Integer color value.
   */
  function rgbToInt(
    R: number,
    G: number,
    B: number
  ): number;
}

declare const KEY_TYPE: {
  HOME_BUTTON: number;
  VOLUME_DOWN_BUTTON: number;
  VOLUME_UP_BUTTON: number;
  POWER_BUTTON: number;
};

declare const CONTROLLER_TYPE: {
  LABEL: number;
  INPUT: number;
  PICKER: number;
  SWITCH: number;
  BUTTON: number;
  REMEMBER: number;
};

declare const INTERFACE_ORIENTATION_TYPE: {
  UNKNOWN: number;
  PORTRAIT: number;
  PORTRAIT_UPSIDE_DOWN: number;
  LANDSCAPE_LEFT: number;
  LANDSCAPE_RIGHT: number;
  FACE_UP: number;
  FACE_DOWN: number;
};

declare const OCR_METHOD: {
  IOS_VISION: number;
  AI_CLOUD: number;
};
