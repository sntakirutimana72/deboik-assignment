import { model, models, Schema } from 'mongoose'

export type IUser = {
  email: string
  password: string
}

const schema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
})

const User = models.User || model('User', schema)

export default User
