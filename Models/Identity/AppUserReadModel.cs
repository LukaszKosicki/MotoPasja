using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MotoPasja.Models.Identity
{
    public class AppUserReadModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public byte[] Avatar { get; set; }
    }
}
