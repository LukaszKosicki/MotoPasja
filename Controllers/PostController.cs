using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MotoPasja.Models.Blog;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace MotoPasja.Controllers
{
    [Authorize]
    public class PostController : Controller
    {
        private IPostRepository repository;

        public PostController(IPostRepository repo) =>
            this.repository = repo;

        [AllowAnonymous]
        public JsonResult GetPosts(int blogId)
        {
            return Json(repository.Posts.Include(p => p.Images)
                .Where(p => p.BlogModelId == blogId));
        }
        
        [HttpPost]
        public JsonResult CreatePost([FromBody] PostModel model, int blogId)
        {
            repository.CreatePost(model, blogId);
            return Json("");
        }

        [HttpDelete]
        public JsonResult DeletePost(int postId)
        {
            return Json(repository.DeletePost(postId, HttpContext.User.Identity.Name));

        }

        [HttpPatch]
        public JsonResult UpdatePost([FromBody] PostModel model)
        {
            return Json(repository.UpdatePost(model, HttpContext.User.Identity.Name));
        }
    }
}