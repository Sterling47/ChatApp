export interface User {
  email: string;
  username: string;
  password: string;
}

export function generateUniqueUser(): User {
  const timestamp = new Date().getTime();
  return {
    email: `test-user-${timestamp}@example.com`,
    username: `test-user-${timestamp}`,
    password: 'password'
  };
}