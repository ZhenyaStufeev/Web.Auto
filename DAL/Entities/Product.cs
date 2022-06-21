using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblProducts")]
    public class Product
    {
        //public Product()
        //{
        //    DateCreate = DateTime.Now;
        //}
        [Key]
        public int Id { get; set; }
        [Required, StringLength(maximumLength: 250)]
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "DATETIME2")]
        public DateTime DateCreate { get; set; }
        public virtual ICollection<Filter> Filters { get; set; }
        public string Description { get; set; }
        public virtual ICollection<ProductImage> ProductImages { get; set; }
        public int? CategoryId { get; set; }
        public virtual Category CategoryOf { get; set; }
    }
}
