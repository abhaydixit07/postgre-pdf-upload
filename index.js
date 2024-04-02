const express = require('express');
const multer = require('multer');
const fs = require('fs');

const { Pool } = require('pg');
const { Console } = require('console');
const cors = require('cors');
const env = require('dotenv');
const app = express();
app.use(cors());
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'AAKASH',
//   password: '1234',
//   port: 5432,
// });
env.config();
const pool = new Pool({
  connectionString: process.env.POSTGRE_URL,
});
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('pdf'), async (req, res) => {
  const fileData = fs.readFileSync(req.file.path);
  const filename = req.file.originalname;
  const queryText = 'INSERT INTO pdf_storage (filename, pdf_data) VALUES ($1, $2) RETURNING id';
  const values = [filename, fileData];
  try {
    const result = await pool.query(queryText, values);
    res.status(200).json({ id: result.rows[0].id, filename: filename });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file.');
  }
});

app.get('/pdf/:filename', async (req, res) => {
  const filename = req.params.filename;
  const queryText = 'SELECT pdf_data FROM pdf_storage WHERE filename = $1';
  try {
    const result = await pool.query(queryText, [filename]);
    if (result.rows.length === 0) {
      res.status(404).send('File not found.');
    } else {
      res.contentType('application/pdf').send(result.rows[0].pdf_data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving file.');
  }
});

app.get('/pdflist', async (req, res) => {
  const queryText = 'SELECT filename FROM pdf_storage;';
  try {
    const result = await pool.query(queryText);
    const filenames = result.rows.map(row => row.filename);
    console.log(filenames)
    res.status(200).json(filenames);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching PDF list.');
  }
});

app.get('/', (req, res) => {
  res.render('pdf_viewer');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
