using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using MotoPasja.Models;
using System.IO;
using MotoPasja.Models.Blog;
using Microsoft.EntityFrameworkCore;

namespace MotoPasja.Controllers
{
    public class ImageController : Controller
    {
        private IImageRepository repository;

        public ImageController(IImageRepository repo, IBlogRepository blogRepo)
        {
            this.repository = repo;
        }

        public async Task UploadImage()
        {
            var modelId = Request.Form["modelId"];
            var fileName = Request.Form["fileName"];
            var model = "blog";

            await Image.UploadImage(Request.Form.Files[0], fileName , modelId);

            int numberId;

            if (int.TryParse(modelId,out numberId))
            {
                repository.AddImageToModel(numberId, fileName + Path.GetExtension(Request.Form.Files[0].FileName), model);
            }
        }

        public void DeleteImage()
        {
            var fileName = Request.Form["fileName"];
            var modelId = Request.Form["modelId"];
            var model = Request.Form["model"];
            Image.DeleteImage(fileName, modelId, model);

            int numberId;      
            
            if (int.TryParse(modelId,out numberId))
            {
                repository.DeleteImage(numberId, fileName, model);
            }
        }
    }
}