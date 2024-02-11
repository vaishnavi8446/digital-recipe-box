
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/getAllNotifications', notificationController.getAllNotifications);

router.put('/mark-read/:id', notificationController.markNotificationAsRead);

router.delete('/deleteNotification/:id', notificationController.deleteNotification);

module.exports = router;
