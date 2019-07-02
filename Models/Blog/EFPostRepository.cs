using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MotoPasja.Models.Blog
{
    public class EFPostRepository : IPostRepository
    {
        private ApplicationDbContext context;

        public EFPostRepository(ApplicationDbContext ctx) =>
            this.context = ctx;

        public IQueryable<PostModel> Posts => context.Posts;
    }
}
