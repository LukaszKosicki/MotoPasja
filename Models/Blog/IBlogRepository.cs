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
        Task CreateBlog(BlogModel model, string mainFolder);
        bool DeleteBlog(int blogId, string authorId);
        bool UpdateBlog(BlogModel model, string authorId);
    }
}
