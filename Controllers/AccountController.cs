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
            Dictionary<string, string> answer = new Dictionary<string, string>();
            if (ModelState.IsValid)
            {
                AppUser user =
                    await userManager.FindByEmailAsync(model.Email);

                if(user != null)
                {
                    /*
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(appSettings.Secret);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Name, user.Id)
                        }),
                        Expires = DateTime.UtcNow.AddDays(7),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };

                    var token = tokenHandler.CreateToken(tokenDescriptor);
                   */

                    await signInManager.SignOutAsync();
             
                    if ((await signInManager.PasswordSignInAsync(user,
                        model.Password, false, false)).Succeeded)
                    {
                        Dictionary<string, string> userData = new Dictionary<string, string>();
                        userData.Add(nameof(user.UserName), user.UserName);
                        userData.Add(nameof(user.Email), user.Email);

                        return Json(userData);
                    }
                    else
                    {
                        answer.Add("error", "Nieprawidłowa nazwa użytkownika lub hasło!");
                        return Json(answer);
                    }
                }
                else
                {
                    answer.Add("error", $"Użytkownik {model.Email} nie istnieje!");
                    return Json(false);
                }
            }
            else 
            {
                answer.Add("error", "Wprowadzone dane są nieprawidłowe. Proszę Cię nie włamuj się!");
                return Json(answer);
            } 
        }

        public async Task<JsonResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Json(true);
        }
    }
}