import _ from "lodash";
//@ts-ignore
import config from "../config";
import {
  autotouchScriptsPath,
  isDebug,
  tempFolderName,
  tempPath,
} from "./constants";
import axios from "axios";

const {
  appInfo,
  appKill,
  appRun,
  appState,
  clearDialogValues,
  clearSystemAlbum,
  clipText,
  copyText,
  dialog,
  exec,
  findColor,
  findColors,
  findImage,
  findText,
  frontMostAppId,
  frontMostAppOrientation,
  getColor,
  getColors,
  getDeviceOrientation,
  getSN,
  getVersion,
  inputText,
  keepAutoTouchAwake,
  keyDown,
  keyUp,
  license,
  listAutoLaunch,
  log,
  ocr,
  openURL,
  recognizeText,
  recognizeTextSupportedLanguages,
  removeTimer,
  rootDir,
  saveToSystemAlbum,
  screenshot,
  setAutoLaunch,
  setTimer,
  stop,
  toast,
  touchDown,
  touchMove,
  touchUp,
  usleep,
  vibrate,
} = at;

const actionSleepDuration = 1000;
const scrollSleep = 1000;

function readFileHttp(path: string) {
  const [res, error] = deasync(() =>
    //@ts-ignore
    axios.get(
      `http://localhost:${config.port}/file/content?path=/${path}`
    )
  );

  const content: string | undefined =
    //@ts-ignore
    res.data["content"];

  if (!res || !content) {
    throw new Error(`Cannot read file ${path}`);
  }
  return content;
}

function createTempDirectory() {
  const [res, err] = fs.exists(tempPath);
  if (!res) {
    fs.createDirectory(tempPath);
  }
  return true;
}

/**
 * use when fs.readFile not work required Web Server.
 * @param path absolute path
 * @returns file content
 */
export function readFile(path: string) {
  const [result, error] = fs.readFile(path);
  if (!error) {
    return result;
  }
  createTempDirectory();
  const fileName = path.split("/").pop();
  // remove exists file
  fs.remove(`${tempPath}/${fileName}`);
  const [res, err] = fs.copy(
    path,
    tempPath + "/" + fileName
  );
  const tempFile = `/${tempFolderName}/${fileName}`;
  const content = readFileHttp(tempFile);
  // remove temp file for clean
  fs.remove(`${tempPath}/${fileName}`);
  return content;
}

// author @dung13796
/**
 * Captures a screenshot and returns its content as a Base64 string when fs.readFile not work required Web Server.
 *
 * @returns {string} - The Base64-encoded content of the captured screenshot.
 *
 * @throws {Error} - Throws an error if the screenshot cannot be captured or the file cannot be read.
 *
 * ### Example:
 * ```typescript
 * const screenshotBase64 = getScreenshotImage({ x: 0, y: 0, width: 1920, height: 1080 }, 2, 80);
 * console.log(screenshotBase64); // Base64 string of the screenshot
 * ```
 */
export function getScreenshotImage(
  region?: Region,
  scale?: number,
  quality?: number
) {
  const imageName = `${new Date().toISOString()}.png`;
  const imagePath = `${autotouchScriptsPath}/${imageName}`;
  at.screenshot(
    imagePath,
    region,
    scale,
    quality
  );
  const content = readFileHttp(imageName);
  fs.remove(imagePath);
  return content;
}

export async function waitForEither<
  T extends readonly unknown[]
>(
  promises: readonly [
    ...{ [K in keyof T]: Promise<T[K]> }
  ]
): Promise<{ [K in keyof T]: T[K] | undefined }> {
  // Map promises to include their index
  const indexedPromises = promises.map(
    (promise, index) =>
      promise.then(
        (value) => ({ index, value }),
        () => ({ index, value: undefined })
      )
  );

  // Wait for the first promise to settle
  const result = await Promise.race(
    indexedPromises
  );

  // Initialize results array with undefined, mutable array
  const results = new Array(promises.length).fill(
    undefined
  ) as { [K in keyof T]: T[K] | undefined };

  // Set the result of the first settled promise
  results[result.index as keyof T] = result.value;

  return results;
}
export function logDebug(
  message?: any,
  ...optionalParams: any[]
) {
  if (!isDebug) return;
  // toast(message, 1);
  console.log(message, ...optionalParams);
}
function sleep(ms: number) {
  logDebug("sleep -> ", ms);
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}
export function usleepMs(milliseconds: number) {
  logDebug("usleepMilis -> ", milliseconds);
  usleep(milliseconds * 1000);
}
export function openApp(bundleId: string) {
  logDebug(`openApp: ${bundleId}`);
  appKill(bundleId);
  usleepMs(3000);
  appRun(bundleId);
  usleepMs(actionSleepDuration);
  logDebug(`openApp: ${bundleId} complete`);
}

export function openSettings() {
  openApp("com.apple.Preferences");
}
export function closeSettings() {
  appKill("com.apple.Preferences");
}

export function deasync<T>(
  asyncFunction: () => Promise<T>,
  checkIntervalMs = 20
): [T | undefined, any] {
  let done = false;
  let result: T | undefined;
  let error: any;

  asyncFunction()
    .then((res) => {
      result = res;
      done = true;
    })
    .catch((err) => {
      error = err;
      done = true;
    });
  while (!done) {
    usleep(checkIntervalMs * 1000);
  }
  return [result, error];
}
export function tap(x: number, y: number) {
  logDebug(`Tap: ${x}|${y}`);
  touchDown(0, x, y);
  usleep(16000);
  touchUp(0, x, y);
  usleepMs(actionSleepDuration);
}
export function rectCenter(rect: Rectangle) {
  const x =
    (rect.topLeft.x +
      rect.topRight.x +
      rect.bottomLeft.x +
      rect.bottomRight.x) /
    4;
  const y =
    (rect.topLeft.y +
      rect.topRight.y +
      rect.bottomLeft.y +
      rect.bottomRight.y) /
    4;
  return { x, y };
}
export function visibleImage({
  duration = 1,
  interval = 1000,
  ...options
}: {
  targetImagePath: string;
  threshold?: number;
  region?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  debug?: boolean;
  method?: number;
  duration?: number;
  interval?: number;
}) {
  logDebug(
    `visibleImage: ${options.targetImagePath}`
  );
  const startTime = Date.now();

  function attemptFindImage(): boolean {
    const [result, err] = at.findImage(options);
    if (result.length <= 0 || err) return false;
    return true;
  }

  while (
    Date.now() - startTime <
    duration * 1000
  ) {
    if (attemptFindImage()) return true;
    usleepMs(interval);
  }

  return false;
}

export function clickImage({
  time = 1,
  duration = 1, // 1 seconds
  interval = 1000, // 1000 milliseconds
  ...options
}: {
  targetImagePath: string;
  count?: number;
  threshold?: number;
  region?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  debug?: boolean;
  method?: number;
  time?: number;
  duration?: number;
  interval?: number;
}) {
  logDebug(
    `clickImage: ${options.targetImagePath}`
  );
  const startTime = Date.now();
  let attempts = 0;

  function attemptClick(): boolean {
    const [result, err] = at.findImage(options);
    if (result.length <= 0 || err) return false;
    for (let id = 0; id < time; id++) {
      tap(result[0].x, result[0].y);
    }
    return true;
  }

  while (
    Date.now() - startTime <
    duration * 1000
  ) {
    if (attemptClick()) return true;
    attempts++;
    usleepMs(interval);
  }
  return false;
}

export function touchRect(
  rect: Rectangle,
  position:
    | "center"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight" = "center"
) {
  const { x, y } =
    position == "center"
      ? rectCenter(rect)
      : rect[position];

  tap(x, y);
}

export async function visibleText(
  text: string | string[],
  options?: {
    duration?: number | string;
    interval?: number;
    debug?: boolean;
  }
): Promise<Rectangle[] | null> {
  logDebug(`visibleText finding: ${text}`);
  if (_.isArray(text)) {
    text = text.map((x) => x.toLowerCase());
  } else {
    text = text.toLowerCase();
  }
  const { duration, interval, debug } =
    options || {};

  return new Promise((resolve) => {
    findText({
      options: {
        debug: debug || false,
      }, // OPTIONAL, options for text recognition, same as function recognizeText().
      matchMethod: (t) => {
        t = t.toLowerCase();
        return _.isArray(text)
          ? text.some((x) => t.includes(x))
          : t.includes(text);
      }, // REQUIRED, How to do matching to determine found.
      duration: duration || "1s",
      interval, // OPTIONAL, interval between loops in milliseconds, default is 1000 milliseconds.
      exitIfFound: true, // OPTIONAL, if exit findText if got a result successfully, default is true.
      eachFindingCallback: () => {
        // OPTIONAL, will call this function after each finding loop.
        logDebug(
          `------Did a time of finding text ${text} at ${new Date().toLocaleString()}-------`
        );
      },
      foundCallback: (result) => {
        logDebug(`visibleText:found ${text}`);
        resolve(result);
      },
      errorCallback: (error) => {
        resolve(null);
      },
      completedCallback() {
        resolve(null);
      },
      block: true, // OPTIONAL, you want to run findColors asynchronously or synchronously, block=true means it will run synchronously and block here till completed, default is false, doesn't block here.
    });
  });
}
export async function touchText(
  text: string,
  index = 0,
  options?: {
    duration?: number | string;
    interval?: number;
    debug?: boolean;
  }
): Promise<boolean> {
  text = text.toLowerCase();
  const { duration, interval, debug } =
    options || {};
  logDebug(`touchText finding: ${text}`);

  return new Promise((resolve) => {
    findText({
      options: {
        debug: debug || false,
      }, // OPTIONAL, options for text recognition, same as function recognizeText().
      matchMethod: (t) => {
        return t.toLowerCase().includes(text);
      }, // REQUIRED, How to do matching to determine found.
      duration: duration || "1s", // OPTIONAL, how long time you want it to keep finding? Three formats are supported: 1. `duration: 10` means repeat finding 10 times, the value must be a number, can't be a string; 2. `duration: '60s'` means keep finding for 60 seconds, the value must be seconds + a character 's'; 3. `duration: '2020-05-30 12:00:00'` means keep finding till 2020-05-30 12:00:00. Default is `duration: 10` means repeat 10 times, the value must be a string.
      interval, // OPTIONAL, interval between loops in milliseconds, default is 1000 milliseconds.
      exitIfFound: true, // OPTIONAL, if exit findText if got a result successfully, default is true.
      eachFindingCallback: () => {
        // OPTIONAL, will call this function after each finding loop.
        logDebug(
          `------Did a time of finding text ${text} at ${new Date().toLocaleString()}-------`
        );
      },
      foundCallback: (result) => {
        if (result.length < index - 1)
          return resolve(false);
        const { x, y } = rectCenter(
          result[index]
        );
        tap(x, y);
        logDebug(
          `touchText found: ${text}, ${x}|${y}`
        );
        resolve(true);
      },
      errorCallback: (error) => {
        resolve(false);
      },
      completedCallback() {
        resolve(false);
      },
      block: true, //OPTIONAL, you want to run findColors asynchronously or synchronously, block=true means it will run synchronously and block here till completed, default is false, doesn't block here.
    });
  });
}
// How to simulate a screen lock function?
export function lockScreen() {
  keyDown(KEY_TYPE.POWER_BUTTON);
  keyUp(KEY_TYPE.POWER_BUTTON);
}
export function stopScroll() {
  touchDown(6, 254.54, 931.03);
  usleep(382324.71);
  touchUp(6, 254.54, 931.03);
}
export function scrollRight(time = 10) {
  for (let i = 0; i < time; i++) {
    touchDown(1, 900, 300);
    for (let x = 900; x >= 100; x -= 30) {
      usleep(8000);
      touchMove(1, x, 300);
    }
    touchUp(1, 100, 300);
    usleep(300000);
  }
}
export function scrollLeft(time = 10) {
  for (let i = 0; i < time; i++) {
    touchDown(1, 100, 300);
    for (let x = 100; x <= 900; x += 30) {
      usleep(8000);
      touchMove(1, x, 300);
    }
    touchUp(1, 900, 300);
    usleep(300000);
  }
}
export function scrollDown(time = 10) {
  for (let i = 0; i < time; i++) {
    touchDown(1, 200, 900);
    for (let y = 900; y >= 300; y -= 30) {
      usleep(8000);
      touchMove(1, 200, y);
    }
    touchUp(1, 200, 300);
    usleep(100000);
  }
  usleepMs(scrollSleep);
}
export function scrollUp(time = 10) {
  for (let i = 0; i < time; i++) {
    touchDown(1, 200, 300);
    for (let y = 300; y <= 900; y += 30) {
      usleep(8000);
      touchMove(1, 200, y);
    }
    touchUp(1, 200, 900);
    usleep(300000);
  }
  usleepMs(scrollSleep);
}

export function forceHomeScreen() {
  keyDown(KEY_TYPE.HOME_BUTTON);
  keyUp(KEY_TYPE.HOME_BUTTON);
  usleepMs(500);
  keyDown(KEY_TYPE.HOME_BUTTON);
  keyUp(KEY_TYPE.HOME_BUTTON);
  usleepMs(500);
  keyDown(KEY_TYPE.HOME_BUTTON);
  keyUp(KEY_TYPE.HOME_BUTTON);
}
