import { useMemo } from "react"
import {
  deductInstanceQuotaQuery,
  setInstanceExpiryDateQuery,
} from "@/queries/instances"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { APIError } from "@/types/api"
import { Instance } from "@/types/instances"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"

const setValiditySchema = z.object({
  name: z.string().nonempty("Name is required."),
  instanceId: z.string().optional(),
  currentValidity: z.date().optional(),
  newDate: z.date().optional(),
})

export const ChangeValidity = ({
  instance,
  onSuccess,
}: {
  instance: Instance
  onSuccess: () => void
}) => {
  const form = useForm<z.infer<typeof setValiditySchema>>({
    resolver: zodResolver(setValiditySchema),
    defaultValues: {
      name: instance.name,
      instanceId: instance.id,
      currentValidity:
        instance.quota > 0
          ? new Date(instance.quotaValidity)
          : new Date(instance.unlimitedValidity),
      newDate: new Date(),
    },
  })

  const debitQuotaMutation = useMutation(
    ["instances"],
    setInstanceExpiryDateQuery
  )
  const queryClient = useQueryClient()

  const toaster = useToast()

  const handleSubmit = (data: z.infer<typeof setValiditySchema>) => {
    debitQuotaMutation.mutate(
      {
        instanceId: data.instanceId ?? "",
        expiry: data.newDate!.toISOString(),
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
                  <FormLabel>Instance Name</FormLabel>
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
              name="currentValidity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current quota</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      type="date"
                      disabled
                      value={
                        instance.quota > 0
                          ? new Date(instance.quotaValidity)
                              .toISOString()
                              .split("T")[0]
                          : new Date(instance.unlimitedValidity)
                              .toISOString()
                              .split("T")[0]
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newDate"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col mt-4">
                    <FormLabel>Select new validity date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )
              }}
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
