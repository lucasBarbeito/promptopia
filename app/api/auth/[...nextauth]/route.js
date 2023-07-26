import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

// Para entender mejor todo esto 
// https://next-auth.js.org/getting-started/introduction

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    })

    session.user.id = sessionUser._id.toString()

    return session;
  },

  async signIn({ profile }) {
    try {
      // Cada ruta de next se la considera serverLes
      // serverLess -> Lambda -> dynamodb
      await connectToDB();
      // Check if an user alredy exists
      const userExists = await User.findOne({
        email: profile.email,
      });

      // If not create an user
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(), //este replace lo que hace es reemplazar los espacios (" ") por no espacios ("")
          image: profile.image,
        });
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
