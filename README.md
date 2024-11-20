# Chattr
## Summary
CHattr Is a real-time chat application that allows users to join, create and contribute to public and private chatrooms.
## Key Features 
- User Authentication: 
- Real-Time Messaging: Messages are instantly shared across users using WebSockets powered by Socket.io.
- Persistent Chat History: All messages are stored in a Postgresql DB, allowing users to see previous chats upon loading the app.
- User-Friendly Interface: A simple, intuitive chat interface with instant updates and responsive design.

## MVP
User logs in
Invite friends to chat
Have open or private rooms the require password to access
**Settings to change password / list all private rooms created by the user
User can create private room and assign a password
Private Room (Upon logging in, can see friend list / main chat window where users can invite other users)
Public room (for non-users, cannot chat unless they create an account
1 room where non-users can interact with users
Visual for how many users are online, if your friends are offline. Last logged in for friends
**Read/ Delivered and …User is typing 
Light/Dark theme toggle
User Tracking (who’s online?)
**Hashing private passwords

Non-User - Can see friends list/public chat rooms but cannot interact

TechStack: WebSockets, Docker, Kubernetes?, postgreSql?  Redis  ORM(Prisma)

Kubernetes: https://nicwortel.nl/blog/2022/continuous-deployment-to-kubernetes-with-github-actions

Design Inspos: https://cdn.dribbble.com/userupload/3348806/file/original-666b1dfe2c471c22a7f381d095ec57df.png?resize=1200x900


 ## Front End: 
It 1: Initiate Kinde Auth
Research Kinde Auth Docs
Write up Auth Component in Next
Initialize API calls to communicate to BE



##  Back End: 
It 1: Initiate PostGres DB (Users)
Write Users table with Prisma
Design schema for Table/PG
Migrate, seed table upon Kinde Auth

Middleware: Initiate Web Socket (socket.io) 

## Learning Goals: 
Authentication with roles
User/Non-user can use app features
Socket.io
GitHub Actions for CI/CD
NextJS
Docker
Testing


 ## Next Steps
-Seed user into prisma db 
-Update prisma schema (relational diagram)
-GitHub Actions for CI/CD and testing BE
-Create public/private room routes
-Create components 
	-Room
	-Sidebar
	-Input Field
