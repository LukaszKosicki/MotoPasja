using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models;

namespace MotoPasja.Models.Blog
{
    public class PostImage : Image
    {
        public int PostModelId { get; set; }
    }
}
