const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const shortid = require('shortid');

const app = express();
app.use(express.json());

let db;

async function setupDatabase() {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      urlOriginal TEXT NOT NULL,
      codigoCurto TEXT NOT NULL UNIQUE,
      dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

app.post('/encurtar', async (req, res) => {
  const { urlOriginal } = req.body;

  if (!urlOriginal) {
    return res.status(400).json({ erro: 'URL original é obrigatória.' });
  }

  try {
    const urlExistente = await db.get('SELECT * FROM urls WHERE urlOriginal = ?', urlOriginal);

    if (urlExistente) {
      const urlEncurtada = `http://localhost:3000/${urlExistente.codigoCurto}`;
      return res.json({ ...urlExistente, urlEncurtada });
    }

    const codigoCurto = shortid.generate();
    const resultado = await db.run(
      'INSERT INTO urls (urlOriginal, codigoCurto) VALUES (?, ?)',
      urlOriginal,
      codigoCurto
    );

    const urlEncurtada = `http://localhost:3000/${codigoCurto}`;
    res.status(201).json({
      id: resultado.lastID,
      urlOriginal,
      codigoCurto,
      urlEncurtada,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

app.get('/:codigoCurto', async (req, res) => {
  try {
    const { codigoCurto } = req.params;
    const url = await db.get('SELECT * FROM urls WHERE codigoCurto = ?', codigoCurto);

    if (url) {
      return res.redirect(url.urlOriginal);
    } else {
      return res.status(404).json({ erro: 'URL não encontrada.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

const PORT = 3000;

setupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Banco de dados SQLite conectado e pronto.");
  });
}).catch(err => {
  console.error("Erro ao iniciar o banco de dados:", err);
});