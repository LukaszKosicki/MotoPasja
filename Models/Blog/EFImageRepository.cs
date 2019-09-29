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

        public void DeleteImage(int modelId, string fileName, string model, string userId)
        {
            if(model == "blog")
            {
                var blog = context.Blogs.Include(b => b.Images).FirstOrDefault(b => b.Id == modelId);
                if (blog != null && blog.AuthorId == userId)
                {
                    blog.EditingDate = DateTime.Now;
                    blog.Images.Remove(blog.Images.FirstOrDefault(i => i.Src.IndexOf(fileName) != -1));
                    context.Blogs.Update(blog);
                    context.SaveChanges();
                }
            }
            else if (model == "post")
            {
                var post = context.Posts.Include(p => p.Images).FirstOrDefault(p => p.Id == modelId);
                if (post != null && post.AuthorId == userId)
                {
                    var blog = context.Blogs.Include(b => b.Posts).ThenInclude(p => p.Images).FirstOrDefault(b => b.Id == post.BlogModelId);
                    blog.EditingDate = DateTime.Now;
                    post = blog.Posts.FirstOrDefault(p => p.Id == modelId);
                    post.Images.Remove(post.Images.FirstOrDefault(i => i.Src.IndexOf(Path.GetFileNameWithoutExtension(fileName)) != -1));
                    context.Blogs.Update(blog);
                    context.SaveChanges();
                }
            }
        }

        public void AddImageToModel(int modelId, string fileName, string model, string userId)
        {
            if (model == "blog")
            {
                var blog = context.Blogs.Include(b => b.Images).FirstOrDefault(b => b.Id == modelId);
                
                if (blog != null && blog.AuthorId == userId)
                {
                    blog.EditingDate = DateTime.Now;
                    if (blog.Images == null) blog.Images = new List<BlogImage>();
                    var img = blog.Images.FirstOrDefault(i => i.Src.IndexOf(Path.GetFileNameWithoutExtension(fileName)) != -1);
                    if (img != null)
                    {
                        img.Src = $@"images/{model}/{modelId}/{fileName}";
                    }
                    else
                    {
                        blog.Images.Add(new BlogImage { Alt = "", Src = $@"images/{model}/{modelId}/{fileName}" });
                    }
                    context.Blogs.Update(blog);
                    context.SaveChanges();
                }
            }
            else if (model == "post")
            {
                var post = context.Posts.Include(p => p.Images).FirstOrDefault(p => p.Id == modelId);
                if (post != null && post.AuthorId == userId)
                {
                    var blog = context.Blogs.Include(b => b.Posts).FirstOrDefault(b => b.Id == post.BlogModelId);
                    blog.EditingDate = DateTime.Now;

                    if (post.Images == null) post.Images = new List<PostImage>();
                    var img = post.Images.FirstOrDefault(i => i.Src.IndexOf(Path.GetFileNameWithoutExtension(fileName)) != -1);
                    if (img != null)
                    {
                        img.Src = $@"images/{model}/{modelId}/{fileName}";
                    }
                    else
                    {
                        post.Images.Add(new PostImage { Alt = "", Src = $@"images/{model}/{modelId}/{fileName}" });
                    }
                    blog.Posts.FirstOrDefault(p => p.Id == modelId).Images = post.Images;
                    context.Blogs.Update(blog);
                    context.SaveChanges();
                }

            }
        }
    }
}
