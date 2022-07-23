/**
 * Retrieve user data
 * @returns user details
 */
export const getUserData = async (host: string = '', headers?: Record<string, string> | undefined) => {
  let user;

  try {
    const response = await fetch(`${host}/api/auth/check`, {
      headers
    });
    user = await response.json();
  } catch (error) {
    user = null;
  }

  return user;
}