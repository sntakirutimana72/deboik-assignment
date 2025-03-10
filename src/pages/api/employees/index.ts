import { NextApiRequest, NextApiResponse } from 'next'

import dbConnector from '@/lib/mongo-connect'
import { authorize } from '@/lib/authorize'
import { ListAndCreateHandler } from '@/lib/handlers/employee/listAndCreate'
import { raise, responseWithError } from '@/lib/error'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await Promise.all([ authorize(req, res), dbConnector() ])

    const controller = new ListAndCreateHandler(req, res)

    switch (req.method) {
      case 'GET':
        return await controller.list()
      case 'POST':
        return await controller.create()
      default:
        raise('404:RNF')
    }
  } catch (e) {
    responseWithError(e, res)
  }
}
