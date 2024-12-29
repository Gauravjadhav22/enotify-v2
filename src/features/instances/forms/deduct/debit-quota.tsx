import { deductInstanceQuotaQuery } from "@/queries/instances"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { APIError } from "@/types/api"
import { Instance } from "@/types/instances"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const debitQuotaSchema = z.object({
  name: z.string().nonempty("Name is required."),
  instanceId: z.string().optional(),
  currentQuotaValue: z.number().optional(),
  amount: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Amount must be greater than 0.")
  ),
})

export const DebitQuota = ({
  instance,
  onSuccess,
}: {
  instance: Instance
  onSuccess: () => void
}) => {
  const form = useForm<z.infer<typeof debitQuotaSchema>>({
    resolver: zodResolver(debitQuotaSchema),
    defaultValues: {
      name: instance.name,
      instanceId: instance.id,
      currentQuotaValue: instance.quota,
      amount: 0,
    },
  })

  const debitQuotaMutation = useMutation(
    ["instances"],
    deductInstanceQuotaQuery
  )
  const queryClient = useQueryClient()

  const toaster = useToast()

  const handleSubmit = (data: z.infer<typeof debitQuotaSchema>) => {
    debitQuotaMutation.mutate(
      {
        instanceId: data.instanceId ?? "",
        quota: data.amount,
      },
      {
        onSuccess: () => {
          toaster.toast({
            description: "Instance quota debited successfully.",
            title: "Debit Success",
          })
          queryClient.refetchQueries(["instances"])
          form.reset()
          onSuccess()
        },
        onError: (error) => {
          const err = error as AxiosError<APIError>

          toaster.toast({
            description: err.response?.data.message,
            title: "Debit Failed",
            variant: "destructive",
          })
        },
      }
    )
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-2 pb-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="100"
                      {...field}
                      autoComplete="off"
                      type="text"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instanceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instance ID</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" type="text" disabled />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentQuotaValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current quota</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      type="number"
                      disabled
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credits to be deducted</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="100"
                      {...field}
                      autoComplete="off"
                      type="number"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={debitQuotaMutation.isLoading}>
              Debit Quota
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
