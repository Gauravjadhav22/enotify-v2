import { useMemo, useRef } from "react"
import {
  sendLocationMessageQuery,
  sendTestTextMessageQuery,
} from "@/queries/test-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import * as z from "zod"

import "leaflet/dist/leaflet.css"
import L from "leaflet"

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
  position: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  address: z.string().min(1, "Address is required."),
  title: z.string().min(1, "Title is required."),
  url: z.string().optional(),
})

const delhi = {
  lat: 28.589314017404924,
  lng: 77.20597548410298,
}

function SetViewOnClick({ coords }: { coords: { lat: number; lng: number } }) {
  const map = useMap()
  map.setView(coords, map.getZoom())

  return null
}

export const SendLocationMessageForm = ({
  instance,
}: {
  instance: Instance
}) => {
  const sendMessageMutation = useMutation(sendLocationMessageQuery)
  const queryClient = useQueryClient()

  const { toast } = useToast()

  const sendForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      position: delhi,
      address: "",
      title: "Check title",
      to: "",
    },
  })

  function handleSendMessage(data: z.infer<typeof schema>) {
    sendMessageMutation.mutate(
      {
        instance: instance.id,
        locationName: data.title,
        address: data.address,
        latitude: data.position.lat.toString(),
        longitude: data.position.lng.toString(),
        to: data.to,
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

  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          sendForm.setValue("position", (marker as any).getLatLng())
        }
      },
    }),
    []
  )

  const icon = L.icon({ iconUrl: "/marker-icon.png" })

  return (
    <Form {...sendForm}>
      <form onSubmit={sendForm.handleSubmit(handleSendMessage)}>
        <div className="grid gap-1 pb-3">
          <MapContainer
            center={sendForm.watch("position") || delhi}
            zoom={13}
            scrollWheelZoom
            className="w-full h-44"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              icon={icon}
              draggable={true}
              eventHandlers={eventHandlers}
              position={sendForm.watch("position") || delhi}
              ref={markerRef}
            />
            <SetViewOnClick coords={sendForm.watch("position") || delhi} />
          </MapContainer>

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

          <div className="flex flex-row gap-3">
            <FormItem className="w-full">
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input
                  placeholder="28.589314017404924"
                  autoComplete="off"
                  value={sendForm.watch("position")?.lat}
                  onChange={(e) => {
                    sendForm.setValue("position", {
                      ...sendForm.watch("position"),
                      lat: Number(e.target.value),
                    })
                  }}
                />
              </FormControl>
            </FormItem>

            <FormItem className="w-full">
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input
                  placeholder="28.589314017404924"
                  autoComplete="off"
                  value={sendForm.watch("position")?.lng}
                  onChange={(e) => {
                    sendForm.setValue("position", {
                      ...sendForm.watch("position"),
                      lng: Number(e.target.value),
                    })
                  }}
                />
              </FormControl>
            </FormItem>
          </div>

          <FormField
            control={sendForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location name</FormLabel>
                <FormControl>
                  <Input placeholder="Statue of Liberty" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the name of the location
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={sendForm.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Address" {...field} />
                </FormControl>
                <FormDescription>
                  Insert the address you want to send
                </FormDescription>
                <FormMessage />
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
