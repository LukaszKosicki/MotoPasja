using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MotoPasja.Models.Blog;
using MotoPasja.Models.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;


namespace MotoPasja.Controllers
{
    [Authorize]
    public class BlogController : Controller
    {
        private IBlogRepository blogRepository;
        private IConfiguration configuration;
        private UserManager<AppUser> userManager;

        public BlogController(IBlogRepository blogRepo, IConfiguration conf, UserManager<AppUser> userMgr)
        {
            blogRepository = blogRepo;
            configuration = conf;
            userManager = userMgr;
        }

        [HttpGet]
        [AllowAnonymous]
        public JsonResult GetBlogs()
        {
            var bl = blogRepository.Blogs.Include(b => b.Images).ToList().Join(userManager.Users.Select(u => new
            {
                u.Id,
                u.UserName,
                u.Avatar
            }),
                b => b.AuthorId,
                u => u.Id,
                (b, u) => new
                {
                    b.Id,
                    Author = u.UserName,
                    AuthorAvatar = u.Avatar != null ? "data:image/png;base64," + Convert.ToBase64String(u.Avatar) : "icons/user.png",
                    Miniature = b.Images.Count > 0 ? b.Images[0].Src : "",
                    DateOfLastEdition = b.EditingDate.ToString("yyyy-MM-dd hh:mm"),
                    b.Contents,
                    b.AverageRating,
                    b.Title
                });
            return Json(bl);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<JsonResult> GetUserBlogs(string userName)
        {
            AppUser user = await userManager.FindByNameAsync(userName);
            string userID = await userManager.GetUserIdAsync(user);

            return Json(blogRepository.Blogs.Include(b => b.Images).Where(b => b.AuthorId == userID)
                .ToList().Join(userManager.Users, b => b.AuthorId, u => u.Id, (b, u) => new
                {
                    b.Id,
                    Author = u.UserName,
                    AuthorAvatar = u.Avatar != null ? "data:image/png;base64," + Convert.ToBase64String(u.Avatar) : "icons/user.png",
                    Miniature = b.Images.Count > 0 ? b.Images[0].Src : "",
                    DateOfLastEdition = b.EditingDate.ToString("yyyy-MM-dd hh:mm"),
                    b.Contents,
                    b.AverageRating,
                    b.Title
                }));
        }
        
        [HttpGet]
        [AllowAnonymous]
        public JsonResult GetBlog(int id)
        {
            return Json(blogRepository.Blogs.Include(b => b.Images).ToList().Join(userManager.Users,
                b => b.AuthorId,
                u => u.Id,
                (b, u) => new
                {
                    b.Id,
                    Author = u.UserName,
                    AuthorAvatar = u.Avatar != null ? "data:image/png;base64," + Convert.ToBase64String(u.Avatar) : "icons/user.png",
                    b.AverageRating,
                    b.Contents,
                    DateOfAddition = b.DateOfAddition.ToString("yyyy-MM-dd hh:mm"),
                    DateOfLastEdition = b.EditingDate.ToString("yyyy-MM-dd hh:mm"),
                    Images = b.Images != null ? b.Images : new List<BlogImage>(),
                    b.NumberOfRatings,
                    b.Title
                }).FirstOrDefault(b => b.Id == id));
        }
         
        [HttpPost]
        public JsonResult CreateBlog([FromBody] BlogModel model)
        {
            model.AuthorId = userManager.GetUserId(HttpContext.User);

            blogRepository.CreateBlog(model, configuration["RootFolder"]);
            return Json(model.Id);
        }

        [HttpDelete]
        public JsonResult Delete(int blogId)
        {
            return Json(blogRepository.DeleteBlog(blogId, userManager.GetUserId(HttpContext.User)));
        }

        [HttpPatch]
        public JsonResult UpdateBlog([FromBody] BlogModel model)
        {
            return Json(blogRepository.UpdateBlog(model, userManager.GetUserId(HttpContext.User)));
        }
    }
}