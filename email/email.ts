import { google } from "googleapis";
import * as nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRETE = "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";
const GOOGLE_ID =
  "982412830178-pt6sbeu3ejvsksnhc7dv232hskh5j84t.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04ii3U58WknFfCgYIARAAGAQSNwF-L9IrsimUQNrYvOHFW8730qNI5o-AC6V_rHdFrYC9w5xkDq4nC2D8Iu4L869NOyOlm_gpovg";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(
  GOOGLE_ID,
  GOOGLE_REDIRECT,
  GOOGLE_SECRETE
);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

export const signUpEmail = async (newUser: any) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "olorundasamuel2@gmail.com",
        refreshToken: accessToken.token || "",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRETE,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFiles = path.join(__dirname, "../views/mail.ejs");
    const data = await ejs.renderFile(buildFiles, { name: newUser.name });

    const mailOptions = {
      from: "Dev Bucket 🧑‍💻🧑‍💻🧑‍💻<olorundasamuel2@gmail.com>",
      to: newUser.email,
      subject: "Account Verification",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("Mail Sent Sucessfully 📧📧📧");
    });
  } catch (error) {
    return error;
    console.log("Error", error);
  }
};
