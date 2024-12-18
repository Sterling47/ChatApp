# Chattr
## Summary
Chattr is a real-time chat application that allows users to join, create and contribute to public and private chatrooms.
## Key Features 
- User Authentication: 
- Real-Time Messaging: Messages are instantly shared across users using WebSockets powered by Pusher.js.
- Persistent Chat History: All messages are stored in a Postgresql DB, allowing users to see previous chats upon loading the app.
- User-Friendly Interface: A simple, intuitive chat interface with instant updates and responsive design.

## MVP
[x]User logs in <br/>
[ ] Invite friends to chat <br/>
[ ] Have open or private rooms the require password to access <br/>
[ ] User can create private room and assign a password <br/>
[ ] Private Room (Upon logging in, can see friend list / main chat window where users can invite other users) <br/>
[ ] Public room (for non-users, cannot chat unless they create an account <br/>
[ ] 1 room where non-users can interact with users <br/>
[ ] Visual for how many users are online, if your friends are offline. Last logged in for friends <br/>
[ ] Light/Dark theme toggle <br/>
[ ] User Tracking (who’s online?) <br/>
**Settings to change password / list all private rooms created by the user
**Read/ Delivered and …User is typing 
**Hashing private passwords

Non-User - Can see friends list/public chat rooms but cannot interact

TechStack: WebSockets(Pusher.js), postgreSQL, ORM(Prisma), NextJS, Authentication(Kinde)
- To add (Docker/Kubernetes, S3 Buckets(?))

Kubernetes: https://nicwortel.nl/blog/2022/continuous-deployment-to-kubernetes-with-github-actions

Design Inspos: https://cdn.dribbble.com/userupload/3348806/file/original-666b1dfe2c471c22a7f381d095ec57df.png?resize=1200x900


 ## Front End: 
It 1: [x] Initiate Kinde Auth <br/>
[x] Research Kinde Auth Docs <br/>
[x] Write up Auth Component in Next <br/>
[x] Initialize API calls to communicate to BE
[x] Seed user into prisma db 


##  Back End: 
It 1: Initiate PostGres DB (Users) <br/>
[x] Write Users table with Prisma <br/>
[x] Design schema for Table/PG <br/>
[x] Migrate, seed table upon Kinde Auth
[x] Middleware: Initiate Web Socket (socket.io) 
[x] Create public/private rooms

## Learning Goals: 
- Authentication with roles
- User/Non-user can use app features
- Websockets
- GitHub Actions for CI/CD, Docker/Kubernetes
- NextJS


 ## Next Steps
[ ] Adding tabbable rooms
[ ] Inviting users to chat room
[ ] UI/UX update


