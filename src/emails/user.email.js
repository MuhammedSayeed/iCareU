import nodemailer from 'nodemailer'
import * as html from './user.email.html.js'


export const sendEmail = async (email, code, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mhmdsayed90031@gmail.com",
            pass: "zwlxvcysvgbbqacl",
        },
    });
    const info = await transporter.sendMail({
        from: '"Muhammed sayed" <mhmdsayed90031@gmail.com>',
        to: email,
        subject: "Hello ✔",
        html: token ? html.verifyUserHtml(token , code) : html.forgotPasswordHtml(code)
    });

    console.log(info);

}