import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconAlertTriangle, IconSend } from '@tabler/icons-react'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SelectDropdown } from '@/components/select-dropdown'
import { userTypes } from './data/data'
import { Drawer } from './drawer'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Email is invalid.' }),
  role: z.string().min(1, { message: 'Role is required.' }),
  desc: z.string().optional(),
})
type UserInviteForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersInviteDialog({ open, onOpenChange }: Props) {
  const form = useForm<UserInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', role: '', desc: '' },
  })

  const onSubmit = (values: UserInviteForm) => {
    form.reset()
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    onOpenChange(false)
  }

  return (
<Drawer
  open={open}
  onClose={()=>{onOpenChange(false)}}
  // onOpenChange={onOpenChange}
  title={
    <span className="text-destructive">
      <IconAlertTriangle className="mr-1 inline-block stroke-destructive" size={18} /> Invite User
    </span>
  }
>
  <div className="p-4 space-y-6">
    <Form {...form}>
      <form
        id="user-invite-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="eg: john.doe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Field */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Role</FormLabel>
              <SelectDropdown
                defaultValue={field.value}
                onValueChange={field.onChange}
                placeholder="Select a role"
                items={userTypes.map(({ label, value }) => ({
                  label,
                  value,
                }))}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Add a personal note to your invitation (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>

    <div className="flex justify-end space-x-2">
      <Button variant="outline" onClick={() => onOpenChange(false)}>
        Cancel
      </Button>
      <Button type="submit" form="user-invite-form">
        Invite <IconSend />
      </Button>
    </div>
  </div>
</Drawer>

  )
}
