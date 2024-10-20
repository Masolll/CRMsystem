using crm.StaticData;
using Microsoft.AspNetCore.Mvc;

namespace crm.Controllers;

public class EditFormController : Controller
{
    public IActionResult Update(int id)
    {
        return View(id);
    }

    [HttpPost]
    public string Update(int id, string newName, string newMaster, int newPrice)
    {
        FormRepository.Update(id, newName, newMaster, newPrice);
        return "Данные обновлены!";
    }

    [HttpGet]
    public IActionResult Delete()
    {
        return View();
    }

    [HttpPost]
    public string Delete(int id)
    {
        FormRepository.Delete(id);
        return "Заявка удалена";
    }
}