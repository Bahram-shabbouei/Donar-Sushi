const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./todos.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the todos database.');
    });
    db.run(`CREATE TABLE IF NOT EXISTS todos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        completed INTEGER DEFAULT 0
    )`);
    module.exports = db;