import Credentials from 'next-auth/providers/credentials'

import { saltAndComparePassword } from '@/lib/password-strategy'
import { UserQuerySet } from '@/lib/queries'
import mongoConnect from '@/lib/mongo-connect'

export default {
  pages: {
    'signIn': '/auth/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        await mongoConnect()

        const { email, password } = credentials as { email: string, password: string }
        const user = await UserQuerySet.fetchUnique({ email })

        if (user && saltAndComparePassword(password, user.password)) {
          const { _id: id, email } = user

          return { id, email }
        }
        return null
      },
    }),
  ],
}
