import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "tu_secreto_super_secreto";

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.log(error);
    return null;
  }
};
