//using DAL.Context;
//using DAL.Entities;
//using DALPrev.Context;
//using DALPrev.Entities;
using DAL.Context;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Web.Bll.Entities.StoreEntities;
using Web.Bll.Interfaces;
using Web.Bll.Services;
using Web.Bll.Utils;

namespace Test
{
    class Program
    {
        static async Task Main(string[] args)
        {
            ApplicationContext local_db = new ApplicationContext();
            //Update.DisableIdentityInsert<Product>(local_db);

            List<int> temp = new List<int>() { 215, 216 };

            int Count_FilterGroup = 0; //Кількість співпадніть у групі фільтрів
            var predicate = PredicateBuilder.False<Filter>();

            //foreach (var term in temp)
            //    predicate = predicate.Or(x => x.FilterValueId == term);

            //var a = local_db.Products.Include(p => p.Filters).Where(p => p.Name.Contains("Accelera")
            //    && predicate);

            //foreach (var t in a)
            //{
            //    t.CategoryId = 3;
            //}

            //local_db.Products.UpdateRange(a);

            //Update.EnableIdentityInsert<Product>(local_db);
            //Update.SaveChangesWithIdentityInsert<Product>(local_db);
        }

        static void UpdateImages()
        {
            var rand = new Random();
            ApplicationContext ct = new ApplicationContext();
            string image_path = "/AppData/images/";

            foreach (var a in ct.Products)
            {
                a.ProductImages = new List<ProductImage>();
                int num_of_image = rand.Next(1, 11);
                a.ProductImages.Add(new ProductImage() { ImageInfoOf = new ImageInfo() { Path = image_path + num_of_image.ToString() } });
                ct.Update(a);
            }
            ct.SaveChanges();
        }

    }
}
