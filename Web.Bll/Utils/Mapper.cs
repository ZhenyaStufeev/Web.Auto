using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities.StoreEntities;

namespace Web.Bll.Utils
{
    public class Mapper
    {
        public async Task<IEnumerable<ProductSearchViewModel>> MapSearchProductsAsync(IQueryable<Product> products)
        {
            return await Task.Run(() =>
            {
                List<ProductSearchViewModel> productSearchViewModels = new List<ProductSearchViewModel>();
                productSearchViewModels.AddRange(products.Select(db_product => new ProductSearchViewModel()
                {
                    Name = db_product.Name,
                    Id = db_product.Id,
                    Price = db_product.Price,
                    ImagePath = db_product.ProductImages.Select(img => img.ImageInfoOf.Path).FirstOrDefault()
                }));
                return productSearchViewModels;
            });
        }

        public async Task<IEnumerable<CategoryMenuView>> MapCategoriesAsync(IQueryable<Category> categories)
        {
            var categoriesView = await categories.Select(db_category => new CategoryMenuView()
            {
                Name = db_category.Name,
                Id = db_category.Id
            }).ToListAsync();

            return categoriesView;

        }
    }
}
