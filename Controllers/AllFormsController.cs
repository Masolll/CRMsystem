using Microsoft.AspNetCore.Mvc;
using crm.StaticData;
using crm.Models;

namespace crm.Controllers;

public class AllFormsController : Controller
{
    private readonly ApplicationContext dbContext;

    public AllFormsController(ApplicationContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult Index()
    {
        var forms = dbContext.Forms.ToList();
        return View(forms);
    }
}