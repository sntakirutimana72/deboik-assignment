import { Model as DefaultModel } from 'mongoose'

import { Dict } from '@/lib/definitions'

export default class {
  protected static Model: DefaultModel<any, {}, {}, {}, any, any>

  static fetchMany(filter: Dict) {
    return this.Model.find(filter)
  }

  static fetchUnique(filter: Dict) {
    return this.Model.findOne(filter)
  }

  static create(data: Dict) {
    return this.Model.create(data)
  }

  static update(filter: Dict, data: Dict) {
    return this.Model.updateOne(filter, data)
  }

  static destroy(filter: Dict) {
    return this.Model.deleteOne(filter)
  }
}
