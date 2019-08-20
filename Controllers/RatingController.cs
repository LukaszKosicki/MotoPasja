using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MotoPasja.Models.Blog;

namespace MotoPasja.Controllers
{
    [Authorize]
    public class RatingController : Controller
    {
        private IRatingRepository repository;

        public RatingController(IRatingRepository repo) =>
            repository = repo;

        [HttpPost]
        public JsonResult AddRating([FromBody] RatingBlogModel model)
        {
            return Json(repository.AddRating(model, HttpContext.User.Identity.Name));
        }

        [HttpGet]
        [AllowAnonymous]
        public JsonResult GetAverageRating(int blogId)
        {
            return Json(repository.GetAverageRating(blogId));
        }
    }
}