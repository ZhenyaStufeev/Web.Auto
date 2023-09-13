using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Bll.Entities;
using Web.Bll.Interfaces;

namespace Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : ControllerBase
    {
        IUserService userService { get; set; }
        public AccountController(IUserService us)
        {
            userService = us;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var res = await userService.SignIn(login);
            if (res.Succeeded)
                return Ok(res);
            else
                return StatusCode(401, res);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> register([FromBody] RegisterModel reg)
        {
            var res = await userService.SignUp(reg);
            if (res.Succeeded)
                return Ok(res);
            else
                return StatusCode(400, res);
        }
    }
}