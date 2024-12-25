using crm.Models.CreateModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using crm.Data;
using crm.Models;
using System.Text.Json;
using System.Text.Unicode;
using System.Text.Encodings.Web;

namespace crm.Controllers;

public class OrderController : Controller
{
    private readonly ApplicationDbContext dbContext;

    public OrderController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    
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
}