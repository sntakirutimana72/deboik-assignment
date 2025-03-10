import { User } from '@/lib/models'
import RootQuerySet from './root'

export class UserQuerySet extends RootQuerySet {
  protected static Model = User
}
