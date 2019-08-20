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

        public bool CreatePost(RegistrationModel model, int blogId)
        {
            var blog = context.Blogs.Include(b => b.Posts).FirstOrDefault(b => b.Id == blogId);
            if (blog.Posts == null) blog.Posts = new List<PostModel>();

            blog.Posts.Add((PostModel)model);
            context.Blogs.Update(blog);
            context.SaveChanges();

            PathCRUD.AddImageToNewRegistration(model, "post");

            model.DateOfAddition = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
            model.EditingDate = model.DateOfAddition;       

            blog.EditingDate = model.DateOfAddition;
            blog.Posts.Add((PostModel)model);
            context.Blogs.Update(blog);
            context.SaveChanges();
            
            return true;
        }

        public bool DeletePost(int postId, string userName)
        {
            PostModel post = context.Posts.FirstOrDefault(p => p.Id == postId);
            if (post != null && post.Author == userName)
            {
                context.Posts.Remove(post);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool UpdatePost(PostModel model, string userName)
        {
            BlogModel blog = context.Blogs.Include(b => b.Posts).FirstOrDefault(b => b.Id == model.BlogModelId);
            if (blog != null && blog.Author == userName)
            {
                PostModel post = blog.Posts.FirstOrDefault(p => p.Id == model.Id);

                if (post == null) return false;

                post.Contents = model.Contents;
                post.Title = model.Title;

                blog.EditingDate = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
                post.EditingDate = blog.EditingDate;

                context.Blogs.Update(blog);
                context.SaveChanges();

                return true;
            }
            return false;
        }
    }
}
