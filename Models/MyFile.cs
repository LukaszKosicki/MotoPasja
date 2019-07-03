using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace MotoPasja.Models
{
    public class MyFile
    {
        private string pathToFolder;
        private string fileName;

        public MyFile(string path, string fileName)
        {
            this.pathToFolder = path;
            this.fileName = fileName;
        }

        public void HowTheFileExistsDelete()
        {
            foreach(var file in Directory.GetFiles(pathToFolder))
            {
                if (Path.GetFileName(file).IndexOf(fileName) != -1)
                {
                    System.IO.File.Delete(file);
                }
            }
        }

    }
}
