using crm.Models.CreateModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using crm.Data;
using crm.Models;
using System.Text.Json;
using System.Text.Unicode;
using System.Text.Encodings.Web;
using crm.Models.ViewModels;

namespace crm.Controllers;

public class OrderController : Controller
{
    private readonly ApplicationDbContext dbContext;

    public OrderController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    
    [HttpGet]
    public IActionResult Form(Guid recordId)
    {
        var currentRecord = dbContext.Records.FirstOrDefault(e => e.Id == recordId);
        
        if (currentRecord == null)
            return NotFound("Такой страницы не существует :(");
        
        return View(recordId);
    }

    [HttpGet]
    public string DbInfo()
    {
        var options = new JsonSerializerOptions
        {
            Encoder = JavaScriptEncoder.Create(UnicodeRanges.All),
            WriteIndented = true
        };
        return JsonSerializer.Serialize(dbContext.Orders.ToArray(), options);
    }

    [HttpPost]
    public IActionResult Create(OrderCreateModel orderCreateModel)
    {
        dbContext.Orders.Add(new Order(orderCreateModel));
        dbContext.SaveChanges();
        return Ok("Заявка успешно создана!");
    }

    [HttpPost]
    public IActionResult Finish(Guid orderId)
    {
        var searchedOrder = dbContext.Orders.FirstOrDefault(e => e.Id == orderId);
        if (searchedOrder == null)
            return NotFound("Ордера с таким id не найдено");
        searchedOrder.Finished = true;
        dbContext.SaveChanges();
        return Ok("Статус оредера изменен на 'Завершен'!");
    }
}