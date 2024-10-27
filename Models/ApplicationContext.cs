using Microsoft.EntityFrameworkCore;

namespace crm.Models;

public class ApplicationContext : DbContext
{
    public DbSet<Form> Forms { get; set; } = null!;
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
        Database.EnsureCreated();   // создаем базу данных при первом обращении
    }
}