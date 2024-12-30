import React, { createContext, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Instance } from "@/types/instances"
import { User } from "@/types/user"
import { axiosClient } from "@/lib/client"

export interface IFilterContext {
  timeRange: {
    from: string
    to: string
  }
  setTimeRange: (timeRange: { from: string; to: string }) => void

  instances: Array<string>
  setInstances: (instances: Array<string>) => void

  sender: string
  setSender: (sender: string) => void

  allInstances: Array<Instance>
  setAllInstances: (allInstances: Array<Instance>) => void

  childUsers: Array<User>
  setChildUsers: (childUsers: Array<User>) => void

  messageStatus: Array<string>
  setMessageStatus: (messageStatus: Array<string>) => void
}

type Props = {
  children: React.ReactNode
}

const filterSchema = z.object({
  timeRange: z.object({
    from: z.string(),
    to: z.string(),
  }),
  instances: z.array(z.string()),
  sender: z.string(),
  users: z.array(z.string()),
  messageStatus: z.array(z.string()),
})

type FilterSchema = z.infer<typeof filterSchema>

export const _useFilterCtx = () => {
  const filterForm = useForm<FilterSchema>({
    defaultValues: {
      timeRange: {
        from: "",
        to: "",
      },
      instances: [],
      sender: "",
      users: [],
      messageStatus: [],
    },
  })

  const { data, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: () => {
      return axiosClient.get("")
    },
  })

  return {
    filterForm,
  }
}

export const FilterContext = createContext<IFilterContext>({
  timeRange: {
    from: "",
    to: "",
  },
  setTimeRange: (timeRange: { from: string; to: string }) => {},

  instances: [],
  setInstances: (instances: Array<string>) => {},

  sender: "",
  setSender: (sender: string) => {},

  allInstances: [],
  setAllInstances: (allInstances: Array<Instance>) => {},

  childUsers: [],
  setChildUsers: (childUsers: Array<Partial<User>>) => {},

  messageStatus: [],
  setMessageStatus: (messageStatus: string[]) => {},
})

export const useFilter = (): IFilterContext => {
  const [timeRange, setTimeRange] = React.useState<{
    from: string
    to: string
  }>({
    from: "",
    to: "",
  })

  const [instances, setInstances] = React.useState<Array<string>>([])
  const [sender, setSender] = React.useState<string>("")
  const [allInstances, setAllInstances] = React.useState<Array<Instance>>([])
  const [messageStatus, setMessageStatus] = React.useState<Array<string>>([])
  const [childUsers, setChildUsers] = React.useState<Array<User>>([])

  return {
    instances,
    sender,
    setInstances,
    setSender,
    setTimeRange,
    timeRange,
    allInstances,
    setAllInstances,
    childUsers,
    setChildUsers,
    messageStatus,
    setMessageStatus,
  }
}
