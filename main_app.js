const express = require('express');
const mariadb = require('mariadb');
const app = express();
const PORT = process.env.PORT || 3000;

const pool = mariadb.createPool({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
  connectionLimit: 5,
});

app.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const rows = await connection.query('SELECT * FROM your_cur_table');
    connection.release();

    // Visualize data using a library like Chart.js
    const chartData = rows.map(row => ({ x: row.timestamp, y: row.value }));

    res.json(chartData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});