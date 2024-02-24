const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { verifyToken } = require("../shared/middleware");

router.get(
  "/getAllNotifications",
  verifyToken,
  notificationController.getAllNotifications
);

router.put(
  "/mark-read/:id",
  verifyToken,
  notificationController.markNotificationAsRead
);

router.delete(
  "/deleteNotification/:id",
  verifyToken,
  notificationController.deleteNotification
);

module.exports = router;
