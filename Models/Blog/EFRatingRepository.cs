﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MotoPasja.Models;
using Microsoft.EntityFrameworkCore;

namespace MotoPasja.Models.Blog
{
    public class EFRatingRepository : IRatingRepository
    {
        private ApplicationDbContext context;

        public EFRatingRepository(ApplicationDbContext ctx) =>
            context = ctx;    

        public bool AddRating(RatingBlogModel model, string userName)
        {
            var blog = context.Blogs.Include(b => b.Ratings).FirstOrDefault(b => b.Id == model.BlogModelId);
            if (blog.Ratings == null) blog.Ratings = new List<RatingBlogModel>();
            RatingBlogModel rating = blog.Ratings.FirstOrDefault(r => r.Author == userName);

            string data = MyDate.GetDate_ddmmrrrr_ggmm_Format();

            if (false)
            {
                rating.Rating = model.Rating;
                rating.EditingDate = data;
            }
            else
            {
                
                blog.Ratings.Add(new RatingBlogModel
                {
                    Rating = model.Rating,
                    Author = userName,
                    DateOfAddition = data,
                    EditingDate = data,
                    
                });
                blog.NumberOfRatings++;
            }

            float sum = blog.Ratings.Sum(r => r.Rating);
            blog.AverageRating = sum / blog.NumberOfRatings; 
            context.Blogs.Update(blog);
            context.SaveChanges();
            return true;
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