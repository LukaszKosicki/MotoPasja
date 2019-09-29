using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MotoPasja.Models.Blog
{
    public class EFPostRepository : IPostRepository
    {
        private ApplicationDbContext context;

        public EFPostRepository(ApplicationDbContext ctx) =>
            this.context = ctx;

        public IQueryable<PostModel> Posts => context.Posts;

        public bool CreatePost(PostModel model, string mainFolder)
        {
            var blog = context.Blogs.Include(b => b.Posts).FirstOrDefault(b => b.Id == model.BlogModelId);
            if (blog.Posts == null) blog.Posts = new List<PostModel>();

            blog.Posts.Add((PostModel)model);
            context.Blogs.Update(blog);
            context.SaveChanges();

            PathCRUD.AddImageToNewRegistration(model, "post", mainFolder);

            model.DateOfAddition = DateTime.Now;
            model.EditingDate = model.DateOfAddition;       

            blog.EditingDate = model.DateOfAddition;
            blog.Posts.Add((PostModel)model);
            context.Blogs.Update(blog);
            context.SaveChanges();
            
            return true;
        }

        public bool DeletePost(int postId, string userId)
        {
            PostModel post = context.Posts.FirstOrDefault(p => p.Id == postId);
            if (post != null && post.AuthorId == userId)
            {
                context.Posts.Remove(post);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public object UpdatePost(PostModel model, string userId)
        {
            BlogModel blog = context.Blogs.Include(b => b.Posts).FirstOrDefault(b => b.Id == model.BlogModelId);
            if (blog != null && blog.AuthorId == userId)
            {
                PostModel post = blog.Posts.FirstOrDefault(p => p.Id == model.Id);

                if (post == null) return false;

                post.Contents = model.Contents;
                post.Title = model.Title;

                blog.EditingDate = DateTime.Now;
                post.EditingDate = blog.EditingDate;

                context.Blogs.Update(blog);
                context.SaveChanges();

                return new
                {
                    Success = true,
                    EditingDate = blog.EditingDate.ToString("yyyy-MM-dd hh:mm")
                };
            }
            return new
            {
                Success = false
            };
        }
    }
}
