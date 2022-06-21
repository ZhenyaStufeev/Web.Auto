using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblFilterNameGroups")]
    public class FilterNameGroup
    {
        public int Id { get; set; }
        //[Column(Order = 0)]
        public int? FilterNameId { get; set; }
        public virtual FilterName FilterNameOf { get; set; }

        //[Column(Order = 1)]
        public int? FilterValueId { get; set; }
        public virtual FilterValue FilterValueOf { get; set; }
    }
}