import mongoose from 'mongoose'

const cached: { connection?: typeof mongoose, initiator?: Promise<typeof mongoose> } = {}

export default async function connector() {
  if (cached.connection) {
    return cached.connection
  }
  if (!cached.initiator) {
    const options = { bufferCommands: false }
    cached.initiator = mongoose.connect(process.env.DATABASE_URL!, options)
  }
  try {
    cached.connection = await cached.initiator
  } catch (e) {
    cached.initiator = undefined

    throw e
  }
  return cached.connection
}
