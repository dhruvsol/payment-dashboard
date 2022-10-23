// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// export default NextAuth({
//   secret: process.env.SECRET,
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Email",
//           type: "email",
//           placeholder: "xyz@gmail.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials, req) => {
//         if (credentials?.username === "" && credentials.password === "") {
//           return {
//             id: 2,
//             name: 4,
//           };
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       return true;
//     },
//     async redirect({ url, baseUrl }) {
//       return baseUrl;
//     },
//     async session({ session, user, token }) {
//       return session;
//     },
//     async jwt({ token, user, account, profile, isNewUser }) {
//       return token;
//     },
//   },
// });
