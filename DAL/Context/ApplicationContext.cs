using DAL.Entities;
using DAL.Migrations.Seeds;
using DAL.Migrations.Views.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System.IO;

namespace DAL.Context
{
    public class ApplicationFactory : IDesignTimeDbContextFactory<ApplicationContext>
    {
        public ApplicationContext CreateDbContext(string[] args)
        {
            ApplicationContext dbcontext = new(true);
            return dbcontext;
        }
    }

    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            DataSeed.Initialize(this);
        }

        public ApplicationContext(bool IsMigration) : base(DefaultConnection())
        {
            DataSeed.Initialize(this, IsMigration);
        }

        public ApplicationContext() : base(DefaultConnection())
        {
            DataSeed.Initialize(this);
        }

        public ApplicationContext(string ConnectionName) : base(DefaultConnection(ConnectionName))
        {
            DataSeed.Initialize(this);
        }

        private static DbContextOptions<ApplicationContext> DefaultConnection()
        {
            var builder = new ConfigurationBuilder();

            // установка пути к текущему каталогу
            string Path = Directory.GetCurrentDirectory() + @"\appsettings.json";
            builder.SetBasePath(Directory.GetCurrentDirectory());
            // получаем конфигурацию из файла
            builder.AddJsonFile("appsettings.json");
            // создаем конфигурацию
            var config = builder.Build();
            // получаем строку подключения
            string connectionString = config.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();

            return optionsBuilder
                .UseSqlServer(connectionString)
                        .Options;
        }

        private static DbContextOptions<ApplicationContext> DefaultConnection(string ConnectionName)
        {
            var builder = new ConfigurationBuilder();

            // установка пути к текущему каталогу
            string Path = Directory.GetCurrentDirectory() + @"\appsettings.json";
            builder.SetBasePath(Directory.GetCurrentDirectory());
            // получаем конфигурацию из файла
            builder.AddJsonFile("appsettings.json");
            // создаем конфигурацию
            var config = builder.Build();
            // получаем строку подключения
            string connectionString = config.GetConnectionString(ConnectionName);

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();

            return optionsBuilder
                .UseSqlServer(connectionString)
                        .Options;
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Category>().HasMany(p => p.Products).WithOne(p => p.CategoryOf).HasForeignKey(p => p.CategoryId).OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Category>().HasMany<Category>(m_ct => m_ct.Childrens).WithOne().HasForeignKey(key => key.ParentId).OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Product>().HasMany(p => p.Filters).WithOne().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Product>().HasMany(p => p.ProductImages).WithOne(p => p.ProductOf).HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Filter>().HasOne(p => p.FilterNameOf).WithMany(p => p.Filters).HasForeignKey(p => p.FilterNameId).OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Filter>().HasOne(p => p.FilterValueOf).WithMany(p => p.Filters).HasForeignKey(p => p.FilterValueId).OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Filter>().HasOne(p => p.ProductOf).WithMany(p => p.Filters).HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.NoAction);
            builder.Entity<FilterName>().HasMany(p => p.FilterNameGroups).WithOne(p => p.FilterNameOf).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<FilterName>().HasMany(p => p.Filters).WithOne(p => p.FilterNameOf).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<FilterValue>().HasMany(p => p.FilterNameGroups).WithOne(p => p.FilterValueOf).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<FilterValue>().HasMany(p => p.Filters).WithOne(p => p.FilterValueOf).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<FilterNameGroup>().HasOne(p => p.FilterNameOf).WithMany(p => p.FilterNameGroups).HasForeignKey(p => p.FilterNameId).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<FilterNameGroup>().HasOne(p => p.FilterValueOf).WithMany(p => p.FilterNameGroups).HasForeignKey(p => p.FilterValueId).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ProductImage>().HasOne(p => p.ImageInfoOf).WithMany(p => p.ProductImages).HasForeignKey(p => p.ImageInfoId).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ProductImage>().HasOne(p => p.ProductOf).WithMany(p => p.ProductImages).HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.NoAction);
            builder.Entity<ImageInfo>().HasMany(p => p.ProductImages).WithOne(p => p.ImageInfoOf).OnDelete(DeleteBehavior.NoAction);

            base.OnModelCreating(builder);
        }
        public DbSet<FilterName> FilterNames { get; set; }
        public DbSet<FilterValue> FilterValues { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Filter> Filters { get; set; }
        public DbSet<FilterNameGroup> FilterNameGroups { get; set; }
        public DbSet<VFilterNameGroup> VFilterNameGroups { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<ImageInfo> ImagesInfo { get; set; }
        public DbSet<Category> Categories { get; set; }

    }
}