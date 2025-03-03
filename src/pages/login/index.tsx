
// const LoginPage = () => {
//   const { login } = useAuth()

//   const handleLogin = () => {
//     login()
//     console.log("Logged in")
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   )
// }

import { FormEvent, FormEventHandler, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, CircularProgress, Container, FormControl, TextField, Typography } from '@mui/material'
import { Fascinate } from 'next/font/google'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { LoginRequest } from '@/lib/model/loginModel'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodType } from 'zod'

const schema: ZodType<LoginRequest> = z.object({
  userName: z.string().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' }),
})

export default function LoginPage() {


  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<LoginRequest>({
    resolver: zodResolver(schema)
  })


  const onSubmit: SubmitHandler<LoginRequest> = async data => {
    setLoading(true)


    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      router.push('/protected')
    } else {
      // Handle errors

      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography component={'h1'} variant='h5'>Login</Typography>
        <Box sx={{ mt: 1, width: '100%', border: 1, p: 5, borderRadius: 5 }} onSubmit={handleSubmit(onSubmit)} component={'form'}>


          <Controller
            name="userName"
            control={control}
            render={({ field }) =>
              <TextField
                {...field}
                fullWidth
                label='Usuario'
                margin='normal'
                autoFocus
                error={errors.userName != null}
                helperText={errors.userName?.message}
              ></TextField>
            }
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) =>
              <TextField
                {...field}
                fullWidth
                margin='normal'
                label='password'
                type='password'
                autoFocus
                error={errors.password != null}
                helperText={errors.password?.message}
              ></TextField>
            }
          />

          <Button type='submit' fullWidth variant='outlined' sx={{ mt: 3, mb: 2 }} disabled={loading}>{loading ? <CircularProgress size={24} color='inherit' /> : 'Login'}</Button>

        </Box>
      </Box>
    </Container>

  )
}