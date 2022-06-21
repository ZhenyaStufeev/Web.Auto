using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblFilterNames")]
    public class FilterName
    {
        //public FilterName()
        //{
        //    Filters = new List<Filter>();
        //    FilterNameGroups = new List<FilterNameGroup>();
        //}

        [Key]
        public int Id { get; set; }
        [Required, StringLength(maximumLength: 250)]
        public string Name { get; set; }
        public virtual ICollection<Filter> Filters { get; set; }
        public virtual ICollection<FilterNameGroup> FilterNameGroups { get; set; }
    }
}
