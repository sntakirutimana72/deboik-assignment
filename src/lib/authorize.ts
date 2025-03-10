import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import authConfig from '@/auth.config'
import { raise } from './error'

export async function authorize(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(request, response, authConfig)

  if (session?.user) {
    return session.user
  }
  raise('401:ACD')
}
