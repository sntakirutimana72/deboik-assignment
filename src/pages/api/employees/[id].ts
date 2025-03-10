import { NextApiRequest, NextApiResponse } from 'next'

import dbConnector from '@/lib/mongo-connect'
import { authorize } from '@/lib/authorize'
import { UpdateAndDestroyHandler } from '@/lib/handlers/employee/updateAndDestory'
import { responseWithError, raise } from '@/lib/error'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await Promise.all([ authorize(req, res), dbConnector() ])
    
    const controller = new UpdateAndDestroyHandler(req, res)

    switch (req.method) {
      case 'PATCH':
        return await controller.patch()
      case 'DELETE':
        return await controller.destroy()
      default:
        raise('404:RNF')
    }
  } catch (e) {
    responseWithError(e, res)
  }
}
