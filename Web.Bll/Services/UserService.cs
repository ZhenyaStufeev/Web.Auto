using DAL.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Interfaces;
using Web.Bll.Entities;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Web.Bll.App;
using DAL.Entities.Identity;
using System.Linq;

namespace Business_Layer_Logic.Service
{
    public class UserService : IUserService
    {
        public UserManager<ApplicationUser> UserManager { get; set; }
        public RoleManager<ApplicationRole> RoleManager { get; set; }
        public SignInManager<ApplicationUser> SignInManager { get; set; }
        public UserService(UserManager<ApplicationUser> _mn, RoleManager<ApplicationRole> _rm, SignInManager<ApplicationUser> _sm)
        {
            UserManager = _mn;
            RoleManager = _rm;
            SignInManager = _sm;
        }
       

    }
}
