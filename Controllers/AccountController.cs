using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using MotoPasja.Models.Identity;

namespace MotoPasja.Controllers
{
    public class AccountController : Controller
    {
        private UserManager<AppUser> userManager;
        private SignInManager<AppUser> signInManager;

        public AccountController(UserManager<AppUser> userMgr, 
            SignInManager<AppUser> signMgr)
        {
            userManager = userMgr;
            signInManager = signMgr;
        }

        [HttpPost]
        public async Task<JsonResult> Register([FromBody] CreateModel model)
        {
            Dictionary<string, string> answer = new Dictionary<string, string>();

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
                    answer.Add("success", "true");
                    return Json(answer);
                }
                else
                {
                    answer.Add("success", "false");
                    foreach (var error in result.Errors)
                    {
                        answer.Add(error.Code, error.Description);
                    }
                    return Json(answer);
                }
            }
            else
            {
                answer.Add("success", "false");
                answer.Add("error", "Wprowadzone dane są nieprawidłowe. Popraw dane i spróbuj jeszcze raz.");
                return Json(answer);
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
                        return Json(user);
                    }
                    else
                    {
                        return Json(false);
                    }
                }
                else
                {
                    return Json(false);
                }
            }
            else 
            {
                return Json(false);
            } 
        }
    }
}