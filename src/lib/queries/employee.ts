import { Employee } from '@/lib/models'
import RootQuerySet from './root'

export class EmployeeQuerySet extends RootQuerySet {
  protected static Model = Employee
}
