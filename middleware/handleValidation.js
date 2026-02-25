import { StatusCodes } from "http-status-codes";
const validationResult = (schema) => {
  return (req, res, next) => {
    const validartionErr = [];
    const validationMethod = ["body", "params", "query", "file"];
    validationMethod.forEach((key) => {
      if (req[key] && schema[key]) {
        const validationRes = schema[key].validate(req[key]);
        if (validationRes.error) {
          validartionErr.push(validationRes.error.details[0].message);
        }
      }
    });
    if (validartionErr.length) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: validartionErr.join() });
    }
    next();
  };
};
export default validationResult;
