export type NewsSource = {
  id: string;
  name: string;
  feedUrl: string;
};

/** Public RSS feeds used to assemble the daily top 10. */
export const NEWS_SOURCES: NewsSource[] = [
  {
    id: "bbc-world",
    name: "BBC World",
    feedUrl: "https://feeds.bbci.co.uk/news/world/rss.xml",
  },
  {
    id: "npr",
    name: "NPR",
    feedUrl: "https://feeds.npr.org/1001/rss.xml",
  },
  {
    id: "guardian-world",
    name: "The Guardian",
    feedUrl: "https://www.theguardian.com/world/rss",
  },
  {
    id: "reuters-world",
    name: "Reuters",
    feedUrl: "https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best",
  },
  {
    id: "ap",
    name: "Associated Press",
    feedUrl: "https://rsshub.app/apnews/topics/apf-topnews",
  },
  {
    id: "verge",
    name: "The Verge",
    feedUrl: "https://www.theverge.com/rss/index.xml",
  },
  {
    id: "techcrunch",
    name: "TechCrunch",
    feedUrl: "https://techcrunch.com/feed/",
  },
  {
    id: "wired",
    name: "Wired",
    feedUrl: "https://www.wired.com/feed/rss",
  },
  {
    id: "hn",
    name: "Hacker News",
    feedUrl: "https://hnrss.org/frontpage",
  },
  {
    id: "aljazeera",
    name: "Al Jazeera",
    feedUrl: "https://www.aljazeera.com/xml/rss/all.xml",
  },
];
