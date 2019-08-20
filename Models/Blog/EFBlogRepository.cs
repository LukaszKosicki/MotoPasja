using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MotoPasja.Models.Blog
{
    public class EFBlogRepository : IBlogRepository
    {
        private ApplicationDbContext context;

        public EFBlogRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public IQueryable<BlogModel> Blogs => context.Blogs;

        public void CreateBlog(BlogModel model, string userName)
        {
            model.Author = userName;

            //pierwszy zapis bloga, w celu uzyskania ID
            context.Blogs.Add(model);
            context.SaveChanges();

            PathCRUD.AddImageToNewRegistration(model, "blog");
            
            //aktualizacja dat w modelu bloga
            model.DateOfAddition = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
            model.EditingDate = model.DateOfAddition;

            //zapis finalny
            context.Blogs.Update(model);
            context.SaveChanges();   
        }

        public bool DeleteBlog(int blogId, string userName)
        {
            BlogModel blog = context.Blogs.FirstOrDefault(b => b.Id == blogId);
            if (blog.Author == userName)
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

        public bool UpdateBlog(BlogModel model, string userName)
        {
            var blog = context.Blogs.FirstOrDefault(b => b.Id == model.Id);
            if (blog != null && blog.Author == userName)
            {
                blog.EditingDate = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
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
