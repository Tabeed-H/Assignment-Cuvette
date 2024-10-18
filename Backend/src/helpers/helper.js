exports.checkBody = async (body) => {
  try {
    if (
      Object.keys(body).length == undefined ||
      Object.keys(body).length == 0
    ) {
      return false;
    }
    return true;
  } catch (err) {
    return err;
  }
};
