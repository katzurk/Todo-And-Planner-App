# Todo and Planner App

- [English](README.md)

---

## Autor
- Katarzyna Kanicka

---

## Instrukcja Uruchomienia

Przygotuj pliki `.env` na podstawie przykładu.

Będąc w katalogu głównym projektu `ToDo-And-Planner-App`, uruchom:

  ```docker-compose up --build```

Gdy kontenery będą już działać, otwórz przeglądarkę i wpisz adres URL:

  ```localhost:3000```

**Testy**

Aby uruchomić testy API, wpisz:

  ```docker-compose run backend npm test```

---

## Opis

Ta aplikacja pozwala planować i harmonogramować zadania.

Obejmuje:

- dodawanie i usuwanie list zadań
- dodawanie i usuwanie zadań z tych list
- zmianę kolejności zadań na liście
- odhaczanie zadań
- rejestrację i logowanie
- autoryzację i uwierzytelnianie przy użyciu tokenów jwt przechowywanych w plikach cookie przeglądarki
- modyfikację nazwy użytkownika
- resetowanie hasła

---

## Wykorzystane języki i biblioteki
- **Języki**: Typescript, HTML, CSS
- ***Frameworki**: Node Express dla backendu, React dla frontendu
- **Baza danych**: PostgreSQL
- **Biblioteki**: Bootstrap
