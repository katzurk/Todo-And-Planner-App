# Todo and Planner App

## How to run

While being in the root directory of the project `ToDo-And-Planner-App` run:
`docker-compose up --build`

Next, open up the browser and type the url:
`localhost:3000`

**Tests**
For running API tests run:
`docker-compose run backend npm test`

## Description

This app lets you plan and schedule your tasks.

Includes:

- adding and deleting tasks lists
- adding and deleting tasks on these lists
- reordering of tasks in a list
- registration and logging in
- authorization and authentication using jwt tokens stored in browser cookies
