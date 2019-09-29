using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace MotoPasja.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Src { get; set; }
        public string Alt { get; set; }

        public static async Task UploadImage(IFormFile file, string pathToFolder, string fileName)
        {
            MyFolder myFolder = new MyFolder(pathToFolder);
            myFolder.IfItDoesNotExistCreateIt();

            MyFile myFile = new MyFile(pathToFolder, fileName);
            myFile.HowTheFileExistsDelete();

            var pathToFile = Path.Combine(pathToFolder, fileName + Path.GetExtension(file.FileName));

            using (var stream = new FileStream(pathToFile, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }

        public static void DeleteImage(string fileName, string modelId, string modelName, string rootFolder)
        {
            var pathToFolder = Path.Combine(Directory.GetCurrentDirectory(), "clientApp", rootFolder, "images",
                modelName, modelId);

            MyFile myFile = new MyFile(pathToFolder, fileName);
            myFile.HowTheFileExistsDelete();
        }
    }
}
