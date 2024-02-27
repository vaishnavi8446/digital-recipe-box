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
 *         description: A list of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Notification marked as read successfully
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
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
 *       '204':
 *         description: Notification deleted successfully
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/deleteNotification/:id", verifyToken, notificationController.deleteNotification);

module.exports = router;
