using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MotoPasja.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using System.IO;
using MotoPasja.Services;
using System.Net.Mail;
using System.Text;

namespace MotoPasja.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        private UserManager<AppUser> userManager;
        private SignInManager<AppUser> signInManager;

        public UserController(UserManager<AppUser> userMgr, SignInManager<AppUser> signIn)
        {
            userManager = userMgr;
            signInManager = signIn;
        }

        [HttpPatch]
        public async Task<JsonResult> UpdateUser([FromBody] UpdateUserModel model)
        {
            AppUser user = await userManager.GetUserAsync(HttpContext.User);   
            if (user != null)
            {
                if (userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, model.Password) 
                    == PasswordVerificationResult.Success)
                {
                    //jesli nowa nazwa jest inna - zmienia
                    IdentityResult updateUserNameResult = null;
                    if (user.UserName != model.UserName)
                    {
                        updateUserNameResult = await userManager.SetUserNameAsync(user, model.UserName);

                        if (!updateUserNameResult.Succeeded)
                        {
                            List<string> errors = new List<string>();
                            foreach (var err in updateUserNameResult.Errors)
                            {
                                errors.Add(err.Description);
                            }
                            return Json(new
                            {
                                Success = false,
                                Errors = errors
                            });
                        }
                        await signInManager.RefreshSignInAsync(user);
                    }
                    // jesli nowy email jest inny - zmienia
                    if (model.Email != user.Email)
                    {
                        string token = await userManager.GenerateChangeEmailTokenAsync(user, model.Email);
                        string link = Url.Action("ChangeEmail", "User",
                            new {
                            userId = user.Id,
                            token,
                            email = model.Email
                                }, protocol: HttpContext.Request.Scheme);

                        MailMessage mes = new MailMessage("kontakt@from0to-fullstackdeveloper.pl", "lukaszvip166@onet.pl",
                       "aktywuj", link);

                        MyEmailClient myEmailClient = new MyEmailClient();
                        await myEmailClient.SendEmail(mes);
                    }
                    if (updateUserNameResult != null && model.Email != user.Email) return Json(new
                    {
                        Success = true,
                        UserNameChanged = true,
                        user.UserName,
                        EmailChanged = true
                    });
                    else if (updateUserNameResult != null && model.Email == user.Email) return Json(new
                    {
                        Success = true,
                        UserNameChanged = true,
                        user.UserName,
                        EmailChanged = false
                    });
                    else if (updateUserNameResult == null && model.Email != user.Email) return Json(new
                    {
                        Success = true,
                        UserNameChanged = false,
                        EmailChanged = true
                    });
                    
                }
                return Json(new
                {
                    Success = false,
                    Errors = new List<string> { "Wprowadzone hasło jest nieprawidłowe!" }
                });
            }
            return Json(new
            {
                Success = false,
                Errors = new List<string> { "Odśwież stronę i zaloguj się ponownie!" }
            });
        }

        [AllowAnonymous]
        public async Task<JsonResult> GetUser(string userName = "")
        {
            AppUser user =userName != "" ? user = await userManager.FindByNameAsync(userName) :
                user = await userManager.GetUserAsync(HttpContext.User);

            JsonResult answer = user == null ? Json(new {
                Success = false
            }) : Json(new {
                Success = true,
                user.UserName,
                user.Email,
                Avatar = user.Avatar != null ?
                            "data:image/png;base64, " + Convert.ToBase64String(user.Avatar) :
                            "images/avatar.png",
            });

            return answer;
        }

        [HttpPost]
        public async Task<JsonResult> UpdateAvatar()
        {
            AppUser user = await userManager.GetUserAsync(HttpContext.User);
            string s = Request.Form["avatar"];
            user.Avatar = Convert.FromBase64String(s);

            IdentityResult result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Json("data:image/png;base64," + Convert.ToBase64String(user.Avatar));
            }      
            return Json(false);
        }

        [HttpPatch]
        public async Task<JsonResult> DeleteAvatar()
        {
            AppUser user = await userManager.GetUserAsync(HttpContext.User);
            user.Avatar = null;
            if ((await userManager.UpdateAsync(user)).Succeeded)
            {
                return Json(new
                {
                    Success = true,
                    Avatar = "images/avatar.png"
                });
            }
            return Json(new
            {
                Success = false
            });
        }

        [AllowAnonymous]
        public async Task<ActionResult> ChangeEmail(string userId, string token, string email)
        {
            AppUser user = await userManager.FindByIdAsync(userId);
            IdentityResult result = await userManager.ChangeEmailAsync(user, email, token);

            if (result.Succeeded) return Redirect(@"https://localhost:44308/#/emailConfirmed");

            return Redirect(@"https://localhost:44308/#/unconfirmedEmail");
        }
    }
}