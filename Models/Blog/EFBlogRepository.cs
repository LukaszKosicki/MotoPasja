using System;
using System.Collections.Generic;
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

        public void AddBlog(BlogModel model)
        {
            
            if (model.Id == 0)
            {
                context.Blogs.Add(model);
                context.SaveChanges();
                var pathToImages = EFBlogRepository.GetPath(model.DateOfAddition);
                var newPathToImages = EFBlogRepository.GetPath(model.Id.ToString());

                DirectoryInfo di = new DirectoryInfo(pathToImages);
                if (di.Exists)
                {
                    string[] imagesPath = Directory.GetFiles(pathToImages);
                    if (model.Images == null) model.Images = new List<BlogImage>();

                    foreach (var file in imagesPath)
                    {
                        model.Images.Add(new BlogImage
                        {
                            Alt = "p",
                            FileName = $@"images/blog/{model.Id.ToString()}/{Path.GetFileName(file)}"
                        });
                    }
                    Directory.Move(pathToImages, newPathToImages);
                }
                context.Blogs.Update(model);
                context.SaveChanges();
            }
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

        public static string GetPath(string folderName)
        {
            return (Path.Combine(
                    Directory.GetCurrentDirectory(), "clientApp", "public", "images", "blog", folderName));
        }
    }
}
