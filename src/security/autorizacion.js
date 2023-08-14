import { SignJWT } from 'jose';
import conexion from "../connection/credentials.js";

export async function generateToken(id,collection) {
  let json = {
    id: id,
    collection: collection,
  };

  try {
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT({ json });
    const jwt = await jwtconstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("30m")
      .sign(encoder.encode(conexion.token));

    return jwt;
  } catch (error) {
    throw error;
  }
}