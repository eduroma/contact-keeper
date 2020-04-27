const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
app.use(express.json({ extended: false }));

// Connect the database
connectDB();

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/bluid'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
