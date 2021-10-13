const nodemailer = require("nodemailer");
const googleapis = require("googleapis");

const CLIENT_ID = "807335501920-as59i0p9mqvobmdkttmgdrh3vm1hbldn.apps.googleusercontent.com";
const CLIENT_SECRET = "vwymFgdH0YKKBUE7da_F7Nhw";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04d73uYSeAb6kCgYIARAAGAQSNwFL9Ir51VJTV5zMpxGWxqPNA11hO7ru_xXbrKzvPEBMVH3OsLN2xHNgwl9gcnjjm-Tm9_NzQ";
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


module.exports.sendMail = async (to, subject, html) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken()
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'farida.beacher@amalitech.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken
        }
      });
      const mailOptions = {
        from: 'Acces_sorize <rheeda.beecha@gmail.com>',
        to,
        subject: "Password Reset",
        html
        // attachments: [
        //   {   // use URL as an attachment
        //       filename: 'QRcode.png',
        //       path: visitor.qrcode
        //   }
//   ]
      };
      const result = await transport.sendMail(mailOptions)
      return result
    } catch (error) {
      return error
    }
  }