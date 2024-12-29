import { toast } from "@/components/ui/use-toast";

// For error toasts
export const toastError = (description: string, title = "Error") => {
    toast({
        title,
        description: description || "Something went wrong.",
        variant: "destructive", 
    });
};

// For success toasts
export const toastSuccess = (description: string, title = "Success") => {
    toast({
        title,
        description: description || "Operation completed successfully.",
        variant: "default",
    });
};
