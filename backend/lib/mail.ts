import { createTransport, getTestMessageUrl } from 'nodemailer';

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string) {
  return `
    <div className="email" style="
      border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
        ">
        <h2>Hello There!</h2>
        <p>${text}</p>
        <p>😘, Your friends at Keystone</p>
    </div>
    `;
}

interface MailResponse {
  message: string;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = await transporter.sendMail({
    to,
    from: 'alonso.m144@gmail.com',
    subject: 'Your Password Reset token!',
    html: makeANiceEmail(`
            To reset your password, visit this link:
            <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}" >
                Click here to reset your password.
            </a>
        `),
  });
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(
      `📫 Messagen sent! Preview it at ${getTestMessageUrl(info) || 'NO URL'}`
    );
  }
}
