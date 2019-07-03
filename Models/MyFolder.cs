using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace MotoPasja.Models
{
    public class MyFolder
    {
        private string pathToFolder;

        public MyFolder(string path) =>
            this.pathToFolder = path;

        public void IfItDoesNotExistCreateIt()
        {
            if (!Directory.Exists(pathToFolder))
            {
                Directory.CreateDirectory(pathToFolder);
            }
        }
    }
}
