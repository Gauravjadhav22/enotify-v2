import { instanceDeleteQuery } from "@/queries/instances"
import { useMutation } from "@tanstack/react-query"

import { Instance } from "@/types/instances"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"

interface DeleteInstanceDialogProps {
  instance: Instance
  children: React.ReactNode
}

export const DeleteInstanceDialog: React.FC<DeleteInstanceDialogProps> = ({
  instance,
  children,
}) => {
  const deleteInstanceMutation = useMutation(["instances"], instanceDeleteQuery)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            The instance with name {instance.name} will be deleted permanently.
            All the data associated with this instance will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({
              variant: "destructive",
            })}
            onClick={() => {
              deleteInstanceMutation.mutate(instance.id)
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
