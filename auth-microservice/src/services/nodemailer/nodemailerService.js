const nodemailer = require("nodemailer");
const google = require("googleapis").google;

const auth = {
  type: "OAuth2",
  user: "mail.wepet@gmail.com",
  clientId: process.env.MAIL_CLIENT_ID,
  clientSecret: process.env.MAIL_CLIENT_SECRET,
  refreshToken: process.env.MAIL_REFRESH_TOKEN,
};



const oAuth2Client = new google.auth.OAuth2(
  process.env.MAIL_CLIENT_ID,
  process.env.MAIL_CLIENT_SECRET,
  process.env.MAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN });

module.exports.sendEmail = async (email, subject, text) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            ...auth,
            accessToken: accessToken
        }});

        const mailOptions = {
            from: auth.user,
            to: email,
            subject: subject,
            text: text
        };

        const result = await transport.sendMail(mailOptions);
        return result;
  } catch (error) {
    return error;
  }
};
