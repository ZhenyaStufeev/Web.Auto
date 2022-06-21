using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Bll.Utils
{
    public static class ErrorTypes
    {
        public static string NullObject => "NULL_OBJECT";
        public static string LangKeyNullOrEmpty => "LANG_KEY_IS_NULL_OR_EMPTY";
        public static string LangExists => "LANG_EXISTS";
        public static string LangHasNotBeenAdded => "LANG_HAS_NOT_BEEN_ADDED";
        public static string LangOriginalKeyNullOrEmpty => "LANG_ORIGINAL_KEY_IS_NULL_OR_EMPTY";
        public static string LangEditKeyNullOrEmpty => "LANG_EDIT_KEY_IS_NULL_OR_EMPTY";
        public static string LangDoesNotExist => "LANG_DOES_NOT_EXISTS";
        public static string NoObjectsFoundToUpdate => "NO_OBJECTS_FOUND_TO_UPDATE";
        public static string NoObjectsFoundToDelete => "NO_OBJECTS_FOUND_TO_DELETE";
    }
}
