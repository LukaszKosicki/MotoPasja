using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models;

namespace MotoPasja.Models.Blog
{
    public class RatingBlogModel : RatingModel
    {
        [ForeignKey("BlogModelForeignKey")]
        public int BlogModelId { get; set; }
    }
}
