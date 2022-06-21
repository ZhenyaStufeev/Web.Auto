using DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Entities
{
    public class ApplicationUser: IdentityUser
    {
        public string DisplayName { get; set; }
        public string DisplayRole { get; set; }
    }
}
