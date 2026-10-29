import { useEffect, useMemo, useState } from "react";
import { campaigns as campaignCatalog } from "../data/campaigns.js";
import {
  getActiveCampaigns,
  getAnnouncementCampaign,
  getCampaignRefreshDelay,
  getNextCampaignBoundary,
} from "../utils/campaignPricing.js";
import { CampaignContext } from "./campaignState.js";

/**
 * Una sola fuente de vigencia para toda la web. El temporizador y los
 * listeners viven aquí, no en cada tarjeta.
 * @param {{
 *   children: import("react").ReactNode
 *   campaigns?: import("../data/campaigns.js").Campaign[]
 * }} props
 */
export function CampaignProvider({ children, campaigns = campaignCatalog }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let timer = null;
    let cancelled = false;

    const refresh = () => {
      setNow((previous) => {
        const next = Date.now();
        const previousKey = getActiveCampaigns(campaigns, previous)
          .map((campaign) => campaign.id)
          .join("|");
        const nextKey = getActiveCampaigns(campaigns, next)
          .map((campaign) => campaign.id)
          .join("|");
        return previousKey === nextKey ? previous : next;
      });
    };

    const arm = () => {
      if (timer != null) window.clearTimeout(timer);
      const delay = getCampaignRefreshDelay(
        getNextCampaignBoundary(campaigns, Date.now()),
        Date.now(),
      );
      if (delay == null || delay <= 0) {
        timer = null;
        return;
      }
      timer = window.setTimeout(() => {
        if (cancelled) return;
        refresh();
        arm();
      }, delay);
    };

    const onWake = () => {
      refresh();
      arm();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") onWake();
    };

    arm();
    window.addEventListener("focus", onWake);
    window.addEventListener("pageshow", onWake);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      if (timer != null) window.clearTimeout(timer);
      window.removeEventListener("focus", onWake);
      window.removeEventListener("pageshow", onWake);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [campaigns]);

  const value = useMemo(() => {
    const activeCampaigns = getActiveCampaigns(campaigns, now);
    return {
      now,
      activeCampaigns,
      announcement: getAnnouncementCampaign(activeCampaigns),
    };
  }, [campaigns, now]);

  return (
    <CampaignContext.Provider value={value}>{children}    </CampaignContext.Provider>
  );
}
