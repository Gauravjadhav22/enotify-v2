import {
  sendPollMessageQuery,
  sendTestTextMessageQuery,
} from "@/queries/test-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Instance } from "@/types/instances"
import { Button } from "@/components/ui/button"
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
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

const schema = z.object({
  to: z.string().min(10, "Phone number is required."),
  title: z.string().min(1, "Title is required."),
  options: z.array(z.string()).min(2, "At least two options are required."),
  multiSelect: z.boolean(),
})

export const SendPollMessageForm = ({ instance }: { instance: Instance }) => {
  const sendMessageMutation = useMutation(sendPollMessageQuery)
  const queryClient = useQueryClient()

  const { toast } = useToast()

  const sendForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      to: "",
      multiSelect: false,
      options: ["Option 1"],
      title: "My poll",
    },
  })

  function handleSendMessage(data: z.infer<typeof schema>) {
    sendMessageMutation.mutate(
      {
        ...data,
        instance: instance.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["userInstances"])

          toast({
            variant: "default",
            description: "The message was sent successfully",
            title: "Message sent",
          })

          sendForm.reset()
        },
      }
    )
  }

  return (
    <Form {...sendForm}>
      <form onSubmit={sendForm.handleSubmit(handleSendMessage)}>
        <div className="grid gap-2 pb-3">
          <FormField
            control={sendForm.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="91xxxxxxxxxx"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormDescription>
                  Be sure to enter number with country code
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row items-end gap-3">
            <FormField
              control={sendForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Poll title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Give a suitable title to poll"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              onClick={(e) => {
                // prevent the form getting submitted when the button is clicked
                e.preventDefault()

                if (sendForm.getValues("options").length >= 3) {
                  toast({
                    title: "Maximum options reached",
                    description: "You can add maximum 3 options to a poll",
                    variant: "destructive",
                  })
                  return
                } else {
                  sendForm.setValue("options", [
                    ...sendForm.getValues("options"),
                    "Option " + (sendForm.getValues("options").length + 1),
                  ])
                }

                sendForm.trigger()
              }}
              className="flex-shrink-0"
            >
              <PlusIcon className="w-5 h-5 mr-2"></PlusIcon> Add option
            </Button>
          </div>

          {sendForm.getValues("options").map((_, index) => (
            <div className="flex flex-row align-middle items-end w-full gap-3">
              <FormField
                key={index}
                control={sendForm.control}
                name={`options.${index}`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Option {index + 1}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Option"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={"destructive"}
                className="flex-shrink-0"
                onClick={(e) => {
                  e.preventDefault()

                  sendForm.setValue(
                    "options",
                    sendForm.getValues("options").filter((_, i) => i !== index)
                  )

                  sendForm.trigger()
                }}
              >
                <TrashIcon className="h-5 w-5 mr-2" /> Remove
              </Button>
            </div>
          ))}
          <FormField
            control={sendForm.control}
            name="multiSelect"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-1">
                <div className="space-y-0.5">
                  <FormLabel>Multiple select</FormLabel>
                  <FormDescription>
                    Enabling this will allow your customers to select more than
                    one option
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
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={sendMessageMutation.isLoading}>
            Send message
          </Button>
        </div>
      </form>
    </Form>
  )
}
