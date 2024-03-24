import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
// Max session time shoud be 1 hour
const sessionMaxAge = 60 * 60; // 1 hour in seconds

export const authOptions = {
	// add session expiration
	session: {
		maxAge: sessionMaxAge,
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			// eslint-disable-next-line no-unused-vars
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials provided with prisma client
				const prisma = new PrismaClient();
				return await prisma.users
					.findUnique({
						where: {
							email: credentials.email,
							password: credentials.password,
						},
					})
					.then((user) => {
						if (user) {
							const userDetails = {
								name: `${user?.firstName} ${user?.lastName}`,
								image: user?.image,
								email: user?.email,
							};
							return Promise.resolve(userDetails);
						}

						return Promise.resolve(null);
					});
			},
		}),
	],
	pages: {
		signIn: "/auth/signIn",
	},

	callbacks: {
		// get email from google and match it with the user in the database
	},
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
