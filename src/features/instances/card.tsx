import { useState } from "react"
import userIcon from "@/../public/user.png"
// import { instanceDisconnectQuery } from "@/queries/instances"
// import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RefreshCcwIcon, SendIcon, } from "lucide-react"

import { Instance } from "@/types/instances"
import { User } from "@/types/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TestMessageDialog } from "./test-message"
import {
  getInstanceExpiryDate,
  getInstanceQuota,
  instanceIsExpiring,
} from "./utils"
import clsx from "clsx"

export const InstanceCard: React.FC<{
  instance: Instance
  user: any
}> = ({ instance, user }) => {
  // const [reconnectOpen, setReconnectOpen] = useState(false)
  // const queryClient = useQueryClient()

  // const handleReconnect = async () => {
  //   setReconnectOpen(true)
  // }

  const isExpiring = instanceIsExpiring(instance, user as User)
  const quota = getInstanceQuota(instance, user as User)
  const expiryDate = getInstanceExpiryDate(instance, user as User)

  // const disconnectInstanceMutation = useMutation(instanceDisconnectQuery)

  // const disconnectInstance = async () => {
  //   disconnectInstanceMutation.mutate(instance.id, {
  //     onSuccess: () => {
  //       // queryClient.invalidateQueries(["userInstances"])
  //       // queryClient.refetchQueries(["userInstances"])
  //     },
  //   })
  // }
  if (!instance) {
    return (
      <Card className="bg-gray-100 dark:bg-gray-800">
        <div className="p-4 text-center text-gray-600 dark:text-gray-300">
          No instance data available.
        </div>
      </Card>
    );
  }
  return (
    <Card
    className={clsx(
      'md:w-2/3 min-w-96 max-w-full px-1 py-0.5',
      isExpiring && 'bg-red-100 dark:bg-black border border-solid'
    )}
    >
      {/* <ReconenctInstanceDialog
        instanceKey={instance.id}
        open={reconnectOpen}
        onClose={() => setReconnectOpen(false)}
        onConnected={() => {
          setReconnectOpen(false)
        }}
      /> */}
      <div className="flex justify-between w-full">
        <div className="flex w-full items-center space-x-3 p-4">
          <Avatar className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">
            <AvatarImage src={instance.profilePicture}></AvatarImage>
            <AvatarFallback>
              {/* <img src={userIcon.src} alt="user" /> */}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white">
                {instance.name}
              </h3>
              {instance.isLoggedIn ? (
                <Badge variant={"success-outline"}>Connected</Badge>
              ) : (
                <Badge variant={"danger-outline"}>Not connected</Badge>
              )}
            </div>
            <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-200">
              {instance.id}
            </p>
          </div>
        </div>
        <div className="flex items-center pr-3">
          {/* <SettingsDialog instance={instance}>
            <Button variant={"ghost"} size={"icon"}>
              <SettingsIcon className="h-5 w-5 text-gray dark:text-white"></SettingsIcon>
            </Button>
          </SettingsDialog> */}
        </div>
      </div>

      <Separator className="mb-6"></Separator>

      <div className="flex justify-evenly">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {quota}
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-white">
            Remaining credits
          </span>
        </div>

        <Separator orientation="vertical"></Separator>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {instance.instanceUsage}
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-white">
            Credits usage
          </span>
        </div>

        <Separator orientation="vertical"></Separator>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {expiryDate}
          </span>
          <span className="text-sm font-medium text-gray-500 mt-1 dark:text-white">
            Expiry date
          </span>
        </div>
      </div>

      {instance.isNotifInstance ? null : instance.unlimitedValidity ? (
        <p
          className="ml-3 my-3"
          style={{
            fontSize: "0.6rem",
          }}
        >
          * Monthly credits usage is limited to maximum of 1,00,000 credits.
        </p>
      ) : null}

      <Separator></Separator>

      <dl className="mt-2 px-3 w-full">
        <div className="px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-2">
          <dt className="text-sm font-medium text-gray-900 dark:text-white">
            Profile
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 font-bold dark:text-white">
            {instance.profileName || ""}
          </dd>
        </div>
        <Separator></Separator>
        <div className="px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-2 ">
          <dt className="text-sm font-medium text-gray-900 dark:text-white">
            Number
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">
            {instance.connectedNumeber
              ? instance.connectedNumeber
              : "Not connected"}
          </dd>
        </div>
        <Separator></Separator>

        <div className="px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-2">
          <dt className="text-sm font-medium text-gray-900 dark:text-white">
            Webhook
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">
            {instance.webhookEnabled ? (
              instance.webhookUrl
            ) : (
              <Badge variant={"danger-outline"}>Disabled</Badge>
            )}
          </dd>
        </div>
        <Separator></Separator>

        <div className="px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-2">
          <dt className="text-sm font-medium text-gray-900 dark:text-white">
            Chatbot
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">
            <Badge variant={"danger-outline"}>Disabled</Badge>
          </dd>
        </div>
      </dl>

      <div className="mt-1">
        <Separator className="mb-3"> </Separator>
        <div className="-mt-px flex divide-x divide-gray-200 mb-3">
          <div className="flex w-0 flex-1 justify-center align-middle items-center">
            <Button
              variant={"ghost"}
            // onClick={
            //   instance.isLoggedIn ? disconnectInstance : handleReconnect
            // }
            >
              <RefreshCcwIcon
                className="h-5 w-5 text-gray-400 mr-3"
                aria-hidden="true"
              />
              {instance.isLoggedIn ? "Disconnect" : "Scan WhatsApp"}
            </Button>
          </div>
          <div className="flex w-0 flex-1 justify-center align-middle items-center">
            <TestMessageDialog instance={instance}>
              <Button variant={"ghost"} disabled={!instance.isLoggedIn}>
                <SendIcon
                  className="h-5 w-5 text-gray-400 mr-3"
                  aria-hidden="true"
                />
                Test Message
              </Button>
            </TestMessageDialog>
          </div>
        </div>
      </div>
    </Card>
  )
}