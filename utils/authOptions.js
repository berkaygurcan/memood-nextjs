import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider(
            {
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                authorization: {
                    params: {
                        prompt: 'consent',
                        access_type: 'offline',
                        response_type:'code'
                    }
                }
            }
        )
    ],
    callbacks: {
        async signIn({ account, profile }) {


          return true // Do different verification for other providers that don't have `email_verified`
        },
      },

}

