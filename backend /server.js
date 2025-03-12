const express = require('express');
    const db = require('./database');
    const app = express();
    const port = 3001;
    app.use(express.json());
    // Alle Aufgaben abrufen
    app.get('/todos', (req, res) => {
        db.all('SELECT * FROM todos', [], (err, rows) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.json(rows);
        });
    });
    // Aufgabe hinzufügen
    app.post('/todos', (req, res) => {
        const { task } = req.body;
        db.run('INSERT INTO todos(task) VALUES(?)', [task], function(err) {
            if (err) {
                res.status(500).send(err.message);
            }
            res.json({ id: this.lastID });
        });
    });
    // Aufgabe aktualisieren
    app.put('/todos/:id', (req, res) => {
        const { id } = req.params;
        const { task, completed } = req.body;
        db.run('UPDATE todos SET task = ?, completed = ? WHERE id = ?', [task, completed, id], (err) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.send();
        });
    });
    // Aufgabe löschen
    app.delete('/todos/:id', (req, res) => {
        const { id } = req.params;
        db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.send();
        });
    });
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });