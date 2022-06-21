using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Bll.Entities.StoreEntities
{
    public class CategoryMenuView
    {
        //public CategoryMenuView()
        //{
        //    ChildCategories = new List<CategoryMenuView>();
        //}

        public int Id { get; set; }
        public string Name { get; set; }
        //public int? ParentCategoryId { get; set; }
        //public ICollection<CategoryMenuView> ChildCategories { get; set; }
    }
}
