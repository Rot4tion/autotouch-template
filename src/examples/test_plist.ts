export const testPlist = () => {
  const plistFilePath =
    "./resources/sample.plist";
  const plistFilePath2 =
    "./resources/sample2.plist";

  // Read a plist file, return it as a json object
  const [sample, error] = plist.read(
    plistFilePath
  );
  if (error) {
    alert(error);
  } else {
    console.log(
      `Got plist.read result: \n${JSON.stringify(
        sample,
        null,
        "    "
      )}`
    );
  }

  {
    // Write a json object as a plist into a file, the foramt parameter specifis "xml", "binary" you want to write with.
    const [done, error] = plist.write(
      sample,
      plistFilePath2,
      "xml"
    );
    if (error) {
      alert(error);
    } else {
      if (done) {
        alert(
          `Successfully wrote data to plist file at ${plistFilePath2}`
        );
      } else {
        alert(
          `Failed to write data to plist file, unknown reason!`
        );
      }
    }
  }

  {
    const [plistData, error] = fs.readFile(
      plistFilePath
    );
    if (error) {
      alert(
        `Failed to read plist file to string, error: ${error}`
      );
    } else {
      if (plistData) {
        // Load a plist string to json object.
        const [jsonObject, error] =
          plist.load(plistData);
        if (error) {
          alert(error);
        } else {
          console.log(
            `Got plist.load result: \n${JSON.stringify(
              jsonObject,
              null,
              "    "
            )}`
          );
        }
      } else {
        alert(
          `Content of plist file at ${plistFilePath} is nil while is shouldn't!`
        );
      }
    }
  }

  {
    // Dump a json object to plist data with format "xml" or "binary"
    const [plistData, error] = plist.dump(
      sample,
      "xml"
    );
    if (error) {
      alert(error);
    } else {
      console.log(
        `Got plist.dump result: \n${plistData}`
      );
    }
  }

  {
    const [done, error] = fs.remove(
      plistFilePath2
    );
    assert(
      done,
      "Failed to remove file plistFilePath2!"
    );
    if (error) {
      alert(error);
    }
  }
};
