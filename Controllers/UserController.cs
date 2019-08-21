using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MotoPasja.Models.Identity;
using Microsoft.AspNetCore.Identity;

namespace MotoPasja.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        private UserManager<AppUser> userManager;

        public UserController(UserManager<AppUser> userMgr)
        {
            userManager = userMgr;
        }

        public async Task<JsonResult> GetUser()
        {
            AppUser user = await userManager.GetUserAsync(HttpContext.User);

            Dictionary<string, string> userData = new Dictionary<string, string>();
            userData.Add(nameof(user.UserName), user.UserName);
            userData.Add(nameof(user.Email), user.Email);

            return Json(userData);
        }
    }
}