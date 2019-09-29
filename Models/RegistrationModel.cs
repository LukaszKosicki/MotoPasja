using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MotoPasja.Models.Identity;

namespace MotoPasja.Models
{
    public class RegistrationModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Contents { get; set; }
        public string AuthorId { get; set; }
        public DateTime DateOfAddition { get; set; }
        public DateTime EditingDate { get; set; }
    }
}
