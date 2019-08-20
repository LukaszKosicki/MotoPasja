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

        public void DeleteImage(int modelId, string fileName, string model, string userName)
        {
            if(model == "blog")
            {
                var blog = context.Blogs.Include(b => b.Images).FirstOrDefault(b => b.Id == modelId);
                if (blog != null && blog.Author == userName)
                {
                    blog.EditingDate = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
                    blog.Images.Remove(blog.Images.FirstOrDefault(i => i.FileName.IndexOf(fileName) != -1));
                    context.Blogs.Update(blog);
                    context.SaveChanges();
                }
            }
            else if (model == "post")
            {
                var post = context.Posts.Include(p => p.Images).FirstOrDefault(p => p.Id == modelId);
                if (post != null && post.Author == userName)
                {
                    var blog = context.Blogs.Include(b => b.Posts).ThenInclude(p => p.Images).FirstOrDefault(b => b.Id == post.BlogModelId);
                    blog.EditingDate = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
                    post = blog.Posts.FirstOrDefault(p => p.Id == modelId);
                    post.Images.Remove(post.Images.FirstOrDefault(i => i.FileName.IndexOf(Path.GetFileNameWithoutExtension(fileName)) != -1));
                    context.Blogs.Update(blog);
                    context.SaveChanges();
                }
            }
        }

        public void AddImageToModel(int modelId, string fileName, string model, string userName)
        {
            if (model == "blog")
            {
                var blog = context.Blogs.Include(b => b.Images).FirstOrDefault(b => b.Id == modelId);
                
                if (blog != null && blog.Author == userName)
                {
                    blog.EditingDate = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
                    if (blog.Images == null) blog.Images = new List<BlogImage>();
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
            else if (model == "post")
            {
                var post = context.Posts.Include(p => p.Images).FirstOrDefault(p => p.Id == modelId);
                if (post != null && post.Author == userName)
                {
                    var blog = context.Blogs.Include(b => b.Posts).FirstOrDefault(b => b.Id == post.BlogModelId);
                    blog.EditingDate = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));

                    if (post.Images == null) post.Images = new List<PostImage>();
                    var img = post.Images.FirstOrDefault(i => i.FileName.IndexOf(Path.GetFileNameWithoutExtension(fileName)) != -1);
                    if (img != null)
                    {
                        img.FileName = $@"images/{model}/{modelId}/{fileName}";
                    }
                    else
                    {
                        post.Images.Add(new PostImage { Alt = "", FileName = $@"images/{model}/{modelId}/{fileName}" });
                    }
                    blog.Posts.FirstOrDefault(p => p.Id == modelId).Images = post.Images;
                    context.Blogs.Update(blog);
                    context.SaveChanges();
                }

            }
        }
    }
}
