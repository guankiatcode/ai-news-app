import type { Article, DailyEdition } from "./types";
import { formatDayLabel } from "./types";

function a(
  date: string,
  rank: number,
  partial: Omit<Article, "id" | "rank" | "summaryTitle"> & {
    summaryTitle?: string;
  },
): Article {
  return {
    id: `${date}-${rank}`,
    rank,
    summaryTitle: partial.summaryTitle ?? "Summary of Article",
    ...partial,
  };
}

/** Curated fallback editions so the app always has exactly 10/day. */
export const SEED_EDITIONS: Record<string, DailyEdition> = {
  "2026-09-17": {
    date: "2026-09-17",
    label: formatDayLabel("2026-09-17"),
    articles: [
      a("2026-09-17", 1, {
        title: "Markets Steady as Central Banks Hold Rates",
        source: "Reuters",
        url: "https://www.reuters.com/",
        publishedAt: "2026-09-17T08:10:00.000Z",
        readMinutes: 4,
        summary: [
          "Major central banks kept benchmark rates unchanged, citing cooling inflation and softer labour data.",
          "Equity indexes opened flat-to-higher as traders priced a longer pause before any cuts.",
          "Currency markets were quiet, with the dollar little changed against peers.",
        ],
        keyPoints: [
          "Policy rates held across several G7 economies.",
          "Inflation progress noted, but services prices remain sticky.",
          "Investors now watch upcoming jobs and CPI prints.",
        ],
        whyItMatters:
          "A prolonged pause shapes mortgage costs, hiring plans, and how companies fund growth.",
      }),
      a("2026-09-17", 2, {
        title: "New Chip Packaging Push Aims at AI Efficiency",
        source: "TechCrunch",
        url: "https://techcrunch.com/",
        publishedAt: "2026-09-17T09:40:00.000Z",
        readMinutes: 5,
        summary: [
          "Chipmakers outlined denser packaging techniques meant to move data between dies with less power.",
          "The approach targets inference workloads that are bottlenecked by memory bandwidth.",
          "Early partners include cloud providers testing the stacks in production clusters.",
        ],
        keyPoints: [
          "Focus is packaging, not a new transistor node.",
          "Goal: more tokens per watt for AI serving.",
          "Cloud pilots expected before wider OEM adoption.",
        ],
        whyItMatters:
          "Lower inference cost could widen who can run capable models at scale.",
      }),
      a("2026-09-17", 3, {
        title: "Heatwave Tests Power Grids Across Southern Europe",
        source: "BBC World",
        url: "https://www.bbc.com/news",
        publishedAt: "2026-09-17T07:05:00.000Z",
        readMinutes: 3,
        summary: [
          "Record afternoon temperatures drove air-conditioning demand to seasonal highs.",
          "Grid operators issued conservation notices and delayed non-critical maintenance.",
          "Hospitals and transit agencies activated heat contingency plans.",
        ],
        keyPoints: [
          "Peak load arrived earlier than usual this week.",
          "Conservation notices cover several metro areas.",
          "Health services are monitoring vulnerable groups.",
        ],
        whyItMatters:
          "Repeated peak-load days expose how climate stress hits everyday infrastructure.",
      }),
      a("2026-09-17", 4, {
        title: "Cities Expand Congestion Pricing After Pilot Gains",
        source: "Associated Press",
        url: "https://apnews.com/",
        publishedAt: "2026-09-17T11:20:00.000Z",
        readMinutes: 4,
        summary: [
          "Two more metro regions approved downtown tolls after pilots cut peak traffic.",
          "Revenue is earmarked for buses and protected bike lanes.",
          "Business groups remain split on exemptions for deliveries.",
        ],
        keyPoints: [
          "Pilots showed faster bus times in core corridors.",
          "New funds go to transit, not general budgets.",
          "Delivery exemptions are still under debate.",
        ],
      }),
      a("2026-09-17", 5, {
        title: "Open-Source Model Beats Closed Rival on Coding Bench",
        source: "Hacker News",
        url: "https://news.ycombinator.com/",
        publishedAt: "2026-09-17T13:00:00.000Z",
        readMinutes: 3,
        summary: [
          "A newly released open weights model topped a popular software-engineering benchmark.",
          "Researchers credited stronger tool-use training and longer context windows.",
          "Enterprises are testing local deployment for code assistants.",
        ],
        keyPoints: [
          "Open weights matched or beat a leading closed model.",
          "Tool-use training was a major lever.",
          "Local deploy interest is rising for privacy.",
        ],
      }),
      a("2026-09-17", 6, {
        title: "Vaccine Update Clears Review for Fall Campaign",
        source: "NPR",
        url: "https://www.npr.org/",
        publishedAt: "2026-09-17T06:30:00.000Z",
        readMinutes: 3,
        summary: [
          "Regulators cleared an updated formulation matched to circulating strains.",
          "Public clinics will open appointments ahead of the colder months.",
          "Officials urged higher-risk groups to book early.",
        ],
        keyPoints: [
          "Updated strain match approved.",
          "Clinic appointments open this month.",
          "Priority messaging targets higher-risk groups.",
        ],
      }),
      a("2026-09-17", 7, {
        title: "Streaming Services Bundle Sports to Slow Churn",
        source: "The Verge",
        url: "https://www.theverge.com/",
        publishedAt: "2026-09-17T14:15:00.000Z",
        readMinutes: 4,
        summary: [
          "Two major streamers announced a joint sports tier after subscriber growth cooled.",
          "The package mixes live events with on-demand highlights.",
          "Analysts say the move is about retention more than new sign-ups.",
        ],
        keyPoints: [
          "Joint sports tier aims at retention.",
          "Live rights are the expensive piece.",
          "Churn, not acquisition, is the near-term KPI.",
        ],
      }),
      a("2026-09-17", 8, {
        title: "Trade Talks Restart With Narrower Agenda",
        source: "The Guardian",
        url: "https://www.theguardian.com/",
        publishedAt: "2026-09-17T10:00:00.000Z",
        readMinutes: 5,
        summary: [
          "Negotiators reconvened after months of stalled discussions.",
          "The new agenda focuses on industrial goods and digital services, leaving agriculture aside.",
          "Officials set a 90-day window for a draft framework.",
        ],
        keyPoints: [
          "Talks resume with a narrower scope.",
          "Agriculture is parked for now.",
          "Draft framework targeted in 90 days.",
        ],
      }),
      a("2026-09-17", 9, {
        title: "Battery Recycling Plant Opens Near Port Corridor",
        source: "Wired",
        url: "https://www.wired.com/",
        publishedAt: "2026-09-17T12:45:00.000Z",
        readMinutes: 4,
        summary: [
          "A new facility will recover lithium, nickel, and cobalt from end-of-life EV packs.",
          "Operators say closed-loop supply can cut mining demand for regional manufacturers.",
          "Local officials tied the project to port-adjacent job growth.",
        ],
        keyPoints: [
          "Focus on EV pack materials recovery.",
          "Aims to feed nearby cell plants.",
          "Jobs pitch tied to port logistics.",
        ],
      }),
      a("2026-09-17", 10, {
        title: "Schools Trial Phone-Free Mornings After Focus Study",
        source: "Al Jazeera",
        url: "https://www.aljazeera.com/",
        publishedAt: "2026-09-17T15:20:00.000Z",
        readMinutes: 3,
        summary: [
          "A district pilot locks phones away until lunch after a study linked morning use to weaker attention.",
          "Teachers reported fewer interruptions in the first two weeks.",
          "Parents are split on emergency access rules.",
        ],
        keyPoints: [
          "Morning phone lockup in pilot schools.",
          "Early reports of fewer classroom interruptions.",
          "Emergency access policy still contested.",
        ],
      }),
    ],
  },
  "2026-09-16": {
    date: "2026-09-16",
    label: formatDayLabel("2026-09-16"),
    articles: [
      a("2026-09-16", 1, {
        title: "Satellite Internet Expands to Remote Clinics",
        source: "NPR",
        url: "https://www.npr.org/",
        publishedAt: "2026-09-16T09:00:00.000Z",
        readMinutes: 4,
        summary: [
          "A health network connected dozens of rural clinics to low-latency satellite links.",
          "Doctors can now run tele-specialty consults without driving patients hours away.",
          "Uptime during storms remains the main open question.",
        ],
        keyPoints: [
          "Rural clinics gain satellite broadband.",
          "Tele-specialty consults become practical.",
          "Weather resilience still being measured.",
        ],
      }),
      a("2026-09-16", 2, {
        title: "Automakers Align on Shared Charging Standard",
        source: "Reuters",
        url: "https://www.reuters.com/",
        publishedAt: "2026-09-16T08:20:00.000Z",
        readMinutes: 3,
        summary: [
          "Several manufacturers agreed to support one plug standard at new highway chargers.",
          "Adapters will cover older vehicles during a multi-year transition.",
          "Drivers should see fewer dead-end station visits.",
        ],
        keyPoints: [
          "Shared plug standard for new stations.",
          "Adapters bridge older cars.",
          "Goal is less charging confusion on highways.",
        ],
      }),
      a("2026-09-16", 3, {
        title: "Cybersecurity Bill Adds Breach Deadline Rules",
        source: "Associated Press",
        url: "https://apnews.com/",
        publishedAt: "2026-09-16T11:10:00.000Z",
        readMinutes: 4,
        summary: [
          "Lawmakers advanced rules requiring faster public disclosure after major breaches.",
          "Companies must notify regulators within a fixed window once an incident is confirmed.",
          "Small firms get a longer runway and template guidance.",
        ],
        keyPoints: [
          "Faster breach disclosure mandates.",
          "Fixed notification windows for regulators.",
          "Smaller firms get extra compliance time.",
        ],
      }),
      a("2026-09-16", 4, {
        title: "Indie Game Studio Sale Sparks Talent Concerns",
        source: "The Verge",
        url: "https://www.theverge.com/",
        publishedAt: "2026-09-16T16:00:00.000Z",
        readMinutes: 3,
        summary: [
          "A beloved studio was acquired by a larger publisher after a breakout release.",
          "Staff asked for written guarantees on creative control and remote work.",
          "Fans worry sequels will chase live-service metrics.",
        ],
        keyPoints: [
          "Breakout studio acquired by a big publisher.",
          "Staff seeking creative-control guarantees.",
          "Community nervous about sequel direction.",
        ],
      }),
      a("2026-09-16", 5, {
        title: "Drought Forces Shipping Draft Limits on Key River",
        source: "BBC World",
        url: "https://www.bbc.com/news",
        publishedAt: "2026-09-16T07:40:00.000Z",
        readMinutes: 4,
        summary: [
          "Low water levels prompted temporary draft limits for barges on a major trade river.",
          "Grain and fuel shipments are being split across more vessels.",
          "Analysts expect higher inland freight costs this month.",
        ],
        keyPoints: [
          "Low river levels trigger draft limits.",
          "Cargoes split across more barges.",
          "Inland freight costs likely to rise.",
        ],
      }),
      a("2026-09-16", 6, {
        title: "Browser Vendors Tighten Default Tracking Shields",
        source: "Wired",
        url: "https://www.wired.com/",
        publishedAt: "2026-09-16T13:30:00.000Z",
        readMinutes: 3,
        summary: [
          "Default cookie and fingerprinting protections will expand in upcoming browser releases.",
          "Ad networks are testing contextual alternatives.",
          "Publishers warn of short-term revenue dips.",
        ],
        keyPoints: [
          "Stronger default anti-tracking in browsers.",
          "Ads shifting toward contextual targeting.",
          "Publishers brace for revenue pressure.",
        ],
      }),
      a("2026-09-16", 7, {
        title: "University Opens Shared Lab for Climate Sensors",
        source: "The Guardian",
        url: "https://www.theguardian.com/",
        publishedAt: "2026-09-16T10:50:00.000Z",
        readMinutes: 3,
        summary: [
          "A new shared lab will let startups and city agencies prototype low-cost climate sensors.",
          "First projects focus on urban heat and flood early warning.",
          "Data will be published under an open license.",
        ],
        keyPoints: [
          "Shared climate-sensor lab opens.",
          "Early focus: heat and flood alerts.",
          "Open data license for outputs.",
        ],
      }),
      a("2026-09-16", 8, {
        title: "Rail Strike Averted After Overnight Mediation",
        source: "Al Jazeera",
        url: "https://www.aljazeera.com/",
        publishedAt: "2026-09-16T05:15:00.000Z",
        readMinutes: 2,
        summary: [
          "Unions and operators reached a tentative deal hours before a planned walkout.",
          "The agreement covers pay, rest schedules, and safety staffing.",
          "Members still need to ratify the deal.",
        ],
        keyPoints: [
          "Walkout paused after overnight talks.",
          "Deal covers pay and rest schedules.",
          "Ratification vote still pending.",
        ],
      }),
      a("2026-09-16", 9, {
        title: "Startup Ships Pocket Ultrasound for Field Clinics",
        source: "TechCrunch",
        url: "https://techcrunch.com/",
        publishedAt: "2026-09-16T15:45:00.000Z",
        readMinutes: 4,
        summary: [
          "A handheld ultrasound device began shipping to field clinics after regulatory clearance.",
          "Images sync to a phone app with guided capture for less-trained operators.",
          "Pricing targets NGOs and community hospitals.",
        ],
        keyPoints: [
          "Pocket ultrasound now shipping.",
          "Phone app guides less-trained users.",
          "NGO and community hospital pricing.",
        ],
      }),
      a("2026-09-16", 10, {
        title: "Museum Returns Artefacts After Provenance Review",
        source: "Hacker News",
        url: "https://news.ycombinator.com/",
        publishedAt: "2026-09-16T18:00:00.000Z",
        readMinutes: 3,
        summary: [
          "A major museum completed a provenance review and returned several contested artefacts.",
          "The process included historians from the artefacts' countries of origin.",
          "Other institutions said they will publish similar review timelines.",
        ],
        keyPoints: [
          "Provenance review leads to returns.",
          "Origin-country historians joined the process.",
          "Peer museums signaling similar reviews.",
        ],
      }),
    ],
  },
};
