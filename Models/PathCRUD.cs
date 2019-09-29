using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models.Blog;
using MotoPasja.Models;

namespace MotoPasja.Models
{
    public class PathCRUD
    {
        public static void AddImageToNewRegistration(RegistrationModel model, string registrationName, string mainFolder)
        {
            BlogModel blog = model as BlogModel;
            PostModel post = model as PostModel;

            string modelName;

            if (blog != null) modelName = "blog";
            else if (post != null) modelName = "post";
            else modelName = "error";

            //pozyskanie ścieżki do folderu, w którym znajdują się tymczasowo zdjęcia, oraz ścieżki docelowej
            var pathToImages = MyPath.GetPath(mainFolder, modelName, model.DateOfAddition.ToString().Replace(':', ';'));
            var newPathToImages = MyPath.GetPath(mainFolder, modelName, model.Id.ToString());
          
            //sprawdzanie czy zdjęcia zostały dodane
            DirectoryInfo di = new DirectoryInfo(pathToImages);
            if (di.Exists)
            {
                // jeśli są dodane, to pobiera ścieżki do zdjęć
                string[] imagesPath = Directory.GetFiles(pathToImages);

                if (blog != null)
                {
                    blog = (BlogModel)model;
                    if (blog.Images == null) blog.Images = new List<BlogImage>();

                    foreach (var file in imagesPath)
                    {
                        blog.Images.Add(new BlogImage
                        {
                            Alt = "a",
                            Src = $@"images/{registrationName}/{model.Id.ToString()}/{Path.GetFileName(file)}"
                        });
                    }
                } 
                else if (post != null)
                {
                    post = (PostModel)model;
                    if (post.Images == null) post.Images = new List<PostImage>();

                    foreach (var file in imagesPath)
                    {
                        post.Images.Add(new PostImage
                        {
                            Alt = "a",
                            Src = $@"images/post/{model.Id.ToString()}/{Path.GetFileName(file)}"
                        });
                    }
                }
                //przenoszenie zdjęć do docelowego katalogu
                Directory.Move(pathToImages, newPathToImages);
            }
        }
    }
}
