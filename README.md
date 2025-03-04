# Chatt-r
## Summary
- Chatt-r is a real-time chat application that connects users through seamless communication. The platform allows users to join existing conversations, create chat rooms, and engage in both public and private discussions. Using multiple authentication methods (Google OAuth, email/password, and guest access), Chatt-r maintains security through role-based permissions while accommodating different user needs.
- Built with NextJS, TypeScript, and WebSockets, the application provides instant message delivery and persistent chat history. Registered users have full access to all features, while guest users can participate in public rooms with limited functionality. Chatt-r supports both private password-protected rooms and open public discussions in a straightforward, responsive interface.


## Preview
<img width="370" alt="Chatt-r Landing Page" src="https://github.com/user-attachments/assets/06491325-a955-4e63-bb53-b22f70d25975" />

<a href="https://chatt-r.vercel.app" target="_blank">Visit Chatt-r</a>


## Key Features

### Core Functionality
- **Custom Authentication System**: Custom authentication with role-based access control
- **Real-Time Messaging**: Instant message delivery using WebSockets powered by Pusher.js
- **Persistent Chat History**: All messages stored in PostgreSQL for continuous conversation access
- **Public & Private Rooms**: Create open rooms or password-protected private spaces

### Authentication & Access Control
- **Multiple Login Methods**:
  - Google OAuth integration for one-click login
  - Traditional email/password authentication
  - Guest login for quick access with limited features
- **Role-Based Permissions**:
  - Registered users have full access to all features
  - Guest users can only view and interact with public rooms
- **Account Management**:
  - User profile customization options

### User Experience
- **Friend Management**: View online friends and invite them to chat rooms (registered users only)
- **Online Status Tracking**: See who's currently active and when friends were last online
- **Read/Delivered Receipts**: Know when messages have been received and read

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS(shadcn) <br>
- **Backend**: Prisma ORM, PostgreSQL, Pusher.js(Websocket), Custom Auth (argon2, JWT) <br>
- **Testing**: Cypress


# Implementation Progress

### Completed
- [x] Custom user authentication system with multiple login options
  - [x] Google OAuth integration
  - [x] Email/password authentication
  - [x] Guest access implementation
- [x] Role-based access control
- [x] User database with Prisma
- [x] Database migrations and seeding
- [x] WebSocket middleware setup
- [x] Public/private room creation
- [x] Tabbable chat rooms

### In Progress
- [x] E2E testing through Cypress
- [ ] UI/UX improvements for friends/search
- [ ] Mobile-responsive design improvements

### Planned
- [ ] Friend accept invitation system
- [ ] UI/UX enhancements
- [ ] Online status tracking for user friends
- [ ] Expire guest user when session ends but still persists messages

### Installation
```bash
# Clone the repository
git clone https://github.com/Sterling47/chatApp.git
cd chatApp

# Install dependencies
npm install

# Set up environment variables
Edit .env with your configuration

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev

# Run end-to-end tests
npm run cypress
```
## Contributors
- Adam Konber: https://github.com/Sterling47
- Peter Kim: https://github.com/peterkimpk1
