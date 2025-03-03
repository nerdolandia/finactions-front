import ProtectedRoute from "@/lib/components/ProtectedRoute"
import { UserInfo } from "@/lib/model/loginModel"
import { getData } from "@/lib/utils/api"
import { GetServerSideProps } from "next"
import { redirect } from 'next/navigation'
import { parseCookies } from "nookies"

interface ProtectedPageProps {
  email: string
  isEmailConfirmed: boolean
}

const ProtectedPage = (response: ProtectedPageProps) => {
  console.log("ProtectedPage props:", response) // Debugging

  return (
    <ProtectedRoute>
      <div>
        <p>{response.email}</p>
      </div>
    </ProtectedRoute>
  )
}

export const getServerSideProps: GetServerSideProps<{
  email: string
  isEmailConfirmed: boolean
}> = async (context) => {
  const { req } = context
    // const cookies = parseCookies(context)
  try {
    const response = await getUserInfo(req.cookies['jwt'] as string) 

    console.log("getServerSideProps response:", response) // Debugging

    return { props: response }
  } catch (error) {
    console.error("Error in getServerSideProps:", error)

    // Handle authentication failure: redirect to login or return notFound
    return {
      redirect: {
        destination: '/login', // Replace with your login page
        permanent: false,
      },
    }
  }
}


async function getUserInfo(jwt: string): Promise<UserInfo> {
  const response = await getData('/identity/manage/info', jwt)
  return response.json() as Promise<UserInfo>
}


export default ProtectedPage
