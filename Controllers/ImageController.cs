using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using MotoPasja.Models;
using System.IO;
using MotoPasja.Models.Blog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using MotoPasja.Models.Identity;

namespace MotoPasja.Controllers
{
    [Authorize]
    public class ImageController : Controller
    {
        private IImageRepository imageRepository;
        private IConfiguration configuration;
        private UserManager<AppUser> userManager;

        public ImageController(IImageRepository imgRepo, IConfiguration conf, UserManager<AppUser> usrMgr)
        {
            imageRepository = imgRepo;
            configuration = conf;
            userManager = usrMgr;
        }

        public async Task UploadImage()
        {
            var modelId = Request.Form["modelId"];
            string fileName = Request.Form["fileName"];
            var model = Request.Form["model"];

            string pathToFolder = Path.Combine(Directory.GetCurrentDirectory(),
                "clientapp", configuration["RootFolder"], "images", model, modelId);

            await Image.UploadImage(Request.Form.Files[0], pathToFolder, fileName);

            int numberId;

            if (int.TryParse(modelId,out numberId))
            {
                imageRepository.AddImageToModel(numberId, fileName + Path.GetExtension(Request.Form.Files[0].FileName),
                    model, userManager.GetUserId(HttpContext.User));
            }
        }

        public void DeleteImage()
        {
            var fileName = Request.Form["fileName"];
            var modelId = Request.Form["modelId"];
            var model = Request.Form["model"];

            Image.DeleteImage(fileName, modelId, model, configuration["RootFolder"]);

            int numberId;      
            
            if (int.TryParse(modelId,out numberId))
            {
                imageRepository.DeleteImage(numberId, fileName, model, userManager.GetUserId(HttpContext.User));
            }
        }
    }
}