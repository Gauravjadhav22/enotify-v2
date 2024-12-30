"use client"


import { Instance } from "@/types/instances"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { DebitQuota } from "./forms/deduct/debit-quota"
import { ChangeValidity } from "./forms/deduct/set-validity"

export type DebitInstanceDialogProps = {
  children: React.ReactNode
  instance: Instance
  onOpenChange: (val: boolean) => void
  open?: boolean
}

export const DebitSuperUserDialog: React.FC<DebitInstanceDialogProps> = ({
  children,
  instance,
  onOpenChange,
  open,
}: DebitInstanceDialogProps) => {
  const onSuccess = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Debit instance quota - {instance.user.name}</DialogTitle>
          <DialogDescription>
            Debit the quota or set/change the validity of the instance.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="quota">
          <TabsList>
            <TabsTrigger value="quota">Quota deduct</TabsTrigger>
            <TabsTrigger value="unlimited">Set/Change validity</TabsTrigger>
          </TabsList>
          <TabsContent value="quota">
            <DebitQuota instance={instance} onSuccess={onSuccess}></DebitQuota>
          </TabsContent>
          <TabsContent value="unlimited">
            <ChangeValidity
              instance={instance}
              onSuccess={onSuccess}
            ></ChangeValidity>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
