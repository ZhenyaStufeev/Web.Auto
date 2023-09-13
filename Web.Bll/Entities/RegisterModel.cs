using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Web.Bll.Entities
{
    public class RegisterModel
    {
        public RegisterModel()
        {
            Email = "";
            Password = "";
            UserName = "";
        }
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string UserName { get; set; }
    }
}
