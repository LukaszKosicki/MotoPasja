using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace MotoPasja.Services
{
    public class MyEmailClient
    {
        private SmtpClient smtpClient;

        public MyEmailClient()
        {
            smtpClient = new SmtpClient("smtp.webio.pl");
            smtpClient.Credentials = new NetworkCredential("kontakt@from0to-fullstackdeveloper.pl", "Ditech01!");
            smtpClient.EnableSsl = true;
        }
       
        public MyEmailClient(string host, string emailFrom, string password)
        {
            smtpClient = new SmtpClient(host);
            smtpClient.Credentials = new NetworkCredential(emailFrom, password);
            smtpClient.EnableSsl = true;
        }
        
        public async Task<bool> SendEmail(MailMessage message)
        {
            await smtpClient.SendMailAsync(message);
            return true;
        }
    }
}
