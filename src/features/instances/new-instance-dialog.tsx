import { useState } from "react";
import { createInstanceQuery } from "@/queries/instances";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserQueryData } from "@/types/user";
import { useInstance } from "@/hooks/use-qrcode";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const createInstanceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  userName: z.string().optional(),
});

export const NewInstanceDialog: React.FC<{
  children: React.ReactNode;
  user?: UserQueryData;
}> = ({ children, user }) => {
  const [state, setState] = useState<"NAME" | "SCAN" | "CONNECTED">("NAME");
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof createInstanceSchema>>({
    resolver: zodResolver(createInstanceSchema),
    defaultValues: {
      name: "",
      userName: user?.name,
    },
  });
  const createInstanceMutation = useMutation({
    mutationKey: ["createInstance"],
    mutationFn: createInstanceQuery,
    onSuccess: (data) => {
        if (user) {
          setState("CONNECTED");
          return;
        }
        // startListeners(data?.data.id);
        setState("SCAN");
      },
    }
  );
  const {  startListeners } = useInstance(() => {
    setState("CONNECTED");
    queryClient.invalidateQueries({ queryKey: ["userInstances"] });
  });

  const handleSubmit = async () => {
    const data = form.getValues(); // Get form values
    try {
      await createInstanceMutation.mutateAsync({
        name: data.name,
        userId: user?.id,
      });
    } catch (error) {
      console.error(error);
      // Handle errors appropriately 
    }
  };

  return (
    <div>
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setState("NAME");
          }
        }}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className={state === "NAME" ? "" : "max-w-2xl"}>
          <DialogHeader>
            <DialogTitle>Create new Instance</DialogTitle>
            <DialogDescription>
              Give your new account a unique name to easily distinguish it from
              your other accounts.
            </DialogDescription>
          </DialogHeader>
          {state === "NAME" && (
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="off"
                          type="text"
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        The name of the user who will be using this instance
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instance Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Coffee Shop Account"
                          {...field}
                          autoComplete="off"
                          type="text"
                        />
                      </FormControl>
                      <FormDescription>
                        This can always be changed later
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Get Started</Button> 
                </DialogFooter>
              </form>
            </Form>
          )}
          {state === "SCAN" && (
            <div className="flex justify-center items-center">
              <div>
                <h1 className="text-lg font-bold">
                  Scan the QR code to connect
                </h1>
                <p className="text-sm font-medium">
                  1. Open WhatsApp on your phone
                </p>
                <p className="text-sm font-medium">
                  2. Tap Menu or Settings and select WhatsApp Web
                </p>
                <p className="text-sm font-medium">
                  3. Tap on linked devices
                </p>
                <p className="text-sm font-medium">
                  3. Point your phone to this screen to capture the code
                </p>
              </div>
              <div className="ml-4">
                {/* <img
                  className="opacity-100"
                  src={qrcode || loadingGif.src}
                  alt="qr-code"
                  width={250}
                  height={250}
                /> */}
              </div>
            </div>
          )}
          {state === "CONNECTED" && (
            <div className="flex justify-center items-center">
              <div>
                <h1 className="text-lg font-bold">
                  {user ? "Created" : "Connected"} Successfully
                </h1>
                <p className="text-sm font-medium">
                  {user
                    ? "Your new WhatsApp account is now ready to use. Make sure to scan the QR Code before sending messages"
                    : "Your account is not successfully connected to Enotify!"}
                </p>
              </div>
              <div className="ml-4">
                {/* <img
                  className="opacity-100"
                  src={connectedGif.src}
                  alt="connected successfully"
                  width={250}
                  height={250}
                /> */}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};