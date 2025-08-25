export function newsletterEmailHtml(name: string, email: string): string {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; padding:24px; border:1px solid #e5e7eb;">
      <h2 style="color:#111827; font-size:20px; margin-bottom:16px;">
        Halo ${name} 👋
      </h2>

      <p style="color:#374151; font-size:15px; line-height:1.6; margin-bottom:12px;">
        Terima kasih sudah bergabung dengan <strong>Studinesia</strong> 🎉
      </p>

      <p style="color:#374151; font-size:15px; line-height:1.6; margin-bottom:16px;">
        Mulai sekarang, kami akan mengirimkan update artikel, tips, dan informasi menarik lainnya
        ke alamat email kamu:
      </p>

      <div style="background:#f3f4f6; padding:12px; border-radius:8px; margin-bottom:20px; font-size:14px; color:#111827;">
        📧 <strong>${email}</strong>
      </div>

      <p style="color:#374151; font-size:15px; line-height:1.6; margin-bottom:20px;">
        Semoga konten kami bisa bermanfaat untuk perjalanan belajarmu 🚀
      </p>

      <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />

      <p style="color:#6b7280; font-size:13px; text-align:center;">
        Salam hangat,<br/>
        <strong>Tim Studinesia</strong>
      </p>
    </div>
  </div>
  `;
}

export function subscriptionConfirmationEmail(
  name: string,
  confirmUrl: string,
) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Konfirmasi Langganan Studinesia</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; margin:0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:auto; background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:#f59e0b; padding:16px; text-align:center; color:white; font-size:20px; font-weight:bold;">
            Studinesia
          </td>
        </tr>
        <tr>
          <td style="padding:24px; color:#333;">
            <h2 style="margin-top:0;">Halo ${name},</h2>
            <p>Terima kasih sudah mendaftar untuk berlangganan Studinesia 🎉</p>
            <p>Untuk mulai menerima update artikel dan tips dari kami, silakan konfirmasi langganan Anda dengan klik tombol di bawah:</p>
            <p style="text-align:center; margin:32px 0;">
              <a href="${confirmUrl}" style="background:#f59e0b; color:white; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold; display:inline-block;">
                Konfirmasi Langganan
              </a>
            </p>
            <p>Jika tombol di atas tidak berfungsi, salin dan tempel link berikut ke browser Anda:</p>
            <p style="word-break:break-all; color:#555;">
              ${confirmUrl}
            </p>
            <p style="margin-top:32px;">Salam hangat,<br/>Tim Studinesia</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f3f4f6; text-align:center; padding:16px; font-size:12px; color:#777;">
            Anda menerima email ini karena mendaftar di Studinesia.<br/>
            Jika Anda tidak merasa mendaftar, abaikan email ini.
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

export function newArticleEmailHtml(name: string, title: string, url: string): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height:1.6;">
      <h2>Hai ${name}, artikel baru sudah terbit! 🚀</h2>
      <p>Kami baru saja merilis artikel terbaru di Studinesia:</p>
      <h3>${title}</h3>
      <p>
        <a href="${url}" 
           style="display:inline-block; padding:10px 16px; background:#f59e0b; color:white; text-decoration:none; border-radius:6px;">
          Baca Sekarang
        </a>
      </p>
      <p>Atau salin link berikut ke browser kamu:<br/>
        <a href="${url}">${url}</a>
      </p>
      <hr style="margin:20px 0;"/>
      <p style="font-size:12px; color:#666;">Anda menerima email ini karena berlangganan Studinesia. 
      Jika tidak ingin lagi, silakan <a href="https://studinesia.online/unsubscribe">berhenti berlangganan</a>.</p>
    </div>
  `;
}
