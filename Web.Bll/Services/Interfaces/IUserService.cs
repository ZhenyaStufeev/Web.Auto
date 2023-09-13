using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities;

namespace Web.Bll.Interfaces
{
    public interface IUserService
    {
        Task<ResponceResult> SignIn(LoginModel model);
        Task<ResponceResult> SignUp(RegisterModel model);
    }
}
