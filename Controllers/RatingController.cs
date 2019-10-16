using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MotoPasja.Models.Blog;
using MotoPasja.Models.Identity;

namespace MotoPasja.Controllers
{
    [Authorize]
    public class RatingController : Controller
    {
        private IRatingRepository repository;
        private UserManager<AppUser> userManager;

        public RatingController(IRatingRepository repo, UserManager<AppUser> usrMgr)
        {
            repository = repo;
            userManager = usrMgr;
        }

        [HttpPost]
        public JsonResult AddRating([FromBody] RatingBlogModel model)
        {
            model.AuthorId = userManager.GetUserId(HttpContext.User);
            return Json(repository.AddRating(model));
        }

        [HttpGet]
        public JsonResult DidTheUserVote(int modelId)
        { 
            return Json(repository.DidTheUserVote(modelId, userManager.GetUserId(HttpContext.User)));
        }

        [HttpGet]
        [AllowAnonymous]
        public JsonResult GetAverageRating(int blogId)
        {
            return Json(new
            {
                AverageRating = repository.GetAverageRating(blogId),
                NumberOfRatings = repository.GetNumberOfRatings(blogId)
            });
        }
    }
}