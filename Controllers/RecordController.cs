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
    public IActionResult Index(Guid masterId, string recordName, int year, int month, int day, int hour, int minuts, int seconds, string clientName)
    {
        dbContext.Records.Add(new Record(masterId, recordName, new DateTime(year, month, day, hour, minuts, seconds),  clientName));
        dbContext.SaveChanges();
        return Ok("все супер пупер! лес гоу!");
    }

    [HttpPut]
    public IActionResult Index(Guid recordId, Guid masterId, string recordName, int year, int month, int day, int hour, int minuts, int seconds, string clientName)
    {
        var updateRecord = dbContext.Records.ToList().Where(e => e.RecordId == recordId).FirstOrDefault();
        if (updateRecord == null)
            return NotFound("Такой заявки нет");
        else
        {
            updateRecord.MasterId = masterId;
            updateRecord.RecordName = recordName;
            updateRecord.RecordDateTime = new DateTime(year, month, day, hour, minuts, seconds);
            updateRecord.ClientName = clientName;
            dbContext.SaveChanges();
            return Ok("Заявка успешно обновлена");
        }
    }

    [HttpDelete]
    public IActionResult Index(Guid recordId)
    {
        var removeRecord = dbContext.Records.ToList().Where(e => e.RecordId == recordId).FirstOrDefault();
        if (removeRecord == null)
            return NotFound("Такой заявки нет");
        else
        {
            dbContext.Records.Remove(removeRecord);
            dbContext.SaveChanges();
            return Ok("Заявка успешно удалена");
        }
    }
}