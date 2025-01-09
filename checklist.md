## testing
- [] Look into cypress or other testing suites for nextJS app

## header
- [x] Subscribe user to channel on input
- [x] Component to update database and propagate to all clients
- [x] Show channel information on sidebar
- [x] Create dynamic room
- [x] Write roomID dynamic route to render after room gets created
- [x] Create shared layout for user-dash with Home component and dynamic room route
- [x] Create children as viewbox
- [x] Move form inside viewbox 
- [] **Private room message encryption

## viewbox
- [] Style chatroom component to be more user friendly
  - [] Display other user messages
  - [] Display room information better (room name)
  - [] Style send message input
- [] Change room name if user is room owner
- [] Style user messages differently vs other user messages
- [] Delete rooms if user owns the room
- [] **Tabbable rooms
- after schema:
  - [] invite friends to rooms
  - [] see amount of people in the room
- **AI summary of 10/100/1000 messages 

## login
- [] Add backgrounds
- [x] Restyle login component
- [] Add actionable messages
- [x] Fix logout redirect
- [] initial start things (/Home)
  - [] Welcome message, 
  - [] Change username
  - [] first time runthrough (1/5 steps)
- [] add session token expiration on logout from Kinde 

## nav 
 - [] display all users list (admin for now)
  - [] searchable list of users
  - [] add to friends list
  - [] onclick, be able to invite other user to room
- [] Combine public/private rooms list
  - [] Show public/private icon next to room name

     
## nav-modal
  - [] Add settings tab
    - [] /Settings page 
      -change username
      -accept invite from non-friends

## mobile
- [] responsive design

## prisma schema
- [x] Add friends table to schema
  - [x] related to user

## notification
- [] show from latest invites with accept/deny requests

## user profile

## commands
- npx prisma migrate dev (generate new migration if schema changes)