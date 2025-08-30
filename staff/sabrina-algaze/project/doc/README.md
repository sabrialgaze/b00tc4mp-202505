# Count.in

This app was born from a real need identified by a football coach: managing player attendance and payments for training sessions in an efficient and centralized way. Keeping track of who is attending, who has paid, and who is active can quickly become overwhelming with manual methods.

The app allows players to view upcoming sessions and confirm their attendance. For the coach, it provides a clear overview of who’s attending each session, tracks attendance history, manages payments by month and group, and offers the ability to update or deactivate player records as needed.

Built with real users in mind, the app aims to streamline everyday team management tasks, reduce admin work for the coach, and offer a better experience for the players.

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGtlcTJhbGYyM2wxY2l3N285MG5kZjl3aWl5cjZjbTdndm5xNzlobCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/G5ZTJcW3dS9bHnx9AA/giphy.gif)

## Functional

### Use Cases

Player
- register & login & logout
- view upcoming trainings (by group)
- confirm attendance to a training (only if monthly payment is up to date)
- confirm attendance to a training outside their main group (as guest) 
- view list of players' attendance to a training
- view attendance history

Coach
- create training session (by date & group)  
- edit / remove training session  
- view attendance list per session  
- view attendance history per player  
- mark player as "paid" or "unpaid" for a given month  
- view all players' payment status (by month / group) 
- deactivate player (when she is no longer part of the trainings)

### Future Features


Coach
- Attendance statistics dashboard (per player / group / month)


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
- username (string, required)
- password (string, required)
- role (string, required, enum player|coach)

Group
- id (UUID, required)
- name (string, required)
- players (UUID, [User.id])
- date (Date, required)
- coach (UUID, User.id, required)

Training
- id (UUID, required)
- group (UUID, Group.id, required)
- date (Date, required)
- coach (UUID, User.id, required)
- joined (UUID, [User.id])
- invited (UUID, [User.id]) 

Payment
- id (UUID, required)
- player (UUID, User.id)
- service (string, required, enum monthly|daily)
- date (Date, required)

### Technologies

- React / Router
- Express
- MongoDB
- JWT
- bcrypt
- Tailwind

### Code Coverage

![Code Coverage](https://docs.cypress.io/img/app/code-coverage/100percent.png)