import axios from "axios";

export const testHttpRequest = () => {
  // Make a request for a user with a given ID
  axios
    .get("https://www.github.com")
    .then(function (response) {
      // handle success
      console.log(
        "----------------------------- Got HTTP Response:"
      );
      console.log(
        (response.data as string).substring(
          0,
          200
        )
      );
      console.log(
        "-----------------------------"
      );
      alert(
        "Successfuly made http request and response has been written to the log!"
      );
    })
    .catch(function (error) {
      // handle error
      alert(
        "Failed to make http request, error: ",
        error
      );
    })
    .then(function () {
      // always execute
    });
};
