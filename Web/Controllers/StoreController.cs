using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Web.Bll.Entities.StoreEntities;
using Web.Bll.Interfaces;

namespace Web.Controllers
{
    [EnableCors("_myAllowSpecificOrigins")]
    //[ApiController]
    [Produces("application/json")]
    [Route("api/Store")]
    public class StoreController : ControllerBase
    {
        private readonly ILogger<StoreController> _logger;
        private readonly IStoreService store;

        public StoreController(ILogger<StoreController> logger, IStoreService service)
        {
            _logger = logger;
            store = service;
        }

        [HttpGet("getfilters/{categoryId}")]
        public async Task<IActionResult> GetFilters(int? categoryId)
        {
            var res = await store.GetFilterParams(categoryId);
            return Ok(res);
        }

        [HttpGet("getfilters")]
        public async Task<IActionResult> GetFilters()
        {
            var res = await store.GetFilterParams(null);
            return Ok(res);
        }

        [HttpPost("getproducts")]
        public async Task<IActionResult> GetProducts([FromBody] ProductRequest data)
        {
            var res = await store.GetProducts(data);
            return Ok(res);
        }

        [HttpPost("searchproducts")]
        public async Task<IActionResult> SearchProducts([FromBody]ProductSearchRequest data)
        {
            var result = await store.SearchProducts(data);
            if (result.Succeeded == true)
            {
                return Ok(result);
            }
            else 
            {
                return StatusCode(500, result);
            }
        }

        [HttpGet("getmenucategories")]
        public async Task<IActionResult> GetMenuCategories()
        {
            var result = await store.GetCategories();
            if (result.Succeeded == true)
            {
                return Ok(result);
            }
            else
            {
                return StatusCode(500, result);
            }
        }

        [HttpGet("getproduct/{productId}")]
        public async Task<IActionResult> GetProduct(int productId)
        {
            var res = await store.GetProductInfoByItemId(productId);
            return Ok(res);
        }

        [HttpGet("getcategoryname/{categoryId}")]
        public async Task<IActionResult> GetCategory(int categoryId)
        {
            var res = await store.GetCategoryNameById(categoryId);
            return Ok(res);
        }

        [HttpPost("getcartproducts")]
        public async Task<IActionResult> getProductsById([FromBody] ProductCartRequest data)
        {
            var result = await store.GetProductsByItemsId(data);
            if (result.Succeeded == true)
            {
                return Ok(result);
            }
            else
            {
                return StatusCode(500, result);
            }
        }

        [HttpGet("getrandomproducts")]
        public async Task<IActionResult> GetRandomProducts()
        {
            var res = await store.GetRandomProducts();
            return Ok(res);
        }

    }
}
