using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models;

namespace MotoPasja.Models.Blog
{
    public class BlogModel : RegistrationModel
    {
        public float AverageRating { get; set; }
        public int NumberOfRatings { get; set; }
        public List<PostModel> Posts { get; set; }
        public List<BlogImage> Images { get; set; }
        public List<RatingBlogModel> Ratings {get; set;}
    }
}
