using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Drawing;
using MotoPasja.Models.Identity;
using Microsoft.EntityFrameworkCore;

namespace MotoPasja.Models.Blog
{
    public class EFBlogRepository : IBlogRepository
    {
        private ApplicationDbContext context;
        private AppIdentityDbContext identityContext;

        public EFBlogRepository(ApplicationDbContext context, AppIdentityDbContext identityContext)
        {
            this.context = context;
            this.identityContext = identityContext;
        }

        public IQueryable<BlogModel> Blogs => context.Blogs;
        
        public BlogModelReadView Blog(int blogId)
        {
            return context.Blogs.Include(b => b.Images).ToList()
                .Join(identityContext.Users,
                blog => blog.AuthorId,
                user => user.Id,
                (blog, user) => new BlogModelReadView
                {
                    Id = blog.Id,
                    NumberOfRating = blog.NumberOfRatings,
                    Title = blog.Title,
                    Contents = blog.Contents,
                    Author = user.UserName,
                    AuthorAvatar = user.Avatar != null ? $"data:image/png;base64,{Convert.ToBase64String(user.Avatar)}" : "icons/user.png",
                    DateOfLastEdition = blog.DateOfAddition.ToString(),
                    DateOfAddition = blog.DateOfAddition.ToString(),
                    AverageRating = blog.AverageRating,
                    Images = blog.Images != null ? blog.Images : new List<BlogImage>()
                }
                ).FirstOrDefault(b => b.Id == blogId);
        }
        
        public void CreateBlog(BlogModel model, string mainFolder)
        {
            //pierwszy zapis bloga, w celu uzyskania ID
            context.Blogs.Add(model);
            context.SaveChanges();

            PathCRUD.AddImageToNewRegistration(model, "blog", mainFolder);

            //aktualizacja dat w modelu bloga
            model.DateOfAddition = DateTime.Now;
            model.EditingDate = model.DateOfAddition;

            //zapis finalny
            context.Blogs.Update(model);
            context.SaveChanges();   
        }

        public bool DeleteBlog(int blogId, string authorId)
        {
            BlogModel blog = context.Blogs.FirstOrDefault(b => b.Id == blogId);
            if (blog.AuthorId == authorId)
            {
                context.Blogs.Remove(blog);
                context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool UpdateBlog(BlogModel model, string authorId)
        {
            var blog = context.Blogs.FirstOrDefault(b => b.Id == model.Id);
            if (blog != null && blog.AuthorId == authorId)
            {
                blog.EditingDate = DateTime.Now;
                blog.Contents = model.Contents;
                blog.Title = model.Title;

                context.Blogs.Update(blog);
                context.SaveChanges();

                return true;
            }
            return false;
        }
    }
}
