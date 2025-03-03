import 'server-only'

import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { LoginRequest, LoginResponse } from '../model/loginModel'




// export const getUser = cache(async () => {
//   const session = await verifySession()
//   if (!session) return null

//   try {
//     const data = [null]

//     const user = data[0]

//     return user
//   } catch (error:exception) {
//     console.log('Failed to fetch user')
//     return null
//   }
// })