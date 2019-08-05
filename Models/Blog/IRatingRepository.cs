using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MotoPasja.Models.Blog
{
    public interface IRatingRepository
    {
        bool AddRating(RatingBlogModel model, string userName);
        float GetAverageRating(int blogId);
        int GetNumberOfRatings(int blogId);
    }
}
