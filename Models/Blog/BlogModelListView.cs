using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MotoPasja.Models.Blog
{
    public class BlogModelListView
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string AuthorAvatar { get; set; }
        public string Title { get; set; }
        public string Contents { get; set; }
        public string DateOfLastEdition { get; set; }
        public string Miniature { get; set; }
        public float AverageRating { get; set; }

    }
}
