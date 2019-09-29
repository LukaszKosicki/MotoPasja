using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MotoPasja.Models.Blog;

namespace MotoPasja.Models.Identity
{
    public class AppUser : IdentityUser
    {
        public byte[] Avatar { get; set; }
        public List<BlogModel> Blogs { get; set; }
    }
}
