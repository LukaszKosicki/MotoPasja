using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MotoPasja.Models.Blog
{
    public interface IRatingRepository
    {
        object AddRating(RatingBlogModel model);
        object DidTheUserVote(int modelId, string userId);
        float GetAverageRating(int blogId);
        int GetNumberOfRatings(int blogId);
    }
}
