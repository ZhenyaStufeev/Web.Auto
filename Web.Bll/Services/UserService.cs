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
using System.Collections.Generic;

namespace Business_Layer_Logic.Service
{
    public class UserService : IUserService
    {
        public UserManager<ApplicationUser> userManager { get; set; }
        public RoleManager<ApplicationRole> roleManager { get; set; }
        public SignInManager<ApplicationUser> signInManager { get; set; }
        public UserService(UserManager<ApplicationUser> _mn, RoleManager<ApplicationRole> _rm, SignInManager<ApplicationUser> _sm)
        {
            userManager = _mn;
            roleManager = _rm;
            signInManager = _sm;
        }

        public async Task<ResponceResult> SignIn(LoginModel model)
        {
            ResponceResult responce = new ResponceResult();
            responce.Succeeded = false;

            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                responce.Errors.Add("Користувача не знайдено");
                return responce;
            }

            bool passIsCorrect = await userManager.CheckPasswordAsync(user, model.Password);
            if (!passIsCorrect)
            {
                responce.Errors.Add("Пароль не вірний");
                return responce;
            }

            var jwt_security_token = await CreateTokenAsync(user);

            UserCredintials u_i = new UserCredintials()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(jwt_security_token),
                ValidTime = jwt_security_token.ValidTo
            };
            responce.Succeeded = true;
            responce.Result.Add(u_i);
            return responce;
        }

        public async Task<ResponceResult> SignUp(RegisterModel model)
        {
            ResponceResult responce = new ResponceResult();
            responce.Succeeded = true;

            if (model.Email == null || model.Email.Length <= 3)
            {
                responce.Succeeded = false;
                responce.Errors.Add("E-mail є обов'язковим");
            }

            if (model.Password.Length <= 6 || model.Password == null)
            {
                responce.Succeeded = false;
                responce.Errors.Add("Пароль повинен містити більше 6 символів");
            }

            if (responce.Succeeded == false)
                return responce;

            ApplicationUser findByEmail = await userManager.FindByEmailAsync(model.Email);
            if (findByEmail != null)
            {
                responce.Succeeded = false;
                responce.Errors.Add("Такий E-mail вже зареєстрований");
            }

            if (responce.Succeeded == false)
                return responce;

            string uName = "";
            if (model.UserName.Length == 0)
            {
                foreach (char symbol in model.Email)
                {
                    if (symbol == '@')
                        break;
                    uName += symbol;
                }
            }
            else
            {
                uName = model.UserName;
            }

            ApplicationUser user = new ApplicationUser() { UserName = uName, Email = model.Email };
            IdentityResult result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                responce.Succeeded = false;
                foreach (var error in result.Errors)
                {
                    string error_str = error.Code; //+ ":  " + error.Description;
                    responce.Errors.Add(error_str);
                }
                return responce;
            }
            return responce;
        }

        private async Task<JwtSecurityToken> CreateTokenAsync(ApplicationUser user)
        {
            var userRoles = await userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSigningKey = AppSettings.SymmetricKey();

            var token = new JwtSecurityToken(
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256Signature)
                    );
            return token;
        }
    }
}
