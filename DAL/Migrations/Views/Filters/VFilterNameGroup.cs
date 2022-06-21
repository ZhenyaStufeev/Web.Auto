using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Migrations.Views.Filters
{

    [Table("vFilterNameGroups")]
    public class VFilterNameGroup
    {
        [Key]
        public Guid Id { get; set; }

        public int FilterNameId { get; set; }

        [Required, StringLength(maximumLength: 250)]
        public string FilterName { get; set; }

        public int? FilterValueId { get; set; }

        [StringLength(maximumLength: 250)]
        public string FilterValue { get; set; }
    }
}
