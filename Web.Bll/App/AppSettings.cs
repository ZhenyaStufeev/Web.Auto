using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Bll.App
{
    public class AppSettings
    {
        private static string tokenKey = "";

        static AppSettings()
        {
            tokenKey = LoadKey();
        }
        public static string Key
        {
            get => tokenKey;
        }
        public static SymmetricSecurityKey SymmetricKey()
        {
            IdentityModelEventSource.ShowPII = true;
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key));
        }

        private static string LoadKey()
        {
            //Нужно реализировать загрузку с файла json Configuration.json
            return "Sk%aUh@78KQgeeTDY!mo@gN%";
        }
    }
}
