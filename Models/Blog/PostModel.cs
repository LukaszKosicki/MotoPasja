using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace MotoPasja.Models.Blog
{
    public class PostModel : RegistrationModel
    {
     //   [ForeignKey("BlogModelForeignKey")]
        public int BlogModelId { get; set; }
        public List<PostImage> Images { get; set; }
    }
}
