import { start } from "repl"
import { useEffect, useState } from "react"
import connectedGif from "@/../public/illustrations/no-users.svg"
import loadingGif from "@/../public/illustrations/qrcode-loading.svg"
import { useQueryClient } from "@tanstack/react-query"
import { set } from "date-fns"

import { axiosClient } from "@/lib/client"
import { useInstance } from "@/hooks/use-qrcode"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { toastError } from "@/components/toast/ToastMessage"

export const ReconenctInstanceDialog = ({
  instanceKey,
  open,
  onClose,
  onConnected,
}: {
  instanceKey: string
  open: boolean
  onClose: () => void
  onConnected: () => void
}) => {
  const queryClien = useQueryClient()

  const [state, setState] = useState<"SCAN" | "CONNECTED">("SCAN")

  const { isLoggedIn, startListeners, qrcode } = useInstance(() => {
    setState("CONNECTED")

    setTimeout(() => {
      onConnected()
      setState("SCAN")
      queryClien.invalidateQueries(["userInstances"])

    }, 2000)
  })

  useEffect(() => {
    if (open) {
      const reconnectInstance = async () => {
        try {
          startListeners(instanceKey);

          await axiosClient.get(`/instances/${instanceKey}/reconnect`);
        } catch (error: any) {
          console.log("Error while reconnecting:", error);

          toastError(error?.response?.data?.message || "Something went wrong")

        }
      };

      reconnectInstance();
    }
  }, [open, instanceKey]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reconnect Instance</DialogTitle>
          <DialogDescription>
            Scan the code again to reconnect the instance
          </DialogDescription>
        </DialogHeader>

        {state == "SCAN" && (
          <div className="flex justify-center items-center">
            <div>
              <h1 className="text-lg font-bold">Scan the QR code to connect</h1>
              <p className="text-sm font-medium">
                1. Open WhatsApp on your phone
              </p>
              <p className="text-sm font-medium">
                2. Tap Menu or Settings and select WhatsApp Web
              </p>
              <p className="text-sm font-medium">3. Tap on linked devices</p>
              <p className="text-sm font-medium">
                3. Point your phone to this screen to capture the code
              </p>
            </div>
            <div className="ml-4">
              <img
                className="opacity-100"
                src={qrcode || loadingGif.src}
                alt="qr-code"
                width={250}
                height={250}
              />
            </div>
          </div>
        )}

        {state == "CONNECTED" && (
          <div className="flex justify-center items-center">
            <div>
              <h1 className="text-lg font-bold">Connected Successfully</h1>
              <p className="text-sm font-medium">
                Your account is not successfully connected to Enotify!
              </p>
            </div>
            <div className="ml-4">
              <img
                className="opacity-100"
                src={connectedGif.src}
                alt="connected successfully"
                width={250}
                height={250}
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
