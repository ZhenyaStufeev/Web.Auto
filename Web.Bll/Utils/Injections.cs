
using Business_Layer_Logic.Service;
using DAL.Context;
using DAL.Entities;
using DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Interfaces;
using Web.Bll.Services;
using Web.Bll.Services.Interfaces;

namespace Web.Bll.Utils
{
    public class Configuration
    {
        public string ConnectionsString { get; set; }
        public string LoggingPath { get; set; }
    }

    public class Injections
    {
        IServiceCollection Services { get; set; }
        Configuration Configuration { get; set; }
        //Logger Logger { get; set; }
        public Injections(IServiceCollection services)
        {
            this.Services = services;
            Configuration = LoadConfiguration();
            //Logger = new Logger(Configuration.LoggingPath);
            LoadInjections();
        }

        public void LoadInjections()
        {
            Services.AddDbContext<ApplicationContext>(options => ConfigureOptions(options));

            Services.AddIdentity<ApplicationUser, IdentityRole>()
                    .AddEntityFrameworkStores<ApplicationContext>()
                    .AddDefaultTokenProviders();

            Services.AddIdentityCore<ApplicationUser>()
                    .AddRoles<ApplicationRole>()
                    .AddClaimsPrincipalFactory<UserClaimsPrincipalFactory<ApplicationUser, IdentityRole>>()
                    .AddEntityFrameworkStores<ApplicationContext>()
                    .AddDefaultTokenProviders()
                    .AddSignInManager<ApplicationSignInManager>();

            Services.AddScoped<IUserService, UserService>();
            Services.AddScoped<IStoreService, StoreService>();
            Services.AddScoped<HttpClient, HttpClient>();
            Services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            
            Services.AddSignalR();
            Services.AddHostedService<SignalRHost>();
            //Services.AddSingleton(Logger);
            Services.AddScoped<IDebugService, DebugService>();
        }

        private static Configuration LoadConfiguration()
        {
            string current_dir = Directory.GetCurrentDirectory();
            var builder = new ConfigurationBuilder();
            builder.SetBasePath(current_dir);
            builder.AddJsonFile(@"appsettings.json");
            var config = builder.Build();
            Configuration configuration = new()
            {
                ConnectionsString = config.GetConnectionString("DefaultConnection"),
                LoggingPath =
                config.GetSection("Logging")
                .GetChildren()
                .FirstOrDefault(p => p.Key == "LogFolderPath").Value
                .Replace("{current_dir}", current_dir)
            };
            return configuration;
        }

        private DbContextOptionsBuilder ConfigureOptions(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.ConnectionsString);
            //options.EnableSensitiveDataLogging(true);
            //options.LogTo(Logger.LogAsync, LogLevel.Information);
            return options;
        }

    }
}
