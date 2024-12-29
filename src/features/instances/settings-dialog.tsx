import { updateInstanceQuery } from "@/queries/instances"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AlertTriangleIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Instance } from "@/types/instances"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

const instanceSettingsSchema = z.object({
  name: z.string().optional(),
  inboxService: z.boolean().optional(),
  webhookStatus: z.boolean().optional(),
  webhookUrl: z.string().optional(),
  attachMedia: z.boolean().optional(),
  deliveryStatus: z.boolean().optional(),
  chatbotStatus: z.boolean().optional(),
  chatbot: z.boolean().optional(),
  deliveryUrl: z.string().optional(),
  // webhook modes are "HTTP" and "WEBSOCKET"
  webhookMode: z.string().optional(),
})

export const SettingsDialog = ({
  instance,
  children,
}: {
  instance: Instance
  children: React.ReactNode
}) => {
  const instanceSettigsForm = useForm<z.infer<typeof instanceSettingsSchema>>({
    resolver: zodResolver(instanceSettingsSchema),
    defaultValues: {
      name: instance.name,
      inboxService: instance.inboxEnabled,
      webhookStatus: instance.webhookEnabled,
      deliveryStatus: instance.deliveryEnabled,
      webhookUrl: instance.webhookUrl,
      attachMedia: instance.attachMedia,
      deliveryUrl: instance.deliveryUrl,
      chatbotStatus: false,
      chatbot: false,
      webhookMode: instance.webhookMode,
    },
  })

  const updateInstanceMutation = useMutation(
    ["updateInstance"],
    updateInstanceQuery
  )

  const { toast } = useToast()
  const queryClient = useQueryClient()

  const update = (data: z.infer<typeof instanceSettingsSchema>) => {
    updateInstanceMutation.mutate(
      {
        id: instance.id,
        name: data.name,
        webhookEnabled: data.inboxService && data.webhookStatus,
        webhookUrl: data.webhookUrl,
        deliveryEnabled: data.deliveryStatus,
        deliveryUrl: data.deliveryUrl,
        inboxEnabled: data.inboxService,
        attachMedia: data.attachMedia,
        webhookMode: (data.attachMedia ? "HTTP" : data.webhookMode) as
          | "HTTP"
          | "WEBSOCKET",
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["userInstances"])
          queryClient.invalidateQueries(["instances"])
          toast({
            title: "Instance updated",
            description: "Your instance has been updated successfully",
          })
        },
      }
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{instance.name} settings</DialogTitle>
          <DialogDescription>
            View and edit the settings of this WhatsApp Instance
          </DialogDescription>
          <Separator className="my-3"></Separator>
          <Form {...instanceSettigsForm}>
            <form
              onSubmit={instanceSettigsForm.handleSubmit((data) => {
                update(data)
              })}
            >
              <div className="grid gap-2 py-4">
                <FormField
                  control={instanceSettigsForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instance Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Instance Name"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={instanceSettigsForm.control}
                  name="inboxService"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-1">
                      <div className="space-y-0.5">
                        <FormLabel>Inbox service</FormLabel>
                        <FormDescription>
                          Enabling this will allow you to receive messages from
                          your customers
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {instanceSettigsForm.getValues("inboxService") && (
                  <>
                    <FormField
                      control={instanceSettigsForm.control}
                      name="webhookStatus"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-1">
                          <div className="space-y-0.5">
                            <FormLabel>Webhook Status</FormLabel>
                            <FormDescription>
                              Weather or not the webhooks should be sent to you
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {instanceSettigsForm.getValues("webhookStatus") && (
                      <>
                        <FormField
                          control={instanceSettigsForm.control}
                          name="webhookUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Webhook Url</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your webhook url"
                                  {...field}
                                  autoComplete="off"
                                />
                              </FormControl>
                              <FormDescription>
                                The webhooks will be delivered to this URL
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </>
                )}
                <FormField
                  control={instanceSettigsForm.control}
                  name="deliveryStatus"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-1">
                      <div className="space-y-0.5">
                        <FormLabel>Delivery Status</FormLabel>
                        <FormDescription>
                          Setting to true will send read/delivered receipts
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {instanceSettigsForm.getValues("deliveryStatus") && (
                  <FormField
                    control={instanceSettigsForm.control}
                    name="deliveryUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Url</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your delivery webhook url"
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormDescription>
                          The message update status will be delivered to this
                          URL
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={instanceSettigsForm.control}
                  name="attachMedia"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-1">
                      <div className="space-y-0.5">
                        <FormLabel className="flex justify-center items-center gap-2 ">
                          <AlertTriangleIcon className="h-5 w-5 text-red-600"></AlertTriangleIcon>{" "}
                          Use old webhook methods
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {!instanceSettigsForm.getValues("attachMedia") && (
                  <FormField
                    control={instanceSettigsForm.control}
                    name="webhookMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-1">
                        <div className="space-y-0.5">
                          <FormLabel className="flex justify-center items-center gap-2 ">
                            <AlertTriangleIcon className="h-5 w-5 text-red-600"></AlertTriangleIcon>{" "}
                            Send webhook over WebSockets
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value == "WEBSOCKET"}
                            onCheckedChange={
                              field.value == "WEBSOCKET"
                                ? () => field.onChange("HTTP")
                                : () => field.onChange("WEBSOCKET")
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
