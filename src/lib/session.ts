import axios from 'axios'

export const getSession = async () => {
  // Access cookies in the browser using document.cookie
  const cookies = document.cookie
  const tokenMatch = cookies.match(/token=([^;]+)/)

  if (!tokenMatch) {
    return null
  }

  const token = tokenMatch[1]

  // Fetch user data using the token
  try {
    const response = await axios.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data // Assuming the response contains user data
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}
