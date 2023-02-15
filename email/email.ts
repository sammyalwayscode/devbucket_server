import { google } from "googleapis";
import * as nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRETE = "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";
const GOOGLE_ID =
  "322842298627-s9q9h9ddt0kisfdbf5c3rnjl8k1o9443.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04oLPmRx0OmtrCgYIARAAGAQSNwF-L9IrBbKjGr-HxqZUsLmOkdGXn22-sxoKWqWlFDlqq1GIq5dYeWi2X2vTh8TQRy6iaLarcfw";
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
        user: "olorundasamuel4@gmail.com",
        refreshToken: accessToken.token || "",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRETE,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFiles = path.join(__dirname, "../views/mail.ejs");
    const data = await ejs.renderFile(buildFiles, { name: newUser.name });

    const mailOptions = {
      from: "Dev Bucket 🧑‍💻🧑‍💻🧑‍💻<olorundasamuel4@gmail.com>",
      to: newUser.email,
      subject: "Account Verification",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("Mail Sent Sucessfully 📧📧📧");
    });
  } catch (error) {
    return error;
  }
};
