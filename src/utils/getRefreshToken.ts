import { axiosInstance } from '@/axios/axiosInstance'

export async function getAccessToken(refreshToken: string) {
  try {
    const response = await axiosInstance.post<{
      accessToken: string
    }>(
      `/shops/users/token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    // setUserAuthContextToCookie({
    //   ...userAuthContext,
    //   accessToken: response.data.accessToken,
    // })
    // eslint-disable-next-line no-param-reassign

    return response.data.accessToken
  } catch (error) {
    return null
  }
}
