import { model, models, Schema } from 'mongoose'

export type IEmployee = {
  firstname: string
  lastname: string
  email: string
  phone: string
  role: 'Admin' | 'Staff'
}

const schema: Schema = new Schema<IEmployee>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: ['Admin', 'Staff'],
    default: 'Staff',
  },
})

const Employee = models.Employee || model('Employee', schema)

export default Employee
