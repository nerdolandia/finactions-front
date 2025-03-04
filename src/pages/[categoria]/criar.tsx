import { TextFieldLite } from "@/lib/components/TextFieldLite"
import { postLocal } from "@/lib/utils/api-local"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  nome: z.string().min(1, { message: 'Required' })
  // nome: z.coerce.number().min(1, { message: 'Required' })
})

type createForm = z.infer<typeof schema>

export default function CriarCategoriaPage() {


  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { handleSubmit, control, formState: { errors } } = useForm<createForm>({
    resolver: zodResolver(schema)
  })


  const onSubmit = async (data: createForm) => {

    setLoading(true)

    try {
      const response = await postLocal('/mock/categoria/criar', data)
      if (response.ok) {
        router.push('/categoria/listar')
      }
    } catch (error) {
      console.error('Login error:', error)
      // setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography component={'h1'} variant='h5'>Categoria/Criar</Typography>
        <Box sx={{ mt: 1, width: '100%', border: 1, p: 5, borderRadius: 5 }} onSubmit={handleSubmit(onSubmit)} component={'form'}>


          <TextFieldLite control={control} name="nome" label="Nome da Categoria" />


          <Button type='submit' fullWidth variant='outlined' sx={{ mt: 3, mb: 2 }} disabled={loading}>{loading ? <CircularProgress size={24} color='inherit' /> : 'Login'}</Button>

        </Box>
      </Box>
    </Container>
  )
}