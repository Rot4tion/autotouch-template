export const testFileOperations = () => {
  function randomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(
          Math.random() * charactersLength
        )
      );
    }
    return result;
  }

  // Test creating directory
  {
    const dirPath =
      "/var/mobile/Library/AutoTouch/Scripts/" +
      randomString(10);

    // The dir should not exists before creating
    {
      const [exists, isDir] = fs.exists(dirPath);
      assert(
        !exists,
        "The dir should not exist!"
      );
      assert(
        !isDir,
        "The item should not be an directory!"
      );
    }

    // Test creating a directory
    {
      const [done, error] =
        fs.createDirectory(dirPath);
      assert(
        done,
        "createDirectory should be successful!"
      );
      assert(
        !error,
        "createDirectory should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify the dir exists
    {
      const [exists, isDir] = fs.exists(dirPath);
      assert(exists, "The dir should exist!");
      assert(
        isDir,
        "The item should be an directory!"
      );
    }

    // Test removing the dir
    {
      const [done, error] = fs.remove(dirPath);
      assert(
        done,
        "Removing directory should be successful!"
      );
      assert(
        !error,
        "Removing directory should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify the dir not exists
    {
      const [exists, isDir] = fs.exists(dirPath);
      assert(
        !exists,
        "The dir should not exist!"
      );
      assert(
        !isDir,
        "The item should not be an directory!"
      );
    }
  }

  // Test creating directory recusively
  {
    const parentDirPath = `/var/mobile/Library/AutoTouch/Scripts/${randomString(
      10
    )}`;
    const dirPath = `${parentDirPath}/${randomString(
      10
    )}/${randomString(10)}/${randomString(10)}`;

    const [exists, isDir] = fs.exists(dirPath);
    assert(!exists, "The dir should not exist!");
    assert(
      !isDir,
      "The item should not be an directory!"
    );

    {
      const [done, error] = fs.createDirectory(
        dirPath,
        false
      );
      assert(
        !done,
        "createDirectory should not be successful!"
      );
      assert(
        error,
        "createDirectory should not be successful and got an error!"
      );
    }

    {
      const [done, error] = fs.createDirectory(
        dirPath,
        true
      );
      assert(
        done,
        "createDirectory should be successful!"
      );
      assert(
        !error,
        "createDirectory should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify the dir exists
    {
      const [exists, isDir] = fs.exists(dirPath);
      assert(exists, "The dir should exist!");
      assert(
        isDir,
        "The item should be an directory!"
      );
    }

    // Test removing the dir
    {
      const [done, error] = fs.remove(
        parentDirPath
      );
      assert(
        done,
        "Removing directory should be successful!"
      );
      assert(
        !error,
        "Removing directory should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify the dir not exists
    {
      const [exists, isDir] = fs.exists(
        parentDirPath
      );
      assert(
        !exists,
        "The dir should not exist!"
      );
      assert(
        !isDir,
        "The item should not be an directory!"
      );
    }
  }

  // Test writing file
  {
    const filePath = `/var/mobile/Library/AutoTouch/Scripts/${randomString(
      10
    )}.txt`;

    // Verify the file not exist before creating
    {
      const [exists, isDir] = fs.exists(filePath);
      assert(
        !exists,
        "a non-exists file should not exist!"
      );
      assert(
        !isDir,
        "a non-exists file should not be an directory!"
      );
    }

    // Verify failure of reading file before creating
    {
      const [content, error] =
        fs.readFile(filePath);
      assert(
        !content,
        "Content if a non-exists file should be null!"
      );
      assert(
        error,
        "There should be an error while reading a non-exists file!"
      );
    }

    const content = randomString(100);
    {
      const [done, error] = fs.writeFile(
        filePath,
        content
      );
      assert(
        done,
        "Writing file should be successful!"
      );
      assert(
        !error,
        "Writing file should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify failure of reading file before creating
    {
      const [content_, error] =
        fs.readFile(filePath);
      assert(
        content_ === content,
        "Content should match the initial one!"
      );
      assert(
        !error,
        "There should be no error while reading a exists file!"
      );
      if (error) {
        alert(error);
      }
    }

    const content2 = randomString(100);
    // Test override a file
    {
      const [done, error] = fs.writeFile(
        filePath,
        content2,
        true
      );
      assert(
        done,
        "Writing file should be successful!"
      );
      assert(
        !error,
        "Writing file should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify overrided content are matched
    {
      const [content_, error] =
        fs.readFile(filePath);
      assert(
        content_ === content2,
        "Content should match the content2!"
      );
      assert(
        !error,
        "There should be no error while reading a exists file!"
      );
      if (error) {
        alert(error);
      }
    }

    const content3 = randomString(100);
    // Test override a file
    {
      const [done, error] = fs.writeFile(
        filePath,
        content3,
        false
      );
      assert(
        done,
        "Writing file should be successful!"
      );
      assert(
        !error,
        "Writing file should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify writing file without overriding will append the content
    {
      const [content_, error] =
        fs.readFile(filePath);
      assert(
        content_ === content2 + content3,
        "Content should match the content2!"
      );
      assert(
        !error,
        "There should be no error while reading a exists file!"
      );
      if (error) {
        alert(error);
      }
    }

    // Test removing the file
    {
      const [done, error] = fs.remove(filePath);
      assert(
        done,
        "Removing file should be successful!"
      );
      assert(
        !error,
        "Removing file should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify the file not exists
    {
      const [exists, isDir] = fs.exists(filePath);
      assert(
        !exists,
        "The file should not exist!"
      );
      assert(
        !isDir,
        "The item should not be an directory!"
      );
    }
  }

  // Test copying file
  {
    const filePath = `/var/mobile/Library/AutoTouch/Scripts/${randomString(
      10
    )}.txt`;

    const content = randomString(100);
    {
      const [done, error] = fs.writeFile(
        filePath,
        content
      );
      assert(
        done,
        "Writing file should be successful!"
      );
      assert(
        !error,
        "Writing file should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    const filePath2 = `/var/mobile/Library/AutoTouch/Scripts/${randomString(
      10
    )}.txt`;
    {
      const [done, error] = fs.copy(
        filePath,
        filePath2
      );
      assert(
        done,
        "Copying file should be successful!"
      );
      assert(
        !error,
        "Copying file should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify the file exists
    {
      const [exists, isDir] = fs.exists(filePath);
      assert(
        exists,
        "The file should not exist!"
      );
      assert(
        !isDir,
        "The item should not be an directory!"
      );
    }

    // Verify the file exists
    {
      const [exists, isDir] =
        fs.exists(filePath2);
      assert(
        exists,
        "The file should not exist!"
      );
      assert(
        !isDir,
        "The item should not be an directory!"
      );
    }

    // Test removing the file
    {
      const [done, error] = fs.remove(filePath);
      assert(
        done,
        "Removing file should be successful!"
      );
      assert(
        !error,
        "Removing file should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify the file not exists
    {
      const [exists, isDir] = fs.exists(filePath);
      assert(
        !exists,
        "The file should not exist!"
      );
      assert(
        !isDir,
        "The item should not be an directory!"
      );
    }

    // Test removing the file
    {
      const [done, error] = fs.remove(filePath2);
      assert(
        done,
        "Removing file should be successful!"
      );
      assert(
        !error,
        "Removing file should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify the file not exists
    {
      const [exists, isDir] =
        fs.exists(filePath2);
      assert(
        !exists,
        "The file should not exist!"
      );
      assert(
        !isDir,
        "The item should not be an directory!"
      );
    }
  }

  // Test moving file
  {
    const filePath = `/var/mobile/Library/AutoTouch/Scripts/${randomString(
      10
    )}.txt`;

    const content = randomString(100);
    {
      const [done, error] = fs.writeFile(
        filePath,
        content
      );
      assert(
        done,
        "Writing file should be successful!"
      );
      assert(
        !error,
        "Writing file should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    const filePath2 = `/var/mobile/Library/AutoTouch/Scripts/${randomString(
      10
    )}.txt`;
    {
      const [done, error] = fs.move(
        filePath,
        filePath2
      );
      assert(
        done,
        "Moving file should be successful!"
      );
      assert(
        !error,
        "Moving file should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify the file not exists
    {
      const [exists, isDir] = fs.exists(filePath);
      assert(
        !exists,
        "The file should not exist!"
      );
      assert(
        !isDir,
        "The item should not be an directory!"
      );
    }

    // Verify the file exists
    {
      const [exists, isDir] =
        fs.exists(filePath2);
      assert(
        exists,
        "The file should not exist!"
      );
      assert(
        !isDir,
        "The item should not be an directory!"
      );
    }

    // Test removing the file
    {
      const [done, error] = fs.remove(filePath2);
      assert(
        done,
        "Removing file should be successful!"
      );
      assert(
        !error,
        "Removing file should be successful and got no error!"
      );
      if (error) {
        alert(error);
      }
    }

    // Verify the file not exists
    {
      const [exists, isDir] =
        fs.exists(filePath2);
      assert(
        !exists,
        "The file should not exist!"
      );
      assert(
        !isDir,
        "The item should not be an directory!"
      );
    }
  }

  alert("Testing passed!");
};
