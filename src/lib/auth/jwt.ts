import * as jose from 'jose'

interface JWTprops {
  payload: jose.JWTPayload
  secret: string
  options: { expiresIn: string }
}

interface verifyJWTprops {
  token: string
  secret: string
}

export async function generateJWT ({payload, secret, options}: JWTprops):Promise<string> {
  const key = new TextEncoder().encode(secret);
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(options.expiresIn || '1h')
    .sign(key);
}

export const verifyJWT = async ({token, secret}: verifyJWTprops) => {
  const key = new TextEncoder().encode(secret);
  try {
    const { payload } = await jose.jwtVerify(token, key);
    return payload;
  }
  catch (error) {
    console.error('error with JWT', error)
    throw new Error ('Invalid or expired token');
  }
}

