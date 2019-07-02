using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models;

namespace MotoPasja.Models.Blog
{
    public class BlogModel : RegistrationModel
    {
        public List<PostModel> Posts { get; set; }
        public List<BlogImage> Images { get; set; }
    }
}
