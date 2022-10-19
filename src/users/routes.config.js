const express = require("express");
const router = express.Router();
const UsersController = require("./controllers/users.controller");
const ValidationMiddleware = require("../auth/middlewares/auth.validation.middleware");
const PermissionMiddleware = require("../auth/middlewares/permission.middleware");

router.post("/register", [UsersController.insert]);

router.get("/:userId", [
  // ValidationMiddleware.validJWTNeeded,
  // PermissionMiddleware.minimumPermissionLevelRequired(1),
  UsersController.getById,
]);

module.exports = router;
