const express = require('express');
const connection = require('./db');
const { updateRedditData } = require('./redditApi');

const router = express.Router();

router.get('/update-reddits', async (req, res) => {
    try {
        const reddits = await updateRedditData();

        connection.query('TRUNCATE TABLE reddits', (truncateError) => {
            if (truncateError) {
                throw truncateError;
            }

            const insertQuery = 'INSERT INTO reddits (display_name, title, banner_img, public_description, description, url) VALUES ?';
            const values = reddits.map(reddit => [reddit.display_name, reddit.title, reddit.banner_img, reddit.public_description, reddit.description, reddit.url]);

            connection.query(insertQuery, [values], (insertError) => {
                if (insertError) {
                    throw insertError;
                }

                res.json({ success: true, message: 'Datos de Reddit actualizados en la base de datos.' });
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
});

router.get('/reddits', (req, res) => {
    connection.query('SELECT * FROM reddits', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/reddits/:id', (req, res) => {
    const redditId = req.params.id;
    connection.query('SELECT * FROM reddits WHERE id = ?', [redditId], (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});

module.exports = router;