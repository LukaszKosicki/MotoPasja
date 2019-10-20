using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace MotoPasja.Models.Identity
{
    public class PolishIdentityErrorDescriber : IdentityErrorDescriber
    {
        public override IdentityError DuplicateEmail(string email) =>
            new IdentityError
            {
                Code = nameof(DefaultError),
                Description = $"Użytkownik o adresie e-mail {email} już istnieje!"
            };

        public override IdentityError DuplicateUserName(string userName) =>
            new IdentityError
            {
                Code = nameof(DuplicateUserName),
                Description = $"Użytkownik o nazwie {userName} już istnieje!"
            };

        public override IdentityError InvalidEmail(string email) =>
            new IdentityError
            {
                Code = nameof(InvalidEmail),
                Description = $"Format adresu e-mail {email} jest nieprawidłowy!"
            };
    }
}
