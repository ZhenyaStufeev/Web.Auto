using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Web.Bll.Entities.StoreEntities
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
    }

    public class ProductSearchViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string ImagePath { get; set; }
    }

    public class ProductRequest
    {
        public IEnumerable<int> FiltersId { get; set; }
        public float MinPrice { get; set; }
        public float MaxPrice { get; set; }
        public int OrderType { get; set; }
        public int NumberOfPage { get; set; }
        public int? CategoryId { get; set; }
    }

    public class ProductSearchRequest
    {
        public string Value { get; set; }
    }

    public class ProductCartRequest
    {
        public IEnumerable<int> ProductsId { get; set; }
    }

    public class ProductInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public IEnumerable<string> ImagePathes { get; set; }
        public IEnumerable<ProductProperty> ProductProperties { get; set; }
    }

    public class ProductProperty
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
