import {
  sendTestContactMessageQuery,
  sendTestTextMessageQuery,
} from "@/queries/test-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const schema = z.object({
  to: z.string().min(10, "Phone number is required."),
  displayName: z.string().min(1, "Display name is required."),
  phoneNumber: z.string().min(1, "Phone number is required."),
  organization: z.string().optional(),
})

export const SendContactMessageForm = ({
  instance,
}: {
  instance: Instance
}) => {
  const sendMessageMutation = useMutation({
    mutationKey: ["sendContactMessage"],
    mutationFn: sendTestContactMessageQuery,
  })
  const queryClient = useQueryClient()

  const { toast } = useToast()

  const sendForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: "",
      phoneNumber: "",
      organization: "",
      to: "",
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
          queryClient.invalidateQueries({ queryKey: ["userInstances"] })

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

          <FormField
            control={sendForm.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display name</FormLabel>
                <FormControl>
                  <Input placeholder="John Wick" {...field} />
                </FormControl>
                <FormDescription>
                  This will be displayed as the contact name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={sendForm.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="91xxxxxxxxxx" {...field} />
                </FormControl>
                <FormDescription>
                  Be sure to enter number with country code
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={sendForm.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Google Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={sendMessageMutation.isPending}>
            Send message
          </Button>
        </div>
      </form>
    </Form>
  )
}
