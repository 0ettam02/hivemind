
# 🐝 hivemind

hivemind è un social network sviluppato come progetto universitario che permette agli utenti di caricare e condividere le proprie idee. Il progetto è realizzato con un frontend in Next.js e Tailwind CSS, un backend in Express.js e utilizza un database PostgreSQL con pooling per gestire i dati.

## 📌 Introduzione

hivemind nasce con l'idea di creare una piattaforma dove gli utenti possano condividere le proprie idee, ispirazioni e progetti. Grazie all'interfaccia semplice e reattiva sviluppata con Next.js e Tailwind CSS, gli utenti possono registrarsi, caricare post e interagire con altri membri della community. Il backend è costruito con Express.js e gestisce il database PostgreSQL tramite pool per ottimizzare le performance e la gestione delle connessioni.

## 🧑‍💻 Funzionalità

- **Registrazione e Autenticazione**: Gli utenti possono registrarsi e accedere alla piattaforma.
- **Caricamento di Idee e Post**: Gli utenti possono pubblicare e condividere le proprie idee con la community.
- **Interazione Sociale**: Possibilità di interagire con i post degli altri utenti.
- **Database PostgreSQL**: Gestione dei dati tramite PostgreSQL, utilizzando pooling per ottimizzare le connessioni al database.
- **Frontend Reattivo**: Semplice e moderno, costruito con Next.js e Tailwind CSS.

## 📊 Database

Il progetto utilizza un database PostgreSQL per archiviare le informazioni sugli utenti e i post. La gestione delle connessioni al database è ottimizzata con il pool.

## 🛠️ Installazione

Assicurati di avere installato:

- **Node.js** 16+ per il backend e il frontend
- **PostgreSQL** per il database

### Passaggi per eseguire il progetto:

1. Clona il repository:
```bash
git clone https://github.com/tuo_username/hivemind.git
cd hivemind
```

2. Crea un ambiente virtuale e installa le dipendenze per il frontend:
```bash
cd hivemind
npm install
```

3. Configura il backend e il database:
   - Crea un database PostgreSQL e configura le credenziali nel file `.env` per il backend.
   - Installa le dipendenze per il backend:
   ```bash
   cd server
   npm install
   ```

4. Esegui il backend:
```bash
npm start
```

5. Per eseguire il frontend:
```bash
cd hivemind
npm run dev
```

## 📜 Licenza

Questo progetto è distribuito sotto la licenza MIT. Vedi il file LICENSE per maggiori dettagli.

## 📫 Contatti

- **Email**: tuaemail@example.com
- **GitHub**: tuo_username
