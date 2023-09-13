
using DAL.Context;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Bll.Entities;
using Web.Bll.Entities.StoreEntities;
using Web.Bll.Interfaces;
using Web.Bll.Utils;

namespace Web.Bll.Services
{
    public class StoreService : IStoreService
    {
        readonly ApplicationContext db;
        private int SearchLimit = 5; //Вивести в файл конфігурації
        private int MaxRandomProducts = 5;
        public StoreService(ApplicationContext db)
        {
            this.db = db;
        }
        public async Task<ResponceResult> GetProducts(ProductRequest model)
        {
            ResponceResult responce = new ResponceResult() { Succeeded = true };

            IQueryable<Product> query = db.Products;

            if (model.CategoryId != null)
            {
                query = query.Include(p => p.CategoryOf).Where(p => p.CategoryId == model.CategoryId);
            }

            double maxPrice = await query.MaxAsync(p => p.Price);
            double minPrice = await query.MinAsync(p => p.Price);

            if (model.MaxPrice != model.MinPrice && model.MaxPrice != 0)
                query = query.Where(p => p.Price >= model.MinPrice && p.Price <= model.MaxPrice);

            if (model.FiltersId.Any()) //Якщо є вхідні фільтри
            {
                IEnumerable<FNameViewModel> FilterList = GetFilters(); //Отримати всі фільтри (Query);
                foreach (FNameViewModel fName in FilterList)
                {
                    int Count_FilterGroup = 0; //Кількість співпадніть у групі фільтрів
                    var Predicate = PredicateBuilder.False<Product>();
                    foreach (var fVale in fName.Childrens)
                    {
                        foreach (var FilterId in model.FiltersId)
                        {
                            var ValueId = fVale.Id;
                            if (FilterId == ValueId)
                            {
                                Predicate = Predicate
                                    .Or(p => p.Filters
                                    .Any(filter => filter.FilterValueId == ValueId));

                                Count_FilterGroup++;
                            }
                        }
                    }

                    if (Count_FilterGroup != 0)
                    {
                        query = query.Where(Predicate);
                    }
                }
            }

            int countOfItems = await query.CountAsync();
            var selector = new Selector(model.NumberOfPage, countOfItems, 24).CalculateSelector(); //static shown items
            query = SortProductsByPrice(query, model.OrderType);
            query = query.Skip(selector.BeginCount).Take(selector.ItemsCount);


            var returningProducts = query.Include(p => p.ProductImages).Select(fProducts => new ProductViewModel
            {
                Id = fProducts.Id,
                Name = fProducts.Name,
                Price = fProducts.Price,
                Description = fProducts.Description,
                ImagePath = fProducts.ProductImages.Select(p => p.ImageInfoOf.Path).FirstOrDefault()
            });
            var data_responce = new { ProductList = returningProducts, totalPages = selector.TotalPages, totalProducts = countOfItems, priceSelector = new { minPrice, maxPrice } };
            responce.Result.Add(data_responce);
            return responce;
        }
        public async Task<ResponceResult> GetProductInfoByItemId(int Id)
        {
            ResponceResult responceResult = new ResponceResult() { Succeeded = true };
            var productQuery = await db.Products.Include(p => p.ProductImages).ThenInclude(imagePath => imagePath.ImageInfoOf).FirstOrDefaultAsync(p => p.Id == Id);

            ProductInfo sProduct = new()
            {
                Id = productQuery.Id,
                Name = productQuery.Name,
                ImagePathes = productQuery.ProductImages.Select(p => p.ImageInfoOf.Path),
                Price = productQuery.Price,
                Description = productQuery.Description
            };

            var filterQuery = db.Filters.Where(f => f.ProductId == Id)
                                        .Include(f => f.FilterValueOf)
                                        .Include(f => f.FilterNameOf);


            sProduct.ProductProperties = await filterQuery.Select(f => new ProductProperty()
            {
                Name = f.FilterNameOf.Name,
                Value = f.FilterValueOf.Name
            }).ToListAsync();
            responceResult.Result.Add(sProduct);
            return responceResult;
        }
        public async Task<ResponceResult> GetProductsByItemsId(ProductCartRequest data)
        {
            ResponceResult responceResult = new() { Succeeded = false };
            if (data == null)
            {
                responceResult.Errors.Add("Data is null");
                return responceResult;
            }
            else
            {
                responceResult.Succeeded = true;
            }
            IEnumerable<int> productsId = data.ProductsId;
            List<ProductViewModel> p_w = new List<ProductViewModel>();
            if (productsId != null)
            {
                if (productsId.Any())
                {
                    p_w = await db.Products
                        .Include(p => p.ProductImages)
                        .ThenInclude(p => p.ImageInfoOf)
                        .Where(p => productsId.Any(id => id == p.Id)).Select(p => new ProductViewModel
                        {
                            Name = p.Name,
                            Id = p.Id,
                            ImagePath = p.ProductImages.FirstOrDefault().ImageInfoOf.Path,
                            Price = p.Price,
                        }).ToListAsync();
                }
            }
            responceResult.Result.AddRange(p_w);
            return responceResult;
        }
        public async Task<ResponceResult> SearchProducts(ProductSearchRequest data)
        {
            ResponceResult responceResult = new ResponceResult() { Succeeded = false };
            if (data == null && string.IsNullOrEmpty(data.Value))
            {
                responceResult.Errors.Add("Вхідні параметри пусті");
                return responceResult;
            }
            string search_input = data.Value;
            string normalized_input = search_input.ToLower();
            try
            {
                IQueryable<Product> query = db.Products
                    .Where(p => p.Name
                    .ToLower()
                    .Contains(normalized_input))
                    .Take(SearchLimit)
                    .Include(p => p.ProductImages)
                    .ThenInclude(p => p.ImageInfoOf);

                responceResult.Succeeded = true;
                responceResult.Result.AddRange(await new Mapper().MapSearchProductsAsync(query));
                return responceResult;
            }
            catch (Exception ex)
            {
                responceResult.Errors.Add("System: " + ex.Message);
                return responceResult;
            }
        }
        public async Task<ResponceResult> GetFilterParams(int? categoryId)
        {
            ResponceResult responce = new ResponceResult();
            List<FNameViewModel> ordered_list = new List<FNameViewModel>();
            List<FNameViewModel> old = new();
            if (categoryId != null)
            {
                int c_id = (int)categoryId;
                old.AddRange(GetFiltersByCategoryId(c_id));
            }
            else
            {
                old.AddRange(GetFilters());
            }

            foreach (var f in old)
            {
                var fName = f;
                var ordered_fValues = f.Childrens.OrderBy(p => p.Name);
                fName.Childrens = ordered_fValues.ToList();
                ordered_list.Add(f);
            }
            responce.Result.AddRange(ordered_list);
            responce.Succeeded = true;
            return responce;
        }
        private IEnumerable<FNameViewModel> GetFiltersByCategoryId(int categoryId)
        {
            var query =
                db.Filters
                .Include(p => p.ProductOf)
                .AsQueryable()
                .Where(filter => filter.FilterValueId != null
                    && filter.ProductOf.CategoryId == categoryId)
                .Select(filter => new
                {
                    FNameId = filter.FilterNameId,
                    FName = filter.FilterNameOf.Name,
                    FValueId = filter.FilterValueId,
                    FValue = filter.FilterValueOf.Name
                })
                .Distinct();

            var groupNames = query.AsEnumerable().GroupBy(filter => (new { Id = filter.FNameId, Name = filter.FName }))
                                .OrderBy(x => x.Key.Name);

            List<FNameViewModel> FilterList = new();

            foreach (var filterName in groupNames)
            {
                FNameViewModel node = new()
                {
                    Id = (int)filterName.Key.Id,
                    Name = filterName.Key.Name
                };

                node.Childrens = filterName
                    .GroupBy(f => new FValueViewItem { Id = f.FValueId, Name = f.FValue })
                    .Select(f => f.Key)
                    .ToList();

                FilterList.Add(node);
            }

            return FilterList;
        }
        public async Task<ResponceResult> GetCategories()
        {
            ResponceResult responceResult = new ResponceResult() { Succeeded = true };
            var categories = db.Categories.Where(p => p.ParentId == null); //Всі категорії, які є батьківськіми
            var viewCategories = await new Mapper().MapCategoriesAsync(categories);
            responceResult.Result.AddRange(viewCategories);
            return responceResult;
        }
        public async Task<ResponceResult> GetRandomProducts()
        {
            var responce = new ResponceResult() { Succeeded = true };

            var query = db.Products
                .Include(p => p.ProductImages)
                        .ThenInclude(p => p.ImageInfoOf);

            var SelectedPost = query.OrderBy(x => Guid.NewGuid()).Take(5);

            var products = await SelectedPost.Select(p => new ProductViewModel
            {
                Name = p.Name,
                Id = p.Id,
                ImagePath = p.ProductImages.FirstOrDefault().ImageInfoOf.Path,
                Price = p.Price,
            }).ToListAsync();
            responce.Result.AddRange(products);
            return responce;
        }
        public async Task<ResponceResult> GetCategoryNameById(int categoryId)
        {
            ResponceResult responce = new ResponceResult() { Succeeded = true };
            var db_category = await db.Categories.FirstOrDefaultAsync(p => p.Id == categoryId);
            var res_category = db_category.Name;
            responce.Result.Add(res_category);
            return responce;
        }
        private IQueryable<Product> SortProductsByPrice(IQueryable<Product> FilteredProducts, int sortType)
        {
            switch (sortType)
            {
                case 1:
                    {
                        return FilteredProducts.OrderByDescending(p => p.Price);
                    }
                case 2:
                    {
                        return FilteredProducts.OrderBy(p => p.Price);
                    }
                default:
                    {
                        return FilteredProducts;
                    }
            }
        }
        private IEnumerable<FNameViewModel> GetFilters()
        {
            var query = db.VFilterNameGroups
            .AsQueryable()
            .Where(filter => filter.FilterValueId != null)
            .Select(filter => new
            {
                FNameId = filter.FilterNameId,
                FName = filter.FilterName,
                FValueId = filter.FilterValueId,
                FValue = filter.FilterValue
            });

            var groupNames = query.AsEnumerable().GroupBy(filter => (new { Id = filter.FNameId, Name = filter.FName }))
                                .OrderBy(x => x.Key.Name);

            List<FNameViewModel> FilterList = new();

            foreach (var filterName in groupNames)
            {
                FNameViewModel node = new()
                {
                    Id = filterName.Key.Id,
                    Name = filterName.Key.Name
                };

                node.Childrens = filterName
                    .GroupBy(f => new FValueViewItem { Id = f.FValueId, Name = f.FValue })
                    .Select(f => f.Key)
                    .ToList();

                FilterList.Add(node);
            }

            return FilterList;
        }

        #region Dispose
        bool disposed = false;
        // Public implementation of Dispose pattern callable by consumers.
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                // Free any other managed objects here.
            }

            // Free any unmanaged objects here.
            disposed = true;
        }
        ~StoreService()
        {
            Dispose(false);
        }
        #endregion
    }
}
