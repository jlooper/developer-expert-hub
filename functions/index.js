
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const APP_NAME = 'Developer-Experts-Hub';

//for new applications

exports.sendThanksEmail = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.
  const email = user.email; // The email of the user.
  return sendThanksEmail(email);
});

function sendThanksEmail(email) {
  const mailOptions = {
    from: '"Dev Expert Hub" <noreply@developer-experts-hub.firebaseapp.com>',
    to: email
  };
  mailOptions.subject = `Thank you for applying for the Developer Experts program`;
  mailOptions.html = `<!-- THIS EMAIL WAS BUILT AND TESTED WITH LITMUS http://litmus.com -->
<!-- IT WAS RELEASED UNDER THE MIT LICENSE https://opensource.org/licenses/MIT -->
<!-- QUESTIONS? TWEET US @LITMUSAPP -->
<!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
    /* FONTS */
    @media screen {
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 400;
          src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
        }
        
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 700;
          src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
        }
        
        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 400;
          src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
        }
        
        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 700;
          src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
        }
    }
    
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    /* MOBILE STYLES */
    @media screen and (max-width:600px){
        h1 {
            font-size: 32px !important;
            line-height: 32px !important;
        }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Thank you for applying for the Developer Expert program at Progress!
</div>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#000000" align="center">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                        <a href="http://progress.com" target="_blank">
                            <img alt="Logo" src="https://gallery.mailchimp.com/7515256f38b8b2be6304f4e99/images/3b607a41-2b1a-4a36-988e-4cd972b4b3ca.png" width="40" height="40" style="display: block; width: 500px; max-width: 500px; min-width: 100px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                        </a>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- HERO -->
    <tr>
        <td bgcolor="#000000" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                      <h1 style="font-size: 48px; font-weight: 400; margin: 0;">Thanks!</h1>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">Thank you for your interest in the Progress Developer Expert program. Your application is being reviewed, and we'll get back to you soon!</p>
                </td>
              </tr>
              
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">Sincerely,<br>Jen Looper<br/>Senior Developer Advocate, Progress</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- SUPPORT CALLOUT -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <!-- HEADLINE -->
                <tr>
                  <td bgcolor="#808080" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Learn More</h2>
                    <p style="margin: 0;"><a href="http://progress.com" target="_blank" style="color: #FFA73B;">Developer Experts Program</a></p>
                  </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- FOOTER -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
              <!-- NAVIGATION -->
              <tr>
                <td bgcolor="#f4f4f4" align="left" style="padding: 30px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                 <p style="margin: 0;">You received this email because you just signed up for a new account. If it looks weird, <a href="http://litmus.com" target="_blank" style="color: #111111; font-weight: 700;">view it in your browser</a>.</p>
                </td>
              </tr>
              
             
              <!-- ADDRESS -->
              <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                  <p style="margin: 0;">Progress - 20 Jones Road - Waltham, MA - 02451</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
</table>

                <!--[if (gte mso 9)|(IE)]>
</td>
</tr>
</table>
<![endif]-->
            </td>
        </tr>
    </table>
    <!-- END LITMUS ATTRIBUTION -->
    
</body>
</html>
`;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Thanks email sent');
  });
}

//notify admin of new info

/*exports.sendMail = functions.database.ref('/Profile/{uid}')
  .onWrite(event => {
      const data = event.data.val();
      return sendEmail(data);
});

function sendEmail(data) {
  const mailOptions = {
    from: '"Dev Expert Hub" <noreply@developer-experts-hub.firebaseapp.com>',
    to: 'jen.looper@progress.com'
  };
  mailOptions.subject = `New Dev Expert Info!`;
  mailOptions.text = `New info was just posted to the Dev Experts Hub `+JSON.stringify(data);
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Alert email sent');
  });
}*/

//notify admin of checkin

exports.sendCheckinMail = functions.database.ref('/Profile/{uid}/Checkins')
  .onWrite(event => {
      const data = event.data.val();
      return sendCheckinEmail(data);
});

function sendCheckinEmail(data) {
  const mailOptions = {
    from: '"Dev Expert Hub" <noreply@developer-experts-hub.firebaseapp.com>',
    to: 'jen.looper@progress.com'
  };
  mailOptions.subject = `New Dev Expert Checkin Info!`;
  mailOptions.text = `A new checkin was just posted to the Dev Experts Hub `+JSON.stringify(data);
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Alert email sent');
  });
}

//notify admin of activity

exports.sendActivityMail = functions.database.ref('/Profile/{uid}/Activities')
  .onWrite(event => {
      const data = event.data.val();
      return sendActivitiesEmail(data);
});

function sendActivitiesEmail(data) {
  const mailOptions = {
    from: '"Dev Expert Hub" <noreply@developer-experts-hub.firebaseapp.com>',
    to: 'jen.looper@progress.com'
  };
  mailOptions.subject = `New Dev Expert Activity Info!`;
  mailOptions.text = `A new activity was just posted to the Dev Experts Hub `+JSON.stringify(data);
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Alert email sent');
  });
}

//notify admin of new user

exports.sendUserMail = functions.database.ref('/Profile')
  .onCreate(event => {
      const data = event.data.val();
      return sendUserEmail(data);
});

function sendUserEmail(data) {
  const mailOptions = {
    from: '"Dev Expert Hub" <noreply@developer-experts-hub.firebaseapp.com>',
    to: 'jen.looper@progress.com'
  };
  mailOptions.subject = `New Dev Expert Activity Info!`;
  mailOptions.text = `A new user was just created in the Dev Experts Hub `+JSON.stringify(data);
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Alert email sent');
  });
}

//notify admin of new request

exports.sendRequestMail = functions.database.ref('/Profile/{uid}/Requests')
  .onWrite(event => {
      const data = event.data.val();
      return sendRequestEmail(data);
});

function sendRequestEmail(data) {
  const mailOptions = {
    from: '"Dev Expert Hub" <noreply@developer-experts-hub.firebaseapp.com>',
    to: 'jen.looper@progress.com'
  };
  mailOptions.subject = `New Dev Expert Request Info!`;
  mailOptions.text = `A new request was just created in the Dev Experts Hub `+JSON.stringify(data);
  return mailTransport.sendRequestMail(mailOptions).then(() => {
    console.log('Alert email sent');
  });
}