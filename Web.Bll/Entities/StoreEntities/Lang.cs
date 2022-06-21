using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Bll.Entities.StoreEntities
{
    public class LangModelCreate
    {
        public string Key { get; set; }
        public string LangInterpretations { get; set; }
    }

    public class LangModelUpdate
    {
        public string OriginalKey { get; set; }
        public string EditedKey { get; set; }
        public string LangInterpretations { get; set; }
    }

    public class LangModelUpdatePositions
    {
        public ICollection<LangInfoToUpdatePosition> LangsInfoToUpdatePositions { get; set; }  
    }

    public class LangInfoToUpdatePosition
    {
        public string Key { get; set; }
        public int Position { get; set; }
    }

    public class DeleteLangModel
    {
        public string Key { get; set; }
    }

}
