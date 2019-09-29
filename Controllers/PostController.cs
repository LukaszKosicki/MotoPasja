using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MotoPasja.Models.Blog;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using MotoPasja.Models.Identity;

namespace MotoPasja.Controllers
{
    [Authorize]
    public class PostController : Controller
    {
        private IPostRepository postRepository;
        private IConfiguration configuration;
        private UserManager<AppUser> userManager;

        public PostController(IPostRepository postRepo, IConfiguration conf, UserManager<AppUser> usrMgr)
        {
            postRepository = postRepo;
            configuration = conf;
            userManager = usrMgr;
        }

        [HttpGet]
        [AllowAnonymous]
        public JsonResult GetPosts(int blogId)
        {
            return Json(postRepository.Posts.Include(p => p.Images).ToList()
            .Join(userManager.Users, p => p.AuthorId, u => u.Id, (p, u) => new
            {
                p.Id,
                p.BlogModelId,
                Author = u.UserName,
                p.Title,
                p.Contents,
                DateOfAddition = p.DateOfAddition.ToString("yyyy-MM-dd hh:mm"),
                EditingDate = p.EditingDate.ToString("yyyy-MM-dd hh:mm"),
                p.Images
            }).Where(p => p.BlogModelId == blogId));
        }
        
        [HttpPost]
        public JsonResult CreatePost([FromBody] PostModel model)
        {
            model.AuthorId = userManager.GetUserId(HttpContext.User);

            postRepository.CreatePost(model, configuration["RootFolder"]);
            return Json("");
        }

        [HttpDelete]
        public JsonResult DeletePost(int postId)
        {
            return Json(postRepository.DeletePost(postId, userManager.GetUserId(HttpContext.User)));

        }

        [HttpPatch]
        public JsonResult UpdatePost([FromBody] PostModel model)
        {
            return Json(postRepository.UpdatePost(model, userManager.GetUserId(HttpContext.User)));
        }
    }
}