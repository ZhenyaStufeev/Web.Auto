using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Bll.Services.Interfaces;

//namespace Web.Controllers
//{
//    [Produces("application/json")]
//    [Route("api/debug")]
//    public class DebugController : ControllerBase
//    {
//        IDebugService debugService;
//        public DebugController(IDebugService debug_service)
//        {
//            debugService = debug_service;
//        }

//        [HttpPost("execute")]
//        public async Task<IActionResult> GetWarehousesNova([FromBody]ModelQuery sql)
//        {
//            var res = await debugService.SendQueryAsync(sql.Query);
//            return Ok(res);
//        }
//    }

//    public class ModelQuery
//    {
//        public string Query { get; set; }
//    }

//}
