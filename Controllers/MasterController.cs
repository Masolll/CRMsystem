using Microsoft.AspNetCore.Mvc;
using crm.Data;
using crm.Models;

namespace crm.Controllers;

public class MasterController : Controller
{
    private readonly ApplicationContext dbContext;

    public MasterController(ApplicationContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost]
    public IActionResult Index(string masterEmail, string masterPassword)
    {
        dbContext.Masters.Add(new Master(masterEmail, masterPassword));
        dbContext.SaveChanges();
        return Ok("все супер пупер! лес гоу!");
    }
}