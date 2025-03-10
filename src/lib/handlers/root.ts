import { NextApiRequest, NextApiResponse } from 'next'

export default class {
  protected readonly request: NextApiRequest
  protected readonly response: NextApiResponse

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.request = req
    this.response = res
  }

  json(payload: any, status = 200) {
    this.response.status(status).json(payload)
  }

  protected readonly query = () => this.request.query
  protected readonly body = () => this.request.body
}
