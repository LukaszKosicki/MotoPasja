using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace MotoPasja.Models.Blog
{
    public class EFRatingRepository : IRatingRepository
    {
        private ApplicationDbContext context;

        public EFRatingRepository(ApplicationDbContext ctx) =>
            context = ctx;    

        public object AddRating(RatingBlogModel model)
        {
            var blog = context.Blogs.Include(b => b.Ratings).FirstOrDefault(b => b.Id == model.BlogModelId);
           
            RatingBlogModel rating = blog.Ratings.FirstOrDefault(r => r.AuthorId == model.AuthorId);

            if (rating != null)
            {
                rating.Rating = model.Rating;
                rating.EditingDate = DateTime.Now;
            }
            else
            {
                rating = new RatingBlogModel
                {
                    AuthorId = model.AuthorId,
                    Rating = model.Rating,
                    EditingDate = DateTime.Now,
                    DateOfAddition = DateTime.Now
                };

                blog.Ratings.Add(rating);
                blog.NumberOfRatings++;
            }

            float sum = blog.Ratings.Sum(r => r.Rating);
            blog.AverageRating = sum / blog.NumberOfRatings; 
            context.Blogs.Update(blog);
            context.SaveChanges();
            return new
            {
                blog.AverageRating,
                blog.NumberOfRatings
            };
        }

        public object DidTheUserVote(int modelId, string userId)
        {
            RatingBlogModel rating = context.BlogRatings
                .FirstOrDefault(r => r.BlogModelId == modelId && r.AuthorId == userId);

            if (rating != null)
            {
                return new
                {
                    VoteCast = true,
                    rating.Rating
                };
            }
            else
            {
                return new
                {
                    VoteCast = false
                };
            }
        }

        public float GetAverageRating(int blogId)
        {
            return (context.Blogs.FirstOrDefault(b => b.Id == blogId).AverageRating);
        }

        public int GetNumberOfRatings(int blogId)
        {
            return (context.Blogs.FirstOrDefault(b => b.Id == blogId).NumberOfRatings);
        }
    }
}
