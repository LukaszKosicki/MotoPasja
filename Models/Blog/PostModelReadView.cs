using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MotoPasja.Models.Blog
{
    public class PostModelReadView
    {
        public int Id { get; set; }
        public int BlogModelId { get; set; }
        public string Title { get; set; }
        public string Contents { get; set; }
        public string DateOfAddition { get; set; }
        public string EditingDate { get; set; }

        public List<PostImage> Images {get; set;}
    }
}
