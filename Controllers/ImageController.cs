﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using MotoPasja.Models;
using System.IO;

namespace MotoPasja.Controllers
{
    public class ImageController : Controller
    {
        public async Task<JsonResult> UploadImage()
        {
            IFormFile file = Request.Form.Files[0];
            var fileName = Request.Form["fileName"];
            var folderName = Request.Form["createTime"];
            var pathToFolder = Path.Combine(Directory.GetCurrentDirectory(),
                "clientapp/public/images/blog", folderName);

            MyFolder myFolder = new MyFolder(pathToFolder);
            myFolder.IfItDoesNotExistCreateIt();

            MyFile myFile = new MyFile(pathToFolder, fileName);
            myFile.HowTheFileExistsDelete();

            var pathToFile = Path.Combine(pathToFolder, fileName + Path.GetExtension(file.FileName));

            using (var stream = new FileStream(pathToFile, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return Json(true);
        }
    }
}