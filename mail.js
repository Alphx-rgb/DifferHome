var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:'shivangrawatiitism@gmail.com',
        pass:'tyagi@25dec'
    }
});

module.exports=function (data){
    var mailOptions={
        from:'shivangrawatiitism.gmail.com',
        to:'shivangbvm@gmail.com',
        subject:'New request',
        text: `${data.name}\n ${data.phone}\n ${data.email} ${data.discription}\n`
    }
    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
        }
        else{
        console.log('email has been send',info.response);   
        next(); 
        }
        });
        
}

