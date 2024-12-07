declare namespace plist {
  /**
   * Read a plist file and return its content as a JSON object.
   * @param path The path to the plist file.
   * @returns A tuple where the first element is the parsed JSON object, and the second is an optional error message.
   */
  function read(
    path: string
  ): [Record<string, any>, string?];

  /**
   * Write a JSON object to a plist file.
   * @param data The JSON object to write.
   * @param path The path to the plist file.
   * @param format The format of the plist file. Can be "xml" or "binary".
   * @returns A tuple where the first element is a boolean indicating success, and the second is an optional error message.
   */
  function write(
    data: Record<string, any>,
    path: string,
    format: "xml" | "binary"
  ): [boolean, string?];

  /**
   * Load a plist string and convert it into a JSON object.
   * @param plistData The plist string.
   * @returns A tuple where the first element is the parsed JSON object, and the second is an optional error message.
   */
  function load(
    plistData: string
  ): [Record<string, any> | null, string?];

  /**
   * Dump a JSON object into a plist string.
   * @param data The JSON object to dump.
   * @param format The format of the plist data. Can be "xml" or "binary".
   * @returns A tuple where the first element is the plist string, and the second is an optional error message.
   */
  function dump(
    data: Record<string, any>,
    format: "xml" | "binary"
  ): [string | null, string?];
}
