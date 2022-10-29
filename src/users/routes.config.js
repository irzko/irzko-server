const express = require("express");
const router = express.Router();
const UsersController = require("./controllers/users.controller");
const ValidationMiddleware = require("../auth/middlewares/auth.validation.middleware");
const PermissionMiddleware = require("../auth/middlewares/permission.middleware");

router.post("/register", [UsersController.insert]);

router.get("/profile/:userId", [
  // ValidationMiddleware.validJWTNeeded,
  // PermissionMiddleware.minimumPermissionLevelRequired(1),
  UsersController.getById,
]);

router.post("/update-avatar", [UsersController.changeAvt]);
router.post("/update-name", [UsersController.changeName]);
router.post("/update-email", [UsersController.changeEmail]);
router.get("/get-all-user", [UsersController.getAllUser]);

module.exports = router;
