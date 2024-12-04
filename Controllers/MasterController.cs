using Microsoft.AspNetCore.Mvc;
using crm.Data;
using crm.Models;

namespace crm.Controllers;

public class MasterController : Controller
{
    private readonly ApplicationDbContext dbContext;

    public MasterController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost]
    public IActionResult Index(string masterLogin, string masterPassword)
    {
        dbContext.Masters.Add(new Master(masterLogin, masterPassword));
        dbContext.SaveChanges();
        return Ok("все супер пупер! лес гоу!");
    }
}