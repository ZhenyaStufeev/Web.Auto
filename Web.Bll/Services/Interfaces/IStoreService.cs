using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities;
using Web.Bll.Entities.StoreEntities;

namespace Web.Bll.Interfaces
{
    public interface IStoreService : IDisposable
    {
        Task<ResponceResult> GetCategories();
        Task<ResponceResult> GetFilterParams(int? categoryId);
        Task<ResponceResult> GetProductInfoByItemId(int Id);
        Task<ResponceResult> GetProducts(ProductRequest model);
        Task<ResponceResult> GetProductsByItemsId(ProductCartRequest data);
        Task<ResponceResult> SearchProducts(ProductSearchRequest data);
        Task<ResponceResult> GetRandomProducts();
        Task<ResponceResult> GetCategoryNameById(int categoryId);
    }
}
