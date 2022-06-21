using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class ProductImage
    {
        public int Id { get; set; }

        public virtual Product ProductOf { get; set; }
        public int? ProductId { get; set; }

        public virtual ImageInfo ImageInfoOf { get; set; }
        public int? ImageInfoId { get; set; }
    }
}
