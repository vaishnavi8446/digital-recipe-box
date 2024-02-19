const db = require("../db/db");

exports.getAllNotifications = (req, res) => {
  try {
    const sql = "SELECT * FROM notifications";
    db.query(sql, (err, notifications) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ status_code: 500, error: "Internal server error" });
      }
      res.status(200).send({ status_code: 200, data: notifications });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

exports.markNotificationAsRead = (req, res) => {
  try {
    const notificationId = req.params.id;
    const { read } = req.body;
    const readDbValueQuery = "SELECT `read` FROM notifications WHERE id = ?";

    db.query(readDbValueQuery, notificationId, (err, rows) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ status_code: 500, error: "Internal server error" });
      }

      if (rows.length === 0) {
        return res
          .status(404)
          .json({ status_code: 404, message: "Notification not found" });
      }
      const currentReadValue = rows[0].read;
      if (currentReadValue === 0) {
        const updateNotificationQuery =
          "UPDATE notifications SET `read` = ? WHERE id = ?";
        db.query(
          updateNotificationQuery,
          [read, notificationId],
          (err, result) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ status_code: 500, error: "Internal server error" });
            }
            return res.status(200).json({
              status_code: 200,
              message: "Notification marked as read",
              data: result,
            });
          }
        );
      } else {
        return res
          .status(404)
          .json({
            status_code: 404,
            error: "Notification already marked as read!",
          });
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status_code: 500, error: "Internal server error" });
  }
};

exports.deleteNotification = (req, res) => {
  try {
    const notificationId = req.params.id;
    const sql = "DELETE FROM notifications WHERE id = ?";
    db.query(sql, [notificationId], (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ status_code: 500, error: "Internal server error" });
      }
      res.status(200).send({
        status_code: 200,
        message: "Notification deleted",
        data: result,
      });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};
