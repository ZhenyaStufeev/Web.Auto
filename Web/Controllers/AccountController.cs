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
        IUserService UserService { get; set; }
        public AccountController(IUserService us)
        {
            UserService = us;
        }

    }
}