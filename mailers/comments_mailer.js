const nodemailer = require('../config/nodemailer');

//let newComment = .........
//module.exports = newComment


//the below code is a shortcut for the above code:
exports.newComment = (comment)=>{
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comments.ejs');

    console.log("Inside new comment mailer");

    nodemailer.transporter.sendMail({
        from: 'codeial.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    }, (error,info)=>{
        if(error){ console.log("Error in sending mail :", error); return;}
        console.log("Mail has been sent...", info);
        return ;
    })
}