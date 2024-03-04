const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { verifyToken } = require("../shared/middleware");

/**
 * @swagger
 * /notification/getAllNotifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notification APIs] 
 *     description: Retrieve a list of all notifications.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: All notifications fetched successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '500':
 *         description: Internal server error
 */
 
router.get("/getAllNotifications", verifyToken, notificationController.getAllNotifications);

/**
 * @swagger
 * /notification/mark-read/{id}:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notification APIs] 
 *     description: Mark a notification as read by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Notification ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               read:
 *                 type: boolean
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Mark notification successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '500':
 *         description: Internal server error
 */
router.put("/mark-read/:id", verifyToken, notificationController.markNotificationAsRead);

/**
 * @swagger
 * /notification/deleteNotification/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notification APIs] 
 *     description: Delete a notification by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Notification ID
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Delete notification successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '500':
 *         description: Internal server error
 */
router.delete("/deleteNotification/:id", verifyToken, notificationController.deleteNotification);

module.exports = router;
