import { createHmac } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

export const generateCSRFToken = (secret: string, sessionId:string) => {
  const hmac = createHmac('sha256', secret)
  hmac.update(sessionId);
  return hmac.digest('hex')
}

const validateCSRFToken = (token:string|string[], secret:string, sessionId:string) => {
  const expectedToken = createHmac('sha256', secret).update(sessionId).digest('hex');
  return token === expectedToken;
};

export const csrfProtectionMiddleware = (req:NextApiRequest, res:NextApiResponse, secret:string) => {
  if (req.method === 'POST') {
    const csrfToken = req.headers['x-csrf-token'];
    const sessionId = req.cookies.sessionId;
    if (!csrfToken || !sessionId ||!validateCSRFToken(csrfToken, secret, sessionId)) {
      return res.status(403).json({ message: 'Invalid CSRF token' });
    }
  }
  return true;
};

