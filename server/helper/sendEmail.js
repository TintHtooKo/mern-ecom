const nodemailer = require("nodemailer");
const ejs = require("ejs");

let sendEmail = async({view, data , from ,to ,subject}) =>{
    try {
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ad321d3be73770",
          pass: "8133d84f8650ed"
        }
      });
      let dataString = await ejs.renderFile('./views/'+view+'.ejs',data)
      const info = await transport.sendMail({
        from,
        to,
        subject,
        html: dataString, // html body
      });
    } catch (e) {
      throw new Error(e)
    }
}

module.exports = sendEmail
