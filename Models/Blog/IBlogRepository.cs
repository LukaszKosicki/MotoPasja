﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models.Blog;

namespace MotoPasja.Models.Blog
{
    public interface IBlogRepository
    {
        IQueryable<BlogModel> Blogs { get; }
        void CreateBlog(BlogModel model, string userName);
        bool DeleteBlog(int blogId, string userName);
        bool UpdateBlog(BlogModel model, string userName);
    }
}
