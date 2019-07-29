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

        public void CreateBlog(BlogModel model)
        {
            //Po wprowadzeniu kont użytkowników należy zastąpić nickiem zarejestrowanego użytkownika
            model.Author = "GalAnonim";

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

        public bool DeleteBlog(int blogId)
        {
            try
            {
                context.Blogs.Remove(context.Blogs.FirstOrDefault(b => b.Id == blogId));
                context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool UpdateBlog(BlogModel model)
        {
            var blog = context.Blogs.FirstOrDefault(b => b.Id == model.Id);
            if (blog != null)
            {
                blog.EditingDate = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
                blog.Contents = model.Contents;
                blog.Title = model.Title;
                try
                {
                    context.Blogs.Update(blog);
                    context.SaveChanges();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
            return false;
        }
    }
}
