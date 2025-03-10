import bcrypt from 'bcryptjs'

export const saltAndHashPassword = (plain: string) => bcrypt.hashSync(plain, 10)
export const saltAndComparePassword = (plain: string, hashed: string) => bcrypt.compareSync(plain, hashed)
