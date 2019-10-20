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
                    string confirmationLink = Url.Action("ConfirmEmail",
                      "Account", new
                      {
                          userid = newUser.Id,
                          token = confirmationToken
                      },
                       protocol: HttpContext.Request.Scheme);

                    MailMessage mes = new MailMessage("kontakt@from0to-fullstackdeveloper.pl", "lukaszvip166@onet.pl",
                        "aktywuj", confirmationLink);

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

        public async Task<ActionResult> ConfirmEmail(string userId, string token)
        {
            AppUser user = await userManager.FindByIdAsync(userId);
            IdentityResult result = userManager.ConfirmEmailAsync(user, token).Result;
  
            if (result.Succeeded)
            {
                return Redirect(@"https://localhost:44308/#/emailConfirmed");
            }
            return Redirect(@"https://localhost:44308/#/unconfirmedEmail");
        }

        public async Task<JsonResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Json(true);
        }
    }
}