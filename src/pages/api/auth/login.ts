import type { NextApiRequest, NextApiResponse } from 'next'
import { createSession } from '@/lib/config/session'
import { postData } from '@/lib/utils/api'
import { LoginRequest, LoginResponse } from '@/lib/model/loginModel'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const response = await login(req.body)


  await createSession(res, response)


  res.status(200).json({ success: true })

}

async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await postData<LoginRequest>('/identity/login', data)
  return response.json() as Promise<LoginResponse>
}
