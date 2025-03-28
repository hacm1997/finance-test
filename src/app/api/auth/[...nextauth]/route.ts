import NextAuth from "next-auth";
import { authOptions } from "../../../../libs/authOptions";

// Si defines `authOptions` en otro archivo, usa esto:
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
