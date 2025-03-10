import { NextApiResponse } from 'next'

export class CustomError extends Error {}

export const ERRORS_LOCALES = {
  'SWW': 'Something went wrong. Please try again',
  'ACD': 'Access denied',
  'BDR': 'Bad request',
  'ATF': 'Authentication failed',
  'RNF': 'Resource not found',
  'NTF': 'Not Found',
}

export const errorTranslator = (locale: string) => {
  const [code, key] = locale.split(':')

  return {
    status: Number(code),
    message: (
      key.length > 3
        ? key
        : ERRORS_LOCALES[key as (keyof typeof ERRORS_LOCALES)] ?? ERRORS_LOCALES['SWW']
    ),
  }
}

export const responseWithError = (e: unknown, res: NextApiResponse) => {
  const { status, message } = errorTranslator(
    e instanceof CustomError
      ? e.message
      : '500:SWW'
  )
  const answer: { message: string, data?: any } = { message }
  // If it's from a custom error and data is present, add it to the answer
  if (e instanceof CustomError && e.cause) {
    answer.data = e.cause
  }
  return res.status(status).json(answer)
}

/**
 * throws a custom error which can then be handled by custom functionalities while responding to request
 * @param message
 */
export const raise = (message: string, data?: any) => { throw new CustomError(message, { cause: data }) }
