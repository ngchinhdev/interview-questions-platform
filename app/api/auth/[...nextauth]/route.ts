import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@libs/database';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({ session }) {
            if (session?.user?.email) {
                const sessionUser = await User.findOne({ email: session.user.email });
                session.user = {
                    id: sessionUser._id.toString(),
                    username: sessionUser.username,
                    image: sessionUser.image,
                    email: sessionUser.email
                };
            }

            return session;
        },
        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDB();
                const userExists = await User.findOne({ email: profile?.email });

                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "")
                            .toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, ""),
                        image: profile?.picture,
                    });
                }

                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error);
                return false;
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };