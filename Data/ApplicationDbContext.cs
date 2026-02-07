using Microsoft.EntityFrameworkCore;
using crm.Models;

namespace crm.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<Record> Records { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Admin> Admins { get; set; }
    public DbSet<Order> Orders { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        Database.EnsureCreated();
    }
}