import React, { SetStateAction, createContext, useEffect } from "react"
import { proto } from "@whiskeysockets/baileys"

import { CampaignDetails } from "@/types/campaign"
type Number = {
  value: string;
  label: string;
  isSelected?: boolean;
};
const steps: CampaingStep[] = [
  {
    id: "campaign-information",
    name: "Campaign information",
    description: "Enter campaign name and description",
    href: "#",
    status: "current",
  },
  {
    id: "campaign-audience",
    name: "Campaign audience",
    description: "Select the audience for your campaign",
    href: "#",
    status: "upcoming",
  },
  {
    id: "compose-message",
    name: "Compose message",
    description: "Compose your message",
    href: "#",
    status: "upcoming",
  },
  {
    id: "preview-send",
    name: "Preview & send",
    description: "Preview your campaign details and send",
    href: "#",
    status: "upcoming",
  },
]

export interface CampaingStep {
  id: string
  name: string
  description: string
  href: string
  status: string
}

export interface CampaignMessages {
  messages: Array<proto.IMessage>
  setMessages: React.Dispatch<React.SetStateAction<proto.IMessage[]>>
}

export interface ICampaignContext {
  steps: Array<CampaingStep>
  currentStep: string
  nextStep: () => void
  previousStep: () => void
  setStep: (step: string) => void
  campaignDetails: CampaignDetails
  campaignMessages: CampaignMessages
  setCampaignDetails: React.Dispatch<React.SetStateAction<CampaignDetails>>
  numbers: Array<Number>
  setNumbers: React.Dispatch<React.SetStateAction<Array<Number>>>
  rowSelections: {}
  setRowSelections: React.Dispatch<React.SetStateAction<{}>>
}

type Props = {
  children: React.ReactNode
}

export const CampaignContext = createContext<ICampaignContext>({
  steps: [],
  currentStep: "",
  nextStep: () => {},
  previousStep: () => {},
  setStep: (step: string) => {},
  campaignDetails: {
    name: "",
    instance: "",
    tags: [],
  },
  campaignMessages: {
    messages: [],
    setMessages: () => {},
  },
  setCampaignDetails: () => {},
  numbers: [],
  setNumbers: () => {},
  rowSelections: {},
  setRowSelections: () => {},
})

export const useCampaign = (): ICampaignContext => {
  const [currIndex, setCurrIndex] = React.useState<number>(0)

  const currentStep = React.useMemo(() => {
    return steps[currIndex].id
  }, [currIndex])

  const [numbers, setNumbers] = React.useState<Array<Number>>([])

  const [campaignDetails, setCampaignDetails] = React.useState<CampaignDetails>(
    {
      name: "",
      instance: "",
      tags: [],
    }
  )

  const [messages, _setMessages] = React.useState<proto.IMessage[]>([])

  const setMessages = (messages: SetStateAction<proto.IMessage[]>) => {
    _setMessages(messages)
  }

  const campaingSteps = React.useMemo(() => {
    return steps.map((step, index) => {
      if (index === currIndex) {
        return {
          ...step,
          status: "current",
        }
      }

      if (steps.indexOf(step) < currIndex) {
        return {
          ...step,
          status: "complete",
        }
      }

      return step
    })
  }, [currIndex])

  const nextStep = () => {
    setCurrIndex(currIndex + 1)
  }

  const previousStep = () => {
    setCurrIndex(currIndex - 1)
  }

  const setStep = (step: string) => {
    const index = steps.findIndex((s) => s.id === step)

    if (index > -1) {
      setCurrIndex(index)
    }
  }

  const [rowSelection, setRowSelections] = React.useState({})

  useEffect(() => {
    const selectedRows = Object.keys(rowSelection).filter(
      (key) => (rowSelection as any)[key] === true
    )

    const newNumbers = numbers.map((number, index) => {
      if (selectedRows.includes(index.toString())) {
        return {
          ...number,
          isSelected: true,
        }
      }

      return {
        ...number,
        isSelected: false,
      }
    })

    setNumbers(newNumbers)
  }, [rowSelection])

  return {
    steps: campaingSteps,
    currentStep,
    nextStep,
    previousStep,
    setStep,
    campaignDetails,
    campaignMessages: {
      messages: messages,
      setMessages: setMessages,
    },
    setCampaignDetails,
    numbers: numbers,
    setNumbers: setNumbers,
    rowSelections: rowSelection,
    setRowSelections: setRowSelections,
  }
}

export const CampaignProvider = ({ children }: Props) => {
  const campaign = useCampaign()

  return (
    <CampaignContext.Provider value={campaign}>
      {children}
    </CampaignContext.Provider>
  )
}
