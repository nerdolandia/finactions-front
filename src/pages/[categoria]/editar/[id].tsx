import { TextFieldLite } from "@/lib/components/TextFieldLite"
import { CategoriaModel } from "@/lib/model/categoriaModel"
import { getLocal, postLocal } from "@/lib/utils/api-local"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, CircularProgress, Container, Paper, Typography } from "@mui/material"
import { Router, useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { date, z } from "zod"

const schema = z.object({
  nome: z.string().min(1, { message: 'Required' })
  // nome: z.coerce.number().min(1, { message: 'Required' })
})

type createForm = z.infer<typeof schema>

export default function EditarCategoriaPage(data: CategoriaModel) {


  const router = useRouter()


  const id = router.query.id
  const [loading, setLoading] = useState(false)

  const { handleSubmit, control, setValue } = useForm<createForm>({
    resolver: zodResolver(schema)
  })

  setValue('nome', data.nome)


  const onSubmit = async (data: createForm) => {

    setLoading(true)

    try {
      const response = await postLocal('/mock/categoria/editar', { ...data, id })
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
      <Paper elevation={3}>
      
      <Box  sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', border: 1, p: 5, borderRadius: 5 
      }}>
        <Typography component={'h1'} variant='h5'>Categoria/Criar</Typography>
        <Box sx={{ mt: 1, width:'100%' }} onSubmit={handleSubmit(onSubmit)} component={'form'}>


          <TextFieldLite control={control} name="nome" label="Nome da Categoria" />


          <Button type='submit' fullWidth variant='outlined' sx={{ mt: 3, mb: 2 }} disabled={loading}>{loading ? <CircularProgress size={24} color='inherit' /> : 'Login'}</Button>

        </Box>
      </Box>
    </Paper>

  )
}

// const getServerSideProps: GetServerSideProps<{
//   email: string
//   isEmailConfirmed: boolean
// }> = async (context) => {
//   const { req } = context
//     // const cookies = parseCookies(context)
//   try {
//     const response = await getUserInfo(req.cookies['jwt'] as string) 

//     console.log("getServerSideProps response:", response) // Debugging

//     return { props: response }
//   } catch (error) {
//     console.error("Error in getServerSideProps:", error)

//     // Handle authentication failure: redirect to login or return notFound
//     return {
//       redirect: {
//         destination: '/login', // Replace with your login page
//         permanent: false,
//       },
//     }
//   }
// }

async function getData() {
}

export async function getServerSideProps(context: { query: { id: any } }) {
  const { id } = context.query
  // Fetch data from external API
  const data = {
    id: id,
    nome: 'Alimentação'
  }

  // Pass data to the page via props
  return { props: data }
}