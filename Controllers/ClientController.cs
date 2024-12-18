using Microsoft.AspNetCore.Mvc;

namespace crm.Controllers;

public class ClientController : Controller
{
    [HttpGet]
    public IActionResult Form()
    {
        return View();
    }

    [HttpGet]
    public IActionResult Confirmation()
    {
        return View();
    }
}