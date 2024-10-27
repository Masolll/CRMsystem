using Microsoft.AspNetCore.Mvc;
using crm.StaticData;
using crm.Models;

namespace crm.Controllers;

public class FormController : Controller
{
    private readonly ApplicationContext dbContext;

    public FormController(ApplicationContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost]
    public IActionResult Create(string name, string master, int price)
    {
        dbContext.Forms.Add(new Form(name, master, price));
        dbContext.SaveChanges();
        return Ok("Форма отправлена!");
    }

    [HttpPut]
    public IActionResult Update(Guid id, string name, string master, int price)
    {
        var targetForm = dbContext.Forms.Find(id);
        if(targetForm is null) 
        {
            return NotFound("Такого пользователя нет");
        }
        targetForm.Name = name;
        targetForm.Master = master;
        targetForm.Price = price;
        dbContext.SaveChanges();
        return Ok("Данные обновлены!");
    }

    [HttpDelete]
    public IActionResult Delete(Guid id)
    {
        var removeItem = dbContext.Forms.Find(id);
        if (removeItem is null)
        {
            return NotFound("Такого пользователя нет");
        }
        dbContext.Forms.Remove(removeItem);
        dbContext.SaveChanges();
        return Ok("Заявка удалена");
    }
}