const jwt = require("jsonwebtoken");
const User = require("../modules/user/user.model");

const auth = async (req, res, next) => {
  try {
    // Split the token from the Authorization header
    let token = req.header("Authorization").split("Bearer ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assign the user ID to the request object
    req.userId = decoded._id;

    // Find the user associated with the token
    const user = await User.findOne({
      "tokens.token": token,
    });

    // If no user is found, respond with an Unauthorized error
    if (!user) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    // Assign the token and user to the request object
    req.token = token;
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
