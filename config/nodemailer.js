const nodemailer = require('nodemailer');
const ejs = require('ejs');
const env = require('./environment');
const path = require('path');

let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(error,template){
            if(error){
                console.log("Error in rendering the template!!",error);
                return;
            }
            mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}