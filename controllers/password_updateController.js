

const url = require('url');
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 
});

exports.password_update = (req,res) => {
    const { username, oldPassword, newPassword } = req.body;

  // Retrieve the user's current password hash from the database
  db.query('SELECT password FROM Users WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }

    // If the user doesn't exist, send an error
    if (results.length === 0) {
      res.render('update-password', { message: 'Invalid username' });
      return;
    }

    const passwordHash = results[0].password;

    // Check if the old password matches the current password
    bcrypt.compare(oldPassword, passwordHash, (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }

      // If the old password is incorrect, send an error
      if (!result) {
        res.render('update-password', { message: 'Incorrect password' });
        return;
      }

      // Hash the new password and update the user's password in the database
      bcrypt.hash(newPassword, 8, (error, hash) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
          return;
        }

        db.query('UPDATE Users SET password = ? WHERE username = ?', [hash, username], (error, results) => {
          if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
          }

          return res.render('update-password', { message: 'Password updated successfully' });
        });
      });
    });
  });
};