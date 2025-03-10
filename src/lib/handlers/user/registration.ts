import { UserQuerySet } from '@/lib/queries'
import { userSchemas } from '@/lib/validators'
import RootHandler from '@/lib/handlers/root'

export class RegistrationHandler extends RootHandler {
  async create() {
    const raw = this.body()
    const data = userSchemas.create.parse(raw)

    await UserQuerySet.create(data)
    this.json({ message: 'User has been successfully created!' }, 201)
  }
}
