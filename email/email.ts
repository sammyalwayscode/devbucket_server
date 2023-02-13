import { google } from "googleapis";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRETE = "";
const GOOGLE_ID = "";
const GOOGLE_REFRESHTOKEN = "";
const GOOGLE_REDIRECT = "";

const oAuth = new google.auth.OAuth2(
  GOOGLE_ID,
  GOOGLE_REDIRECT,
  GOOGLE_SECRETE
);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

export const signUpEmail = async () => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "olorundasamuel2@gmail.com",
        refreshToken: accessToken.token,
        clientID: GOOGLE_ID,
        clientSecret: GOOGLE_SECRETE,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFiles = path.join(__dirname, "../views/mail.ejs");
    const data = await ejs.renderFile(buildFiles, { name: name });

    const mailOptions = {
      from: "",
      to: "",
      subject: "",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("Mail Sent Sucessfully 📧📧📧");
    });
  } catch (error) {
    return error;
  }
};
