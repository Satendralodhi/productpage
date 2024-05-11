const CreateProductverify = async (req, res, next) => {
  try {
    if (!req.body.type) {
      result = "discount type is required";
    } else if (req.body.value) {
      result = "discount value is required";
    } else {
      next();
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === "ValidationError") {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
};
module.exports = CreateProductverify;
