using Microsoft.EntityFrameworkCore;
using crm.Models;

namespace crm.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<Record> Records { get; set; }
    public DbSet<Master> Masters { get; set; }
    public DbSet<Admin> Admins { get; set; }

    public ApplicationDbContext() => Database.EnsureCreated();
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // optionsBuilder.UseSqlServer("Server=DESKTOP-5K5VL0B;Database=CRM;Trusted_Connection=True;TrustServerCertificate=True;");
        optionsBuilder.UseMySql("server=localhost;user=root;password=mysql123;database=crm;", 
            new MySqlServerVersion(new Version(8, 0, 40)));
    }
}