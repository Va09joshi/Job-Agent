const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function matchJobs(user, jobs) {
  const prompt = `
You are a senior AI recruiter with deep hiring expertise.

USER PROFILE:
- Role: ${user.role}
- Skills: ${user.skills}
- Experience: ${user.experience}

JOB LIST:
${jobs.map((j, i) => `
${i + 1}. ${j.title}
Source: ${j.source}
Description: ${j.description}
Link: ${j.link}
`).join("\n")}

TASK:

1. Evaluate each job deeply
2. Score each job from 0–100% based on:
   - Skills match
   - Role relevance
   - Experience level
3. Select TOP 5 jobs (ranked best to worst)

RULES:
- Always return at least 3 jobs
- If match is weak, still include best available jobs
- Keep formatting clean and readable
- Avoid long paragraphs (use short bullet style)

OUTPUT FORMAT (STRICT):

🔥 Top Job Matches for You:

----------------------------------------

1. Job Title (Source)
Match Score: XX%

🧠 Why This Matches:
- Point 1
- Point 2

📄 Job Summary:
Short 2–3 line summary of the job

🔗 Apply Here:
link

----------------------------------------

(Repeat for 3–5 jobs)
`;

  try {
    const res = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    let output = res.choices?.[0]?.message?.content || "";

    if (!output || output.toLowerCase().includes("no strong matches")) {
      return fallbackResponse(user);
    }

    return output;

  } catch (err) {
    console.error("[AI Service] Model error:", err?.message);
    return fallbackResponse(user);
  }
}

// 🔥 STRONG FALLBACK (BETTER UX)
function fallbackResponse(user) {
  return `
🔥 Job Suggestions for You:

----------------------------------------

1. ${user.role} Opportunities
Match Score: 50%

🧠 Why This Matches:
- Based on your selected role
- General industry demand

📄 Job Summary:
Explore multiple openings across top job platforms.

🔗 Apply Here:
https://www.google.com/search?q=${encodeURIComponent(user.role + " jobs in India")}

----------------------------------------

💡 Tip:
Add more specific skills to improve AI matching accuracy.

🚀 Keep applying — better matches coming soon!
`;
}

module.exports = { matchJobs };