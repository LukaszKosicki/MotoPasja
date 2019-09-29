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
                    return Json(new
                    {
                        Success = true,
                        Message = "Grtulacje!"
                    }); 
                }
                else
                {
                    return Json(new
                    {
                        Success = false,
                        Message = "Coś Poszło nie tak. Spróbuj jeszcze raz!"
                    });
                }
            }
            else
            {
                return Json(new {
                    Success = false,
                    Message = "Wprowadzone dane są nieprawidłowe. Popraw je i spróbuj jeszcze raz!"
                });
            }
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
                    else
                    {
                        return Json(new {
                            Success = false,
                            Message = "Nieprawidłowe hasło lub e-mail"
                        });
                    }
                }
                else
                {
                    return Json(new
                    {
                        Success = false,
                        Message = $"Użytkownik o adresie e=mail: {model.Email} nie istnieje."
                    });
                }
            }
            else 
            {
                return Json(new
                {
                    Success = false,
                    Message = $"Wprowadzone dane są nieprawidłowe."
                });
            } 
        }

        public async Task<JsonResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Json(true);
        }
    }
}