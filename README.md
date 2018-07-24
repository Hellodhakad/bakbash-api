var mailOptions = {
from: '"Support" <mailto:abc@example.com>', // sender address
to: def@example.com, // list of receivers
bcc: 'dkdhakad97@gmail.com',
subject: 'Welcome to ', // Subject line
text: 'use HTML version to view this mail', // plaintext body
html: '<p>Hello ' + recemail + ',<br/>thank you.</p><p><br/>Regards,<br/>Support</p>' // html body
};

const sendOtp = new SendOtp('161409AHAAENNMN094ceb76');
sendOtp.send(917877383873, "PRIIND", function (error, data) {
    console.log(data);
  });



<b>npm install vakbase-api</b>
