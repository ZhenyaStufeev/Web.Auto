using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Web.Bll.Entities
{
    public class LoginModel
    {
        public LoginModel()
        {
            Email = "";
            Password = "";
        }
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}