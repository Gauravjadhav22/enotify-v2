import {
  Card,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
// import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
// import { Link } from '@tanstack/react-router'
// import { ChartNoAxesColumn, CheckCheck, CircleAlert, Cpu, TimerIcon } from 'lucide-react'
import {InstanceCard} from './card'
// import { User } from '../users/data/schema'
import { Instance } from '@/types/instances'
import { User } from '../users/data/schema'

export default function Instances() {
  const instance:Instance={
    id: "instance123",
    name: "Test Instance",
    nodeId: "node456",
    userId: "user789",
    isNotifInstance: false,
    loginType: "QR",
    connectedNumeber: "1234567890",
    inboxEnabled: true,
    webhookEnabled: true,
    webhookUrl: "https://example.com/webhook",
    deliveryEnabled: true,
    deliveryUrl: "https://example.com/delivery",
    isLoggedIn: true,
    quota: 10000,
    webhookMode: "HTTP",
    quotaValidity: "2024-12-31",
    unlimitedValidity: "2024-12-31",
    createdAt: "2024-01-01",
    updatedAt: "2024-12-24",
    user: {
      id: "user789",
      createdAt: "2024-01-01",
      updatedAt: "2024-12-24",
      phoneNumber: "9876543210",
      password: "hashed_password",
      name: "John Doe",
      role: "USER",
      userStatus: "ACTIVE",
      timezone: "UTC",
      quota: 5000,
      unlimitedMonths: 3,
      bulkMessageAllowed: true,
      advancedApiAllowed: false,
      rechargeType: "PREPAID",
      quotaValidity: "2024-12-31",
      unlimitedValidity: "2024-12-31",
      notificationId: "notif123",
      reseller: {
        id: "reseller001",
        name: "Reseller Co.",
        phoneNumber: "9998887777",
      },
      instanceCount: 5,
      usersCount: 10,
    },
    profilePicture: "https://example.com/avatar.png",
    profileName: "Test Profile",
    instanceUsage: 3000,
    todayUsage: 100,
    attachMedia: true,
    qrcode: "https://example.com/qrcode.png",
  };
  
  const dummyUser: User = {
    id: "user123",
    createdAt: "2024-01-01",
    updatedAt: "2024-12-24",
    phoneNumber: "9876543210",
    password: "hashed_password",
    name: "John Doe",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    username: "johndoe",
    status: "active",
    role: "admin",
    userStatus: "ACTIVE",
    timezone: "UTC",
    quota: 1000,
    unlimitedMonths: 0,
    bulkMessageAllowed: true,
    advancedApiAllowed: false,
    rechargeType: "PREPAID",
    quotaValidity: "2024-12-31",
    unlimitedValidity: "2024-12-31",
    notificationId: "notif123",
    reseller: {
      id: "reseller001",
      name: "Reseller Co.",
      phoneNumber: "9998887777",
    },
  };
  
  
 
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        {/* <TopNav links={topNav} /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Instances</h1>
          {/* <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div> */}
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='all accounts'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='all accounts'>All Accounts</TabsTrigger>
              <TabsTrigger value='connected' >
                Connected
              </TabsTrigger>
              <TabsTrigger value='disconnected' disabled>
                DisConnected
              </TabsTrigger>

            </TabsList>
          </div>
          <TabsContent value='all accounts' className='space-y-4'>
          
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='border-0 col-span-1 lg:col-span-4'>
                  <InstanceCard 
                    instance={instance} 
                    user={dummyUser as User} 
                  />
              </Card>
             
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

