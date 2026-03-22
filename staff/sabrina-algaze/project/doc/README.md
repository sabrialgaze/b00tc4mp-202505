# Count.in

This app was born from a real need identified by a football coach: managing player attendance and payments for training sessions in an efficient and centralized way. When handled manually, keeping track of who is attending, who has paid, and who is active can quickly become overwhelming.

The app allows players to view upcoming sessions and confirm their attendance, declare payments for monthly or daily training, and view their attendance and payment history. For the coach, it provides a clear overview of who’s attending each session, manages groups and training sessions, confirms player payments, and offers the ability to add or remove players from groups as needed.

Built with real users in mind, the app aims to streamline everyday team management tasks, reduce admin work for the coach, and offer a better experience for the players.

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGtlcTJhbGYyM2wxY2l3N285MG5kZjl3aWl5cjZjbTdndm5xNzlobCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/G5ZTJcW3dS9bHnx9AA/giphy.gif)

## Functional

### Use Cases

Player
- register, login and logout
- declare payment for a month or day training  
- view confirmed payments (current and past)
- view upcoming trainings (by group)
- confirm attendance to a training (only if month/ day payment is up to date)
- view list of players' attendance to a training
- view attendance history

Coach
- create, edit and remove group 
- add / remove players to a group
- view list of players from a group 
- edit / remove training session  
- view attendance list per session  
- view all players' payment status

### Future Features

Coach
- change training status to cancelled
- confirm attendance to a training outside their main group (as guest) 
- view attendance history per player 
- view payment history per player
- attendance statistics dashboard (per player / group / month)


### UI Design

[Figma](https://www.figma.com/design/gsNLHMODBJEGThNYekjEtY/App?node-id=0-1&t=lYJOMVvT3CO26meu-1)


## Technical

## Blocks

- App (frontend built with React)
- API (backend built with Express)
- DB (powered by MongoDB)

### Packages

- api (backend)
- app (frontend)
- com (common stuff shared in api and app)
- doc (project documentation)

### Data Model

User
- id (UUID, required)
- name (string, required)
- email (string, required)
- password (string, required)
- role (string, required, enum player|coach)

Group
- id (UUID, required)
- owner (UUID, User.id, required)
- name (string, required)
- players (UUID, [User.id])
- day (string, required, enum monday|tuesday|wednesday|thursday|friday|saturday|sunday)
- time (string, required, pattern HH:mm)
- location (string, required)
- coach (UUID, User.id, required)

Training
- id (UUID, required)
- group (UUID, Group.id, required)
- date (Date, required)
- coach (UUID, User.id, required)
- joined (UUID, [User.id])
- invited (UUID, [User.id]) 
- status (string, required, enum confirmed|cancelled)

Payment
- id (UUID, required)
- player (UUID, User.id, required)
- service (string, required, enum month|day)
- date (Date, required)
- trainingDate (Date, required)
- group (UUID, Group.id, required)
- confirmed (boolean, required)

### Technologies

- React / Router
- Express
- MongoDB
- JWT
- bcrypt
- Tailwind

### Code Coverage

![Code Coverage](https://docs.cypress.io/img/app/code-coverage/100percent.png)