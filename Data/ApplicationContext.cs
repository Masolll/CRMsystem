using Microsoft.EntityFrameworkCore;
using crm.Models;

namespace crm.Data;

public class ApplicationContext : DbContext
{
    public DbSet<Record> Records { get; set; } = null!;
    public DbSet<Master> Masters { get; set; } = null!;

    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
        Database.EnsureCreated();   // создаем базу данных при первом обращении
    }
}