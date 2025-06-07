# App

## Intro

Lorem ipsum ...

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzBiNnNieGRxaHV3cGl6ajBucjk5Y3V3bDVkdTN0amY5ZWJ2dmUzcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3GSoFVODOkiPBFArlu/giphy.gif)

## Functional

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

Post
- id (UUID, required)
- author (UUID, User.id, required)
- image (string, required)
- text (string, required)
- date (string, ISO, required)