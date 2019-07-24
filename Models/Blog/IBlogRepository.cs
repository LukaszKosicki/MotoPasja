using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models.Blog;

namespace MotoPasja.Models.Blog
{
    public interface IBlogRepository
    {
        IQueryable<BlogModel> Blogs { get; }
        void CreateBlog(BlogModel model);
        bool DeleteBlog(int blogId);
        bool UpdateBlog(BlogModel model);
    }
}
