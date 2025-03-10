import { EmployeeQuerySet } from '@/lib/queries'
import { employeeSchemas } from '@/lib/validators'
import { raise } from '@/lib/error'
import RootHandler from '@/lib/handlers/root'

export class UpdateAndDestroyHandler extends RootHandler {
  async patch() {
    const { id } = this.query()
    const data = employeeSchemas.patch.parse(this.body())
    const { modifiedCount } = await EmployeeQuerySet.update({ _id: id as string }, data)

    if (modifiedCount) {
      this.json({ message: 'Emplyee was updated successfully!' })
    } else {
      this.json({ message: 'Employee was not updated' })
    }
  }

  async destroy() {
    const { id } = this.query()
    const { deletedCount } = await EmployeeQuerySet.destroy({ _id: id as string })

    if (!deletedCount) {
      raise(`500:Unable to delete Employee-#${id}`)
    }
    this.json({ message: `Employee-#${id} was deleted successfully!` })
  }
}
