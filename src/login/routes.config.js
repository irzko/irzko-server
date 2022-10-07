const express = require("express");
const router = express.Router();

const LoginController = require("../../controllers/login.controller");
const UsersController = require("../users/controllers/users.controller");
const ValidationMiddleware = require("../auth/middlewares/auth.validation.middleware");
const PermissionMiddleware = require("../auth/middlewares/permission.middleware");

router.post("/", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(1),
  [LoginController.login],
]);
