const Parser = require("rss-parser");
const parser = new Parser({
  headers: {
    "User-Agent": "Mozilla/5.0",
  },
});

const { fetchNaukriJobs } = require("../utils/naukri");

// 🔹 Safe role formatter
function safeQuery(role) {
  return encodeURIComponent((role || "software engineer").trim());
}

// 🔹 Google fallback (never fails)
function fallbackJobs(role) {
  console.log("🌐 Using fallback jobs");

  return [
    {
      title: `${role} Jobs (Top Results)`,
      link: `https://www.google.com/search?q=${encodeURIComponent(role + " jobs in India")}`,
      description: "Explore latest jobs from multiple platforms",
      source: "Google",
    },
    {
      title: `${role} Jobs on Indeed`,
      link: `https://www.indeed.com/jobs?q=${encodeURIComponent(role)}`,
      description: "Browse jobs on Indeed",
      source: "Indeed",
    },
    {
      title: `${role} Jobs on Naukri`,
      link: `https://www.naukri.com/${role.toLowerCase().replace(/\s+/g, "-")}-jobs`,
      description: "Browse jobs on Naukri",
      source: "Naukri",
    },
  ];
}

async function getJobs(role) {
  let indeedJobs = [];
  let naukriJobs = [];

  const query = safeQuery(role);

  const indeedUrls = [
    `https://in.indeed.com/rss?q=${query}`,
    `https://www.indeed.com/rss?q=${query}`,
  ];

  // 🔹 Indeed (with retry)
  for (const url of indeedUrls) {
    try {
      console.log("[Job Fetch] Indeed:", url);

      const feed = await parser.parseURL(url);

      if (feed.items?.length) {
        indeedJobs = feed.items.slice(0, 10).map(item => ({
          title: item.title,
          link: item.link,
          description: item.contentSnippet,
          source: "Indeed",
        }));
        break; // stop if success
      }
    } catch (err) {
      console.log("[Job Fetch] Indeed failed:", err?.message);
    }
  }

  // 🔹 Naukri (optional)
  try {
    naukriJobs = await fetchNaukriJobs(role);
  } catch (err) {
    console.log("[Job Fetch] Naukri failed:", err?.message);
  }

  // 🔹 Merge + dedupe
  const allJobs = [...indeedJobs, ...naukriJobs];
  const seen = new Set();

  const uniqueJobs = allJobs.filter(job => {
    if (!job.link || seen.has(job.link)) return false;
    seen.add(job.link);
    return true;
  });

  // 🔥 FINAL SAFETY (VERY IMPORTANT)
  if (!uniqueJobs.length) {
    return fallbackJobs(role);
  }

  return uniqueJobs.slice(0, 10);
}

module.exports = { getJobs };