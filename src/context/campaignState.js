import { createContext, useContext } from "react";

export const CampaignContext = createContext(null);

const EMPTY_CAMPAIGN_STATE = {
  now: 0,
  activeCampaigns: [],
  announcement: null,
};

export function useCampaignState() {
  return useContext(CampaignContext) ?? EMPTY_CAMPAIGN_STATE;
}
