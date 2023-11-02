import { body, validationResult } from "express-validator";

const adminRegisterValidator = () => {
  return [
    body("email", "Should Valid Email").isEmail(),
    body("password", "Should be stronge password").isStrongPassword(),
    body("mobile", "Should contain 10 digits").isMobilePhone(),
    body("name", "Should have >2 and <15 characters").isLength({
      min: 2,
      max: 15,
    })
 
  ];
};

const errorMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(400).json({ error: errors.array() });
  }
  return next();
};

export { adminRegisterValidator, errorMiddleware };
