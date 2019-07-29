using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models;

namespace MotoPasja.Models.Blog
{
    public interface IPostRepository
    {
        IQueryable<PostModel> Posts { get; }
        bool CreatePost(RegistrationModel model, int blogId);
        bool DeletePost(int postId);
        bool UpdatePost(PostModel model);
    }
}
