using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using crm.Data;
using crm.Models;
using System.Text.Json;
using System.Text.Unicode;
using System.Text.Encodings.Web;
using crm.Models.CreateModels;
using Microsoft.AspNetCore.Authorization;

namespace crm.Controllers;

public class RecordController : Controller
{
    private readonly ApplicationDbContext dbContext;

    public RecordController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet]
    public string DbInfo()
    {
        var options = new JsonSerializerOptions
        {
            Encoder = JavaScriptEncoder.Create(UnicodeRanges.All),
            WriteIndented = true
        };
        return JsonSerializer.Serialize(dbContext.Records.ToArray(), options);
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public IActionResult Create(RecordCreateModel recordCreateModel)
    {
        var record = new Record(recordCreateModel);
        dbContext.Records.Add(record);
        
        var adminId = HttpContext.User.Claims.FirstOrDefault(e => e.Type == ClaimTypes.Sid).Value;
        var currentAdmin = dbContext.Admins
            .ToList()
            .Where(e => e.Id.ToString() == adminId)
            .FirstOrDefault();
        currentAdmin.Records.Add(record.Id);
        
        dbContext.SaveChanges();
        return RedirectToAction("Account", "Admin", new { adminId = adminId });
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public IActionResult Update(Record record)
    {
        var adminId = HttpContext.User.Claims.FirstOrDefault(e => e.Type == ClaimTypes.Sid).Value;
        var currentRecord = dbContext.Records.ToList().Where(e => e.Id == record.Id).FirstOrDefault();
        if (currentRecord == null)
            return NotFound($"Записи с id {record.Id} не найдено");
        currentRecord.Name = record.Name;
        currentRecord.Price = record.Price;
        currentRecord.Address = record.Address;
        currentRecord.Description = record.Description;
        currentRecord.EmployeesLogins = record.EmployeesLogins;
        
        dbContext.SaveChanges();
        return RedirectToAction("Account", "Admin", new {adminId = adminId});
    }

    [HttpDelete]
    public IActionResult Delete(Guid id)
    {
        var removeRecord = dbContext.Records.ToList().Where(e => e.Id == id).FirstOrDefault();
        if (removeRecord == null)
            return NotFound("Такой заявки нет");
        dbContext.Records.Remove(removeRecord);
        dbContext.SaveChanges();
        return Ok("Заявка успешно удалена");
    }
}