const _response = require("./responseHandler");

const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue)[0]; // Get the first field with a duplicate key
  const code = 409; // Conflict status code
  return res
    .status(code)
    .send(
      _response.generateResponse(
        [],
        "",
        code,
        `An account with that ${field} already exists.`,
        true
      )
    );
};

module.exports = (err, req, res, next) => {
  try {
    console.log("Error middleware triggered");
    console.log(err);

    // Handle duplicate key error
    if (err.code && err.code == 11000) {
      return handleDuplicateKeyError(err, res);
    }

    // Fallback for other errors
    return res
      .status(500)
      .send(
        _response.generateResponse(
          [],
          "",
          500,
          "An unknown error occurred.",
          err.message,
          true
        )
      );
  } catch (error) {
    // In case of errors in the error handling itself
    return res
      .status(500)
      .send(
        _response.generateResponse(
          [],
          "",
          500,
          "An unknown error occurred during error handling.",
          error.message,
          true
        )
      );
  }
};
