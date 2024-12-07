export const testScreenshot = () => {
  // import screenshot function from module at
  const { screenshot } = at;

  // Take screenshot without parameters.
  // Without parameter `savePath`, it will save the image to your iOS Album
  screenshot();
  // or
  at.screenshot();

  // Specify savePath parameter to take scsreenshot.
  // If the savePath doesn't start with character '/', means it's a relative path, the image will be saved to the relative path of current script
  // If the savePath starts with character '/', means it's a absolute path, the image will be saved to the absolute path
  screenshot(
    `images/${new Date().toISOString()}.png`
  );

  // Specify savePath and region, region means the rect area of the screen you want to capture screenshot
  screenshot(
    `images/${new Date().toISOString()}.png`,
    { x: 0, y: 0, width: 100, height: 200 }
  );

  // Prepare parameters before using
  const savePath = `images/${new Date().toISOString()}.png`;
  const region = {
    x: 0,
    y: 0,
    width: 300,
    height: 500,
  };
  screenshot(savePath, region);

  // If the provided savePath is end with any of "JPG/jpg/JPEG/jpeg", the produced image will be JPEG format, otherwise it will be PNG format;
  // JPEG format supports specifying quality from 0.0 to 1.0;
  // Param scale is resize factor.
  const savePathJpg = `images/${new Date().toISOString()}.jpg`;
  const scale = 0.5;
  const quality = 0.7;
  screenshot(savePathJpg, region, scale, quality);
};
