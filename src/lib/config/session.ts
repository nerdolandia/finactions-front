import { serialize } from 'cookie'
import { NextApiResponse } from 'next'
import { LoginResponse } from '../model/loginModel'
import { NextRequest } from 'next/server'



export async function createSession(res: NextApiResponse, data: LoginResponse) {
  const expiresAt = new Date()
  expiresAt.setDate(data.expiresIn / 10000000000000000)
  // const session = await encrypt({ userId, expiresAt })

  res.setHeader('Set-Cookie', serialize('jwt', data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  }))
  res.setHeader('Set-Cookie', [serialize('session', JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  }), serialize('jwt', data.accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })])



}

export async function verifySession(req: NextRequest) {

  try {
  //criar validação de token
  
  const sessionString = req.cookies.get('session')?.value

  // Verifica se a sessão é uma string válida
    if (sessionString != undefined && !req.cookies.has('jwt')) {
    req.cookies.clear()
    return null // Retorna null se não houver sessão
  }

    // Tenta converter a string JSON em um objeto LoginResponse
    const session: LoginResponse = JSON.parse(sessionString)

    // Aqui você pode adicionar validações adicionais para o token, se necessário
    // Exemplo: Verificar se o accessToken é válido ou não expirou

    return session // Retorna o objeto LoginResponse
  } catch (error) {
    console.error('Erro ao analisar a sessão:', error)
    return null // Retorna null se a análise falhar
  }
}

// export async function updateSession(cookieStore: any) {
//   const session = cookieStore.value
//   // const payload = await decrypt(session)

//   if (!session) {
//     return null
//   }

//   const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

//   cookieStore.set('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expires,
//     sameSite: 'lax',
//     path: '/',
//   })
// }


// export async function deleteSession(cookieStore: NextResponse) {
//   cookieStore.cookies.delete('session')
// }
