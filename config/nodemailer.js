const nodemailer=require('nodemailer');
const ejs=require('ejs');

const path=require('path');

//creating Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 'smtp.gmail.com',
    port: 587,
    secure: 'false',
    auth: {
        user: 'manojl0430',
        pass: 'mumsmlb7'
    }
})

// Define we will be using EJS

let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){console.log('Error in rendering template'); return;}

            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
}