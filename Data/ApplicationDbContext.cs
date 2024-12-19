using Microsoft.EntityFrameworkCore;
using crm.Models;

namespace crm.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<Record> Records { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Admin> Admins { get; set; }

    public ApplicationDbContext() => Database.EnsureCreated();
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //подключение для ssms
        // optionsBuilder.UseSqlServer("Server=DESKTOP-5K5VL0B;Database=CRM;Trusted_Connection=True;TrustServerCertificate=True;");
        //для vds и ноута
        optionsBuilder.UseMySql("server=localhost;user=root;password=firstvds123;database=crm;", 
            new MySqlServerVersion(new Version(8, 0, 40)));
    }
    
}