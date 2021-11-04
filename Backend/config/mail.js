const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = "615121449039-3m4039q8pjhha4gkqv8jq2j6bkd2ddpr.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04jmgsV_KnEtUCgYIARAAGAQSNwF-L9Ir8DVhUbPqlh_xIm_4qaJ5pebTeEbAarqGy3mOs7UFNF25UbY1E3vLujzMXxf75Sfl_-c";
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
        from: 'Acces_sorize <farida.beacher@amalitech.com>',
        to: "gordchill@gmail.com",
        subject: "Password Reset",
        text: "Yeepi",
        html: " <h1> Yeepi</h1>"
        
      };
      const result = await transport.sendMail(mailOptions)
      return result
    } catch (error) {
      return error
    }
  }

// sendMail().then(result => console.log("Email sent.....", result))
// .catch((error) => console.log(error.message));