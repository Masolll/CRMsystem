using Microsoft.EntityFrameworkCore;
using crm.Models;

namespace crm.Data;

public class ApplicationContext : DbContext
{
    public DbSet<Record> Records { get; set; } = null!;
    public DbSet<Master> Masters { get; set; } = null!;

    public ApplicationContext() => Database.EnsureCreated();
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=DESKTOP-5K5VL0B;Database=CRM;Trusted_Connection=True;TrustServerCertificate=True;");
    }
}