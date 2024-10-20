using Microsoft.AspNetCore.Mvc;
using crm.StaticData;

namespace crm.Controllers;

public class AllFormsController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        return View(StaticData.FormRepository.AllForms);
    }
}