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
        bool CreatePost(PostModel model, string mainFolder);
        bool DeletePost(int postId, string userId);
        object UpdatePost(PostModel model, string userId);
    }
}
