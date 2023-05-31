const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  // Update with your Cloud SQL connection details
  user: 'my-flourish-user',
  host: '34.31.186.62',
  database: 'my-flourish-db',
  password: 'admin123',
  port: 5432,
});

app.use(express.json());

app.post('/api/subscribe', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Insert the data into the 'newsletter' table
    const query = 'INSERT INTO newsletter (name, email) VALUES ($1, $2)';
    const values = [name, email];
    await pool.query(query, values);

    // Return a success response
    res.status(200).json({ message: 'Successfully subscribed to the newsletter' });
  } catch (error) {
    console.error('Failed to subscribe:', error);
    // Return an error response
    res.status(500).json({ error: 'Failed to subscribe to the newsletter' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
