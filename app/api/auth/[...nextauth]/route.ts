import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@libs/database';

const handler = NextAuth({
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
                console.log(sessionUser);
                session.user.id = sessionUser._id.toString();
            }

            return session;
        },
        async signIn({ account, profile, user, credentials }) {
            try {
                console.log('pro', profile);
                await connectToDB();
                const userExists = await User.findOne({ email: profile?.email });

                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "").toLowerCase(),
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
});

export { handler as GET, handler as POST };