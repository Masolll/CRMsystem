using Microsoft.AspNetCore.Mvc;
using crm.Data;
using crm.Models;

namespace crm.Controllers;

public class RecordController : Controller
{
    private readonly ApplicationContext dbContext;

    public RecordController(ApplicationContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost]
    public IActionResult Index(string recordName, int year, int month, int day, int hour, int minuts, int seconds, string masterId, string clientName)
    {
        dbContext.Records.Add(new Record(new Guid(masterId), recordName, new DateTime(year, month, day, hour, minuts, seconds),  clientName));
        dbContext.SaveChanges();
        return Ok("все супер пупер! лес гоу!");
    }
}