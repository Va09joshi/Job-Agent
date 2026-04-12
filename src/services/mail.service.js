const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});


async function sendMail(user, content) {
  // Convert plain text content to HTML (simple formatting)

  // Parse the AI output for improved formatting
  const jobBlocks = content.split(/-{8,}/).filter(b => b.trim().length > 0);
  const mainTitle = jobBlocks.shift() || "";

  const htmlContent = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:auto;padding:24px 0;background:#f4f6fa;">
      <div style="background:#fff;border-radius:12px;padding:28px 28px 18px 28px;box-shadow:0 2px 8px #e2e8f0;">
        <h2 style="color:#2b6cb0;margin:0 0 8px 0;font-size:22px;">Hi ${user.name},</h2>
        <div style="font-size:16px;margin:0 0 18px 0;color:#222;font-weight:600;">${mainTitle.replace(/🔥/g, "<span style='color:#f97316;'>🔥</span>")}</div>
        <div style="margin-top:0;font-size:15px;line-height:1.6;">
          ${jobBlocks.map(block => {
            // Extract fields
            const titleMatch = block.match(/\n?\d+\.\s*(.+)\nMatch Score: (\d+)%/);
            const title = titleMatch ? titleMatch[1] : '';
            const score = titleMatch ? titleMatch[2] : '';
            const whyMatch = block.match(/🧠 Why This Matches:[\s\S]*?- ([^\n]*)\n- ([^\n]*)/);
            const why1 = whyMatch ? whyMatch[1] : '';
            const why2 = whyMatch ? whyMatch[2] : '';
            const summaryMatch = block.match(/📄 Job Summary:[\s\S]*?([\s\S]*?)\n🔗 Apply Here:/);
            const summary = summaryMatch ? summaryMatch[1].trim() : '';
            const linkMatch = block.match(/🔗 Apply Here:\s*([^\n]*)/);
            const link = linkMatch ? linkMatch[1].trim() : '';
            if (!title && !score && !summary && !link) return '';
            return `
              <div style='margin-bottom:18px;padding:14px 16px 12px 16px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;'>
                <div style='font-weight:600;font-size:16px;color:#222;margin-bottom:2px;'>${title ? title : ''}</div>
                <div style='color:#f59e42;font-size:13px;margin-bottom:4px;'>Match Score: <b>${score}%</b></div>
                <ul style='margin:0 0 8px 18px;padding:0;color:#3b4252;font-size:14px;'>
                  ${why1 ? `<li>${why1}</li>` : ''}
                  ${why2 ? `<li>${why2}</li>` : ''}
                </ul>
                <div style='color:#444;font-size:14px;margin-bottom:6px;'><b>Summary:</b> ${summary}</div>
                ${link ? `<a href='${link}' style='color:#2563eb;text-decoration:none;font-weight:500;font-size:14px;'>Apply Now</a>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
      <div style="margin-top:18px;font-size:12px;color:#888;text-align:center;">Sent by your AI Job Agent • <span style='color:#2b6cb0;'>Good luck!</span></div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: user.email,
    subject: "Your AI Job Matches 🚀",
    text: `Hi ${user.name}\n\n${content}`,
    html: htmlContent,
  });
}

module.exports = { sendMail };
