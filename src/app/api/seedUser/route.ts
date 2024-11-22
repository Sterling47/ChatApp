import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '@/lib/db'

export async function POST() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  const userEmail = user?.email
  try {
    const existingUser = userEmail? await prisma.user.findUnique({
      where: {email: userEmail}
    }) : null
    if (existingUser) {
      console.log(existingUser)
      return Response.json(existingUser, {status: 200})
    }
    const newUser = await prisma.user.create({
      data: {
        email: userEmail || '',
        username: `chatter${user.id}`,
        password: ''
      }
    })
    return Response.json(newUser, {status:201})
  }
  catch (error){
    console.log(error)
    return Response.json({error: 'Failed to seed user'},{status: 500})
  }
}

// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import prisma from '@/lib/db';
// import { NextResponse } from 'next/server';

// export async function POST() {
//   try {
//     const { getUser } = getKindeServerSession();
//     const user = await getUser();
//     const userEmail = user?.email;

//     // if (!userEmail) {
//     //   return NextResponse.json(
//     //     { error: 'User email not available' },
//     //     { status: 400 }
//     //   );
//     // }

//     // Check if the user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email: userEmail },
//     });

//     if (existingUser) {
//       console.log('Existing user:', existingUser);
//       return NextResponse.json(existingUser, { status: 200 });
//     }

//     // Create a new user
//     const newUser = await prisma.user.create({
//       data: {
//         email: userEmail,
//         username: `chatter${user.id}`,
//         password: '', // Ensure you have a proper strategy for passwords if needed
//       },
//     });

//     console.log('New user created:', newUser);
//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error) {
//     console.error('Error seeding user:', error);
//     return NextResponse.json(
//       { error: 'Failed to seed user' },
//       { status: 500 }
//     );
//   }
// }


