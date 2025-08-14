# Pepito App

Lorem ipsum ...

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGtlcTJhbGYyM2wxY2l3N285MG5kZjl3aWl5cjZjbTdndm5xNzlobCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/G5ZTJcW3dS9bHnx9AA/giphy.gif)

## Functional

### Use Cases

Regular
- register & login & logout
- view all posts
- create post
- remove post
- toggle like post
- view liked posts
- toggle save post
- view saved posts
- toggle archive post
- view archived posts
- report post

Moderator
- view reported posts
- block / unblock post
- block / unblock user

Administrator
- manage moderators (add, remove, edit, block / unblock)
- view reported posts
- block / unblock post
- block / unblock user
- remove user


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

Post
- id (UUID, required)
- author (UUID, User.id, required)
- image (string, required)
- text (string, required)
- date (string, ISO, requried)

### Technologies

- React / Router
- Express
- MongoDB
- JWT
- bcrypt
- Tailwind

### Code Coverage

![Code Coverage](https://docs.cypress.io/img/app/code-coverage/100percent.png)