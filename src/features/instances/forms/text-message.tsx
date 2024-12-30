import { sendTestTextMessageQuery } from "@/queries/test-message"
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
  message: z
    .string()
    .min(1, "Message is required.")
    .max(1000, "Message is too long."),
})

export const SendTextMessageForm = ({ instance }: { instance: Instance }) => {
  const sendMessageMutation = useMutation({
    mutationKey: ["sendTestTextMessage"],
    mutationFn: sendTestTextMessageQuery,
  })
  const queryClient = useQueryClient()

  const { toast } = useToast()

  const sendForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "",
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
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Hello 👋 How are you doing?"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can insert emojis here too!
                </FormDescription>
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
