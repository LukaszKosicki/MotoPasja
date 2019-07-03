using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MotoPasja.Models.Blog;
using MotoPasja.Models;
using System.IO;
using System.Globalization;

namespace MotoPasja.Controllers
{
    public class BlogController : Controller
    {
        private IBlogRepository repository;

        public BlogController(IBlogRepository repo)
        {
            this.repository = repo;
        }

        public JsonResult GetBlogsList()
        {
            return Json(repository.Blogs.Include(b => b.Images));
        }

        public JsonResult GetBlog(int id)
        {
            return Json(repository.Blogs.Include(b => b.Images).
                FirstOrDefault(b => b.Id == id));
        }

        [HttpPost]
        public JsonResult AddBlog([FromBody] BlogModel model)
        {
            model.Author = "GalAnonim";
            model.EditingDate = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
            repository.SaveBlog(model);
            return Json("sukces");
        }
    }
}