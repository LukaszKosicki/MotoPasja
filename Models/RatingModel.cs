using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MotoPasja.Models
{
    public class RatingModel
    {
        public int Id { get; set; }
        public float Rating { get; set; }
        public string Author { get; set; }
        public string DateOfAddition { get; set; }
        public string EditingDate { get; set; }
    }
}
