// POST /auth/register
// Email/password validation
// Password hashing
// Email verification flow

import { hash } from 'argon2';
import { NextApiRequest, NextApiResponse } from 'next';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

interface RegisterRequestBody {
  email: string;
  password: string;
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body as RegisterRequestBody;

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (!password || password.length < PASSWORD_MIN_LENGTH) {
      return res.status(400).json({
        error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
      });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      });
    }

    const hashedPassword = await hash(password, {
      type: 2, 
      memoryCost: 2 ** 16, 
      timeCost: 3,
      parallelism: 4
    });
    
    // Here you would typically:
    // 1. Check if email already exists in database
    // 2. Store the user in your database
    // 3. Create a session or JWT
    // 4. Return success response with token

    // Example response (modify based on your needs)
    return res.status(201).json({
      message: 'User registered successfully',
      // user: { id: newUser.id, email: newUser.email }
      // token: generatedToken
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}