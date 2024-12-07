declare namespace fs {
  /**
   * Check if a path exists and whether it is a directory.
   * @param path The path to check.
   * @returns A tuple where the first element is a boolean indicating existence, and the second is a boolean indicating if it's a directory.
   */
  function exists(
    path: string
  ): [boolean, boolean];

  /**
   * Create a directory at the specified path.
   * @param path The path to the directory to create.
   * @param recursive Optional. Whether to create directories recursively. Default is false.
   * @returns A tuple where the first element is a boolean indicating success, and the second is an optional error message.
   */
  function createDirectory(
    path: string,
    recursive?: boolean
  ): [boolean, string?];

  /**
   * Remove a file or directory at the specified path.
   * @param path The path to the file or directory to remove.
   * @returns A tuple where the first element is a boolean indicating success, and the second is an optional error message.
   */
  function remove(
    path: string
  ): [boolean, string?];

  /**
   * Read the content of a file.
   * @param path The path to the file.
   * @returns A tuple where the first element is the content of the file or null if the file doesn't exist, and the second is an optional error message.
   */
  function readFile(
    path: string
  ): [string | null, string?];

  /**
   * Write content to a file.
   * @param path The path to the file.
   * @param content The content to write.
   * @param overwrite Optional. Whether to overwrite the file if it exists. Default is true.
   * @returns A tuple where the first element is a boolean indicating success, and the second is an optional error message.
   */
  function writeFile(
    path: string,
    content: string,
    overwrite?: boolean
  ): [boolean, string?];

  /**
   * Copy a file from one path to another.
   * @param source The source path of the file.
   * @param destination The destination path of the file.
   * @returns A tuple where the first element is a boolean indicating success, and the second is an optional error message.
   */
  function copy(
    source: string,
    destination: string
  ): [boolean, string?];

  /**
   * Move a file from one path to another.
   * @param source The source path of the file.
   * @param destination The destination path of the file.
   * @returns A tuple where the first element is a boolean indicating success, and the second is an optional error message.
   */
  function move(
    source: string,
    destination: string
  ): [boolean, string?];
}
