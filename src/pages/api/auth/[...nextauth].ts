import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "865572097376-q4ia84ehgg3rljrjf7iq1pje0tdav6md.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});
