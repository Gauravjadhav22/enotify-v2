import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import { Link } from '@tanstack/react-router'
import { ChartNoAxesColumn, CheckCheck, CircleAlert, Cpu, TimerIcon } from 'lucide-react'

export default function Dashboard() {
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
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          {/* <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div> */}
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics' >
                Analytics
              </TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value='notifications' >
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Instances
                  </CardTitle>
                  <Cpu />
                </CardHeader>
                <CardContent className='flex justify-between items-center mt-4'>
                  <div className='text-2xl font-bold'>45</div>
                  <Link href='/instances' className='underline opacity-70 float-right'>view</Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Today Usage
                  </CardTitle>
                  <ChartNoAxesColumn />
                </CardHeader>
                <CardContent className='flex justify-between items-center mt-4'>

                  <div className='text-2xl font-bold'>+2350</div>
                  <Link href='/instances' className='underline opacity-70 self-end float-right'>view</Link>

                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Today Delivered</CardTitle>
                  <CheckCheck />                </CardHeader>
                <CardContent className='flex justify-between items-center mt-4'>

                  <div className='text-2xl font-bold'>+12,234</div>
                  <Link href='/instances' className='underline opacity-70 self-end float-right'>view</Link>

                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Today Failed
                  </CardTitle>
                  <CircleAlert />                </CardHeader>
                <CardContent className='flex justify-between items-center mt-4'>

                  <div className='text-2xl font-bold'>+573</div>
                  <Link href='/instances' className='underline opacity-70 self-end float-right'>view</Link>

                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Today In Queue                  </CardTitle>
                  <TimerIcon />

                </CardHeader>
                <CardContent className='flex justify-between items-center mt-4'>

                  <div className='text-2xl font-bold'>+573</div>
                  <Link href='/instances' className='underline opacity-70 self-end float-right'>view</Link>

                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total In Queue
                  </CardTitle>
                  <TimerIcon />
                </CardHeader>
                <CardContent className='flex justify-between items-center mt-4'>

                  <div className='text-2xl font-bold'>+573</div>
                  <Link href='/instances' className='underline opacity-70 self-end float-right'>view</Link>

                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

// const topNav = [
//   {
//     title: 'Overview',
//     href: 'dashboard/overview',
//     isActive: true,
//     disabled: false,
//   },
//   {
//     title: 'Customers',
//     href: 'dashboard/customers',
//     isActive: false,
//     disabled: true,
//   },
//   {
//     title: 'Products',
//     href: 'dashboard/products',
//     isActive: false,
//     disabled: true,
//   },
//   {
//     title: 'Settings',
//     href: 'dashboard/settings',
//     isActive: false,
//     disabled: true,
//   },
// ]
