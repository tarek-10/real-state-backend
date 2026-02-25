import Joi from "joi";

const registerValidation = {
  body: Joi.object()
    .required()
    .keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).max(15).required().label("Password"),
      password_confirmation: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .label("Confirm password")
        .options({ messages: { "any.only": "{{#label}} does not match" } }),
    }),
};
const getUserByIdValidation = {
  params: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};

export { registerValidation, getUserByIdValidation };
