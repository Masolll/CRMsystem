using crm.Models.CreateModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using crm.Data;
using crm.Models;

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

    [HttpPost]
    public IActionResult Create(OrderCreateModel orderCreateModel)
    {
        dbContext.Orders.Add(new Order(orderCreateModel));
        dbContext.SaveChanges();
        return Ok("Заявка успешно создана!");
    }
}