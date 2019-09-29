using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace MotoPasja.Models.Blog
{
    public interface IImageRepository
    {
        void DeleteImage(int modelId, string fileName, string model, string userId);
        void AddImageToModel(int modelId, string fileName, string model, string userName);
    }
}
