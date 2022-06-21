using DAL.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;

namespace DAL.Migrations.Seeds
{
    public static class DataSeed
    {
        // {executing_dir} заменяется на путь до директории исполняемого файла
        private static string GetExecutingScript(string SqlPath)
        {
            string codeBase = Assembly.GetExecutingAssembly().Location;
            UriBuilder uri = new(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            path = SqlPath.Replace("{executing_dir}", Path.GetDirectoryName(path));
            string baseDir = path;
            string script = File.ReadAllText(baseDir);
            return script;
        }

        public static void Initialize(ApplicationContext context, bool IsMigration = false)
        {
            bool AccessSeed = true;

            if (IsMigration == false)
            {
                Console.WriteLine("ENSURE CREATED");
                AccessSeed = context.Database.EnsureCreated(); //if database exists - return false;
            }

            if (AccessSeed == true)
            {
                context.Database.ExecuteSqlRaw(GetExecutingScript(@"{executing_dir}\Migrations\ViewFilters\vFilterNameGroups.sql"));
                context.SaveChanges();
            }
        }
    }
}
