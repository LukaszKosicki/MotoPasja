using System;
using System.Collections.Generic;
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

        public void SaveBlog(BlogModel model)
        {
            if (model.Id == 0)
            {
                context.Blogs.Add(model);
            }
            context.SaveChanges();
        }
    }
}
