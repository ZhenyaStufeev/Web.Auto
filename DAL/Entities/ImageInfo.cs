using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{

    public class ImageInfo
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public virtual ICollection<ProductImage> ProductImages { get; set; }
    }
}
