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

            return Json(new {
                UserName = user.UserName,
                Email = user.Email,
                Avatar = "data:image/png;base64, " + Convert.ToBase64String(user.Avatar)
            });
        }

        [HttpPost]
        public async Task<JsonResult> UpdateAvatar()
        {
            AppUser user = await userManager.GetUserAsync(HttpContext.User);

            using (var memoryStream = new MemoryStream())
            {
                await Request.Form.Files[0].CopyToAsync(memoryStream);
                user.Avatar = memoryStream.ToArray();
            }

            IdentityResult result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Json("data:image/png;base64," + Convert.ToBase64String(user.Avatar));
            } 
            else
            {
                return Json(false);
            }
        }
    }
}