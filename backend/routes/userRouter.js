const express = require('express');
const router = express.Router();

const User = require('../models/user'); // model użytkownika

router.post('/register', (req, res) => { // Endpoint rejestracji użytkownika
  const { username, password } = req.body;

  const newUser = new User({   // Tworzenie nowego użytkownika
    username,
    password,
  });

  newUser.save((err) => {  // Zapisz użytkownika w bazie danych
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Błąd podczas rejestracji użytkownika' });
    } else {
      res.status(200).json({ message: 'Użytkownik zarejestrowany pomyślnie' });
    }
  });
});


router.post('/login', (req, res) => { // Endpoint logowania użytkownika
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {   // Znajdź użytkownika w bazie danych
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Błąd podczas logowania użytkownika' });
    } else if (!user) {
      res.status(404).json({ error: 'Nie znaleziono użytkownika' });
    } else {
      // Sprawdź poprawność hasła
      if (user.password === password) {
        res.status(200).json({ message: 'Zalogowano pomyślnie' });
      } else {
        res.status(401).json({ error: 'Niepoprawne hasło' });
      }
    }
  });
});

// TODO: DODANIE INNYCH ENDPOINTÓW DLA UŻYTKOWNIKÓW

module.exports = router;
