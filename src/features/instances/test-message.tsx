import { Instance } from "@/types/instances"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { SendContactMessageForm } from "./forms/contact-message"
import { SendLocationMessageForm } from "./forms/location-message"
import { SendMediaMessageForm } from "./forms/media-message"
import { SendPollMessageForm } from "./forms/poll-message"
import { SendTextMessageForm } from "./forms/text-message"

export const TestMessageDialog = ({
  instance,
  children,
}: {
  instance: Instance
  children: React.ReactNode
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-2xl max-w-2xl ">
        <DialogHeader>
          <DialogTitle>Send test message</DialogTitle>
          <DialogDescription>
            Send a test message to verify connectivity
          </DialogDescription>
          <Separator className="my-3"></Separator>
          <Tabs>
            <TabsList>
              <TabsTrigger value="text-message">Text Message</TabsTrigger>
              <TabsTrigger value="media-message">Media/Document</TabsTrigger>
              <TabsTrigger value="contact-message">Contact</TabsTrigger>
              <TabsTrigger value="location-message">Location</TabsTrigger>
              <TabsTrigger value="document-message">Poll</TabsTrigger>
            </TabsList>
            <TabsContent value="text-message">
              <SendTextMessageForm instance={instance}></SendTextMessageForm>
            </TabsContent>
            <TabsContent value="media-message">
              <SendMediaMessageForm instance={instance}></SendMediaMessageForm>
            </TabsContent>
            <TabsContent value="contact-message">
              <SendContactMessageForm
                instance={instance}
              ></SendContactMessageForm>
            </TabsContent>
            <TabsContent value="location-message">
              <SendLocationMessageForm
                instance={instance}
              ></SendLocationMessageForm>
            </TabsContent>
            <TabsContent value="document-message">
              <SendPollMessageForm instance={instance}></SendPollMessageForm>
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
