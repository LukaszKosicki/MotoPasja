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

            //pozyskanie ścieżki do folderu, w którym znajdują się tymczasowo zdjęcia, oraz ścieżki docelowej
            var pathToImages = EFBlogRepository.GetPath(model.DateOfAddition);
            var newPathToImages = EFBlogRepository.GetPath(model.Id.ToString());

            //sprawdzanie czy zdjęcia zostały dodane
            DirectoryInfo di = new DirectoryInfo(pathToImages);
            if (di.Exists)
            {
                // jeśli są dodane, to pobiera ścieżki do zdjęć
                string[] imagesPath = Directory.GetFiles(pathToImages);
                if (model.Images == null) model.Images = new List<BlogImage>();

                //zapis ścieżek w bezie danych
                foreach (var file in imagesPath)
                {
                    model.Images.Add(new BlogImage
                    {
                        Alt = "a",
                        FileName = $@"images/blog/{model.Id.ToString()}/{Path.GetFileName(file)}"
                    });
                }
                //przenoszenie zdjęć do docelowego katalogu
                Directory.Move(pathToImages, newPathToImages);
            }

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

        public static string GetPath(string folderName)
        {
            return (Path.Combine(
                    Directory.GetCurrentDirectory(), "clientApp", "public", "images", "blog", folderName));
        }
    }
}
