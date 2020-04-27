const {email}=require('../config/emailconfig')
const PASSWORD_LENGTH = 8;
const OFFSET = 2;

let generatePassword = () => {
    let password = Math.random().toString(36).substring(OFFSET, PASSWORD_LENGTH + OFFSET);
    return password;
}

let sendForgotPasswordMail=(receiver,password)=>{
    let subject=`Password Reset`;
      let body=`<html><h2 style="background-color:blue;color:white;padding:10px">Password Reset</h2>
                    <p>Somebody (hopefully you) requested a new password for the Admin account for ${receiver}. No changes have been made to your account yet.</p>     
                    <p>Your new password: ${password}</p>
                    <p>If you did not request a new password, please let us know immediately by replying to this email.</p>
                <html>`;
      email.sendEmail(receiver,subject,body);
}

const helperFunctions = {
    generatePassword,
    sendForgotPasswordMail
}

module.exports = {
    helperFunctions
}