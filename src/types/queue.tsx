export interface UserQueueItem {
  name: string
  id: string
  connectedNumeber: string
  isLoggedIn: boolean
  profileName: string
  profilePicture: string
  date: string
  queueCount: number
  dateNormal: string
  user: {
    id: string
    name: string
    phoneNumber: string
    reseller: {
      id: string
      name: string
      phoneNumber: string
    }
  }
}

interface RootObject {
  id: string
  name: string
  connectedNumeber: string
  isLoggedIn: boolean
  profileName: string
  date: string
  queueCount: number
  dateNormal: string
}

export type UserQueueResponse = UserQueueItem[]
