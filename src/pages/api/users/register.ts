import { NextApiRequest, NextApiResponse } from 'next'

import dbConnector from '@/lib/mongo-connect'
import { authorize } from '@/lib/authorize'
import { RegistrationHandler } from '@/lib/handlers/user/registration'
import { responseWithError, raise } from '@/lib/error'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await Promise.all([ authorize(req, res), dbConnector() ])

    if (req.method === 'POST') {
      const controller = new RegistrationHandler(req, res)
      await controller.create()
    } else {
      raise('404:RNF')
    }
  } catch (e) {
    responseWithError(e, res)
  }
}
