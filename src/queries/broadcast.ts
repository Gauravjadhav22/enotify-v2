import { IStartCampaign } from "@/types/campaign"
import { axiosClient } from "@/lib/client"

export const importContactsQuery = (instanceId: string) =>
  axiosClient.get<
    {
      name: string
      id: string
    }[]
  >("/broadcast/campaign/import/phone", {
    params: {
      instanceId,
    },
  })

export const importGroupsQuery = (instanceId: string) =>
  axiosClient.get<
    {
      name: string
      id: string
    }[]
  >("/broadcast/campaign/import/groups", {
    params: {
      instanceId,
    },
  })

export const importGroupsListQuery = (instanceId: string) =>
  axiosClient.get<
    {
      name: string
      id: string
      participantCount: number
    }[]
  >("/broadcast/campaign/import/groups-list", {
    params: {
      instanceId,
    },
  })

export const importParticipantsListQuery = ({
  instanceId,
  groupIds,
}: {
  instanceId: string
  groupIds: string[]
}) => {
  const query = `instanceId=${instanceId}&groupIds=${groupIds.join(",")}`

  return axiosClient.get<string[]>(
    "/broadcast/campaign/import/participants-list?" + query
  )
}

export const startCampaignQuery = (data: IStartCampaign) => {
  return axiosClient.post("/broadcast/campaign/start-campaign", data)
}

export const failCampaignQuery = (campaignId: string) => {
  return axiosClient.delete("/broadcast/campaign/fail-campaign", {
    params: {
      campaignId,
    },
  })
}
