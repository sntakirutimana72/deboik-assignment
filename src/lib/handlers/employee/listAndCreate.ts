import { EmployeeQuerySet } from '@/lib/queries'
import { employeeSchemas } from '@/lib/validators'
import RootHandler from '@/lib/handlers/root'

export class ListAndCreateHandler extends RootHandler {
  async list() {
    const resources = await EmployeeQuerySet.fetchMany({})

    this.json(resources)
  }

  async create() {
    const raw = this.body()
    const data = employeeSchemas.create.parse(raw)
    const resource = await EmployeeQuerySet.create(data)

    this.json({
      message: 'Emplyee was created successfully!',
      data: resource,
    }, 201)
  }
}
