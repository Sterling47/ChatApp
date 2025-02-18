import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
type CSRFValidationResult = {
  isValid: boolean;
  error?: string;
};
export const generateCSRFToken = (secret: string, sessionId:string): string => {
  const hmac = createHmac('sha256', secret)
  hmac.update(sessionId);
  return hmac.digest('hex')
}

export const validateCSRFToken = (token: string | null, secret: string, sessionId: string): CSRFValidationResult => {
  if (!token) {
    return { isValid: false, error: 'Missing CSRF token' };
  }

  const expectedToken = generateCSRFToken(secret, sessionId);
  return {
    isValid: token === expectedToken,
    error: token !== expectedToken ? 'Invalid CSRF token' : undefined,
  };
};

export const csrfProtectionMiddleware = async (
  request: NextRequest,
  response: NextResponse,
  secret: string
): Promise<boolean> => {
    const sessionId = request.cookies.get('sessionId')?.value;
    const csrfToken = request.headers.get('x-csrf-token');
    if (!sessionId) {
      throw new Error('No session found');
    }

    const validation = validateCSRFToken(csrfToken, secret, sessionId);
    
    if (!validation.isValid) {
      throw new Error(validation.error || 'CSRF validation failed');
    }
  
  return true;
};
