# AutoTouch Typescript Template

[![License](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)

This repository is a template setup designed to easily work with the AutoTouch tweak. It provides an environment that supports TypeScript, bundling, and running scripts. The APIs used in this template are based on the official AutoTouch documentation, which can be found at [AutoTouch Docs](https://docs.autotouch.net/).

## Setup Instructions

To get started with this template, follow the steps below:

1. Clone the repository

    ```bash
    git clone https://github.com/Rot4tion/autotouch-template.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. On the phone open `AutoTouch > Settings > Turn on Web Server`.

4. Configure the environment
    Modify the `config.js` file to configure the setup according to your machine and needs. This file will include configurations related to AutoTouch and script execution.

    ```js
    module.exports = {
    isAutoUpload: true, // Auto upload build file to AutoTouch host
    isAutoStart: false, // Auto start script it will stop current playing script and run new build script
    host: "192.168.1.117",// Your phone ip address
    port: 8080,
    filename: "bundle.js", //File name you want on your phone
    };
    ```

5. Run script

    ```bash
    npm run dev
    ```

    - Development mode, every time you save a file, the code will automatically be bundled and do actions in `config.js` file.

    ```bash
    npm run start
    ```

    - Run bundle script already build on phone.

    - This command will run the script based on the configurations set in the `config.js` file.

## Sample Code

Sample code and examples can be found in the `src/examples` directory. You can use these as references for building your own scripts using the AutoTouch Template.

## ✉️ Support & Contributions

Feel free to open issues or submit pull requests if you have suggestions, questions, or run into any problems. Your contributions are welcome!

Happy coding, and enjoy building your AutoTouch Script.

💖 If you found this helpful, don't forget to give it a star! Your support makes all the difference! 🌟
