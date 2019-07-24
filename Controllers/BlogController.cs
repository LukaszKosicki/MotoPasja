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

        [HttpGet]
        public JsonResult GetBlogs()
        {
            //zmienić, żeby pobierało tylko jedno zdjęcie (większa ilość jest zbędna)
            return Json(repository.Blogs.Include(b => b.Images));
        }

        [HttpGet]
        public JsonResult GetBlog(int id)
        {
            return Json(repository.Blogs.Include(b => b.Images).
                FirstOrDefault(b => b.Id == id));
        }

        [HttpPost]
        public JsonResult CreateBlog([FromBody] BlogModel model)
        {
            repository.CreateBlog(model);
            return Json(model.Id);
        }

        [HttpDelete]
        public JsonResult Delete(int blogId)
        {
            return Json(repository.DeleteBlog(blogId));
        }

        [HttpPatch]
        public JsonResult UpdateBlog([FromBody] BlogModel model)
        {
            return Json(repository.UpdateBlog(model));
        }
    }
}