using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MotoPasja.Models
{
    public static class MyPath
    {
        public static string GetPath(string model, string folderName)
        {
            return (Path.Combine(
                    Directory.GetCurrentDirectory(), "clientApp", "build", "images", model, folderName));
        }
    }
}
