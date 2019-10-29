using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using MotoPasja.Models.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.IO;
using System.Net.Mail;
using MotoPasja.Services;

namespace MotoPasja.Controllers
{
    public class AccountController : Controller
    {
        private UserManager<AppUser> userManager;
        private SignInManager<AppUser> signInManager;

        public AccountController(UserManager<AppUser> userMgr, 
            SignInManager<AppUser> signMgr, IOptions<AppSettings> options)
        {
            userManager = userMgr;
            signInManager = signMgr;
        }

        //nalezy zmienic adres email na ktory wysylane sa wiadomosci
        [HttpPost]
        public async Task<JsonResult> Register([FromBody] CreateModel model)
        {
            if (ModelState.IsValid && model.Password == model.PasswordRepeated)
            {
                AppUser newUser = new AppUser
                {
                    Email = model.Email,
                    UserName = model.UserName
                };

                IdentityResult result = await userManager.CreateAsync(newUser, model.Password);

                if (result.Succeeded)
                {
                    string confirmationToken = userManager
                        .GenerateEmailConfirmationTokenAsync(newUser).Result;

                    string link = $@"{this.Request.Scheme}://{this.Request.Host}/#/confirmEmail?userId={newUser.Id}&token={confirmationToken}";
                 
                    MailMessage mes = new MailMessage("kontakt@from0to-fullstackdeveloper.pl", "lukaszvip166@onet.pl",
                        "aktywuj", link);

                    MyEmailClient myEmailClient = new MyEmailClient();
                    await myEmailClient.SendEmail(mes);

                    return Json(new
                    {
                        Success = true,
                        Message = "Grtulacje!"
                    }); 
                }
                // identityResult == false    
                List<string> errors = new List<string>();
                foreach (var err in result.Errors)
                {
                    errors.Add(err.Description);
                }

                return Json(new
                {
                    Success = false,
                    Errors = errors
                });            
            }

            return Json(new {
                Success = false,
                Errors = new List<string> { "Wprowadzone dane nie spełniają wymagań aplikacji. Popraw je i spróbuj jeszcze raz." }
            });
        }

        [HttpPost]
      //  [ValidateAntiForgeryToken]
        public async Task<JsonResult> Login([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                AppUser user =
                    await userManager.FindByEmailAsync(model.Email);

                if(user != null)
                {
                    await signInManager.SignOutAsync();
             
                    if ((await signInManager.PasswordSignInAsync(user,
                        model.Password, false, false)).Succeeded)
                    {
                        return Json(new {
                            Success = true,
                            Avatar = user.Avatar != null ? 
                            "data:image/png;base64, " + Convert.ToBase64String(user.Avatar) :
                            "images/avatar.png",
                            user.UserName,
                            user.Email
                        });
                    }
                    return Json(new {
                        Success = false,
                        Errors = new List<string> { "Nieprawidłowe hasło lub e-mail" }
                    });
                }
                return Json(new
                {
                    Success = false,
                    Errors = new List<string> { $"Użytkownik o adresie e=mail: {model.Email} nie istnieje." }
                });
            }    
            return Json(new
            {
                Success = false,
                Errors = new List<string> { $"Wprowadzone dane są nieprawidłowe." }
            });
        } 

        [HttpPut]
        public async Task<JsonResult> ConfirmEmail()
        {
            AppUser user = await userManager.FindByIdAsync(Request.Form["userId"]);

            if (user != null)
            {
                if (user.EmailConfirmed)
                {
                    return Json(new
                    {
                        Success = false,
                        Errors = new List<string> { "Link nie jest już aktywny. Twój adres jest już zweryfikowany poprawnie!" }
                    });
                }

                var result = await userManager.ConfirmEmailAsync(user, Request.Form["token"]);

                if (result.Succeeded)
                {
                    return Json(new
                    {
                        Success = true
                    });
                }
                List<string> errors = new List<string>();
                foreach (var err in result.Errors)
                {
                    errors.Add(err.Description);
                }
                return Json(new
                {
                    Success = false,
                    Errors = errors
                });
            }
            else
            {
                return Json(new
                {
                    Success = false,
                    Errors = new List<string> { "Link aktywujący jest nieprawidłowy. Spróbuj zarejestrować się jeszcze raz!" }
                });
            }
        }

        public async Task<JsonResult> ResetPasswordGenerateToken(string email)
        {
            AppUser user = await userManager.FindByEmailAsync(email);
            if (user != null)
            {
                string token = await userManager.GeneratePasswordResetTokenAsync(user);

                string link = $@"{this.Request.Scheme}://{this.Request.Host}/#/resetPassword?userId={user.Id}&token={token}";

                MailMessage mes = new MailMessage("kontakt@from0to-fullstackdeveloper.pl", "lukaszvip166@onet.pl",
                            "aktywuj", link);

                MyEmailClient myEmailClient = new MyEmailClient();
                await myEmailClient.SendEmail(mes);

                return Json(new
                {
                    Success = true
                });
            }
            return Json(new
            {
                Success = false,
                Errors = new List<string> { $"Użytkownik o adresie e-mail: {email} nie istnieje." }
            });
        }

        [HttpPost]
        public async Task<JsonResult> ResetPassword()
        {
            AppUser user = await userManager.FindByIdAsync(Request.Form["userId"]);
            string password = Request.Form["password"];
            string confirmedPassword = Request.Form["confirmedPassword"];

            if (user != null && password == confirmedPassword)
            {
                IdentityResult result = await userManager
                    .ResetPasswordAsync(user, Request.Form["token"], password);

                if (result.Succeeded)
                {
                    return Json(new
                    {
                        Success = true
                    });
                }
                List<string> errors = new List<string>();
                foreach (var err in result.Errors)
                {
                    errors.Add(err.Description);
                }
                return Json(new
                {
                    Success = false,
                    Errors = errors
                });
            }
            return Json(new
            {
                Success = false,
                Errors = new List<string>()
            });
        }

        public async Task<JsonResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Json(true);
        }
    }
}