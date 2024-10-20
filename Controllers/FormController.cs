using Microsoft.AspNetCore.Mvc;
using crm.StaticData;
using crm.Models;

namespace crm.Controllers;

public class FormController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public string Index(string name, string master, int price)
    {
        FormRepository.AllForms.Add(new Form(name, master, price));
        return "Ваша форма успешно отправлена";
    }
}