using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MotoPasja.Models.Blog;

namespace MotoPasja.Controllers
{
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
        public JsonResult GetAverageRating(int blogId)
        {
            return Json(repository.GetAverageRating(blogId));
        }
    }
}