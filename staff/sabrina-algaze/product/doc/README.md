# App

## Intro

Lorem ipsum ...

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzBiNnNieGRxaHV3cGl6ajBucjk5Y3V3bDVkdTN0amY5ZWJ2dmUzcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3GSoFVODOkiPBFArlu/giphy.gif)

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

### Data Model

User
- id (UUID, required)
- name (string, required)
- email (string, required)
- username (string, required)
- password (string, required)
- saved([UUID], [Post.id])
- role (string, required, enum regular|moderator|administrator)

Post
- id (UUID, required)
- author (UUID, User.id, required)
- image (string, required)
- text (string, required)
- date (Date, required, default now)
- likes([UUID], [Post.id])
- archived(boolean, required, default false)
