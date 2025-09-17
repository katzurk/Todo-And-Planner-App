# Todo and Planner App

- [Polish](README-PL.md)

---

## Author
- Katarzyna Kanicka

---

## How to run

Prepare the `.env` files based on the examples.

While being in the root directory of the project `ToDo-And-Planner-App` run:
`docker-compose up --build`

Next, open up the browser and type the url:
`localhost:3000`

**Tests**
For running API tests run:
`docker-compose run backend npm test`

---

## Description

This app lets you plan and schedule your tasks.

Includes:

- adding and deleting tasks lists
- adding and deleting tasks on these lists
- reordering of tasks in a list
- checking off tasks
- registration and logging in
- authorization and authentication using jwt tokens stored in browser cookies
- modifying your username
- resetting your password

---

## Languages and Libraries Used
- **Languages**: Typescript, HTML, CSS
- ***Frameworks**: Node Express for backend, React for frontend
- **Database**: PostgreSQL
- **Libraries**: Bootstrap
