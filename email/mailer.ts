import { google } from "googleapis";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "53331541547-6851dega433ilmksfoabg8avn12bklpq.apps.googleusercontent.com";
const GOOGLE_REFERSHTOKEN =
  "1//04lHVuaBB2H_1CgYIARAAGAQSNwF-L9IrOOkUS2GBtouuMxjdYZnFOpm5bI4BHqZl6Lsx_w_vdVwgMqEue-wQ3cS5ib8YpN_k2J0";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_SECRET, GOOGLE_REDIRECT, GOOGLE_ID);
oAuth.setCredentials({ refresh_token: GOOGLE_REFERSHTOKEN });

export const signUpEmail = async (newUser: any) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "olorundasamuel2@gmail.com",
        refreshToken: accessToken.token || "",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFERSHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/mail.ejs");

    const data = await ejs.renderFile(buildFile, {});

    const mailOption = {
      from: "Verify your DevBucket Account 🧑‍💻🧑‍💻🧑‍💻 <olorundasamuel2@gmail.com>",
      to: newUser.email,
      subject: "Account Verification",
      html: "data",
    };

    mailTransporter.sendMail(mailOption);
  } catch (error) {
    return error;
  }
};
