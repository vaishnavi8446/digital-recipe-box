const getAllNotifications = (conn) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM notifications", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const idDbValueQuery = (conn, id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT * FROM notifications where id = ?",
      [id],
      (error, results) => {
        if (results.length > 0) {
          resolve(true); // ID exists
        } else {
          resolve(false); // ID does not exist
        }
      }
    );
  });
};

const deleteNotification = (conn, id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "DELETE FROM notifications WHERE id = ?",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const readDbValueQuery = (conn, notificationId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT `read` FROM notifications WHERE id = ?",
      notificationId,
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const updateNotificationQuery = (conn, read, notificationId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "UPDATE notifications SET `read` = ? WHERE id = ?",
      [read, notificationId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  getAllNotifications,
  idDbValueQuery,
  deleteNotification,
  readDbValueQuery,
  updateNotificationQuery,
};
