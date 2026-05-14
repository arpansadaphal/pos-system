interface DecodedToken {
  id?: string;
  email?: string;
  role?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export const decodeToken = (
  token: string
): DecodedToken | null => {
  try {
    // Split JWT token
    const [, payload] = token.split(".");

    // Decode Base64 payload
    const decodedPayload = atob(payload);

    // Convert JSON string to object
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error(
      "Invalid token decoding failed:",
      error
    );

    return null;
  }
};