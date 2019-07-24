using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Globalization;

namespace MotoPasja.Models.Blog
{
    public class EFImageRepository : IImageRepository
    {
        private ApplicationDbContext context;

        public EFImageRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void DeleteImage(int modelId, string fileName, string model)
        {
            if(model == "blog")
            {
                var blog = context.Blogs.Include(b => b.Images).FirstOrDefault(b => b.Id == modelId);
                blog.EditingDate = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
                blog.Images.Remove(blog.Images.FirstOrDefault(i => i.FileName.IndexOf(fileName) != -1));
                context.Blogs.Update(blog);
                context.SaveChanges();
            }
        }

        public void AddImageToModel(int modelId, string fileName, string model)
        {
            if (model == "blog")
            {
                var blog = context.Blogs.Include(b => b.Images).FirstOrDefault(b => b.Id == modelId);
                blog.EditingDate = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
                var img = blog.Images.FirstOrDefault(i => i.FileName.IndexOf(Path.GetFileNameWithoutExtension(fileName)) != -1);
                if (img != null)
                {
                    img.FileName = $@"images/{model}/{modelId}/{fileName}";
                }
                else
                {
                    blog.Images.Add(new BlogImage { Alt = "", FileName = $@"images/{model}/{modelId}/{fileName}" });
                }
                context.Blogs.Update(blog);
                context.SaveChanges();
            }
        }
    }
}
