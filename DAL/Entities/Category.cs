﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }

        //
        public int? ParentId { get; set; }

        public virtual ICollection<Category> Childrens { get; set; }
        //
        public virtual ICollection<Product> Products { get; set; }
    }
}
