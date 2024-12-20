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
        //options нужно для изменения кодировки unicode(для понимания кириллицы), в данном случае диапазон равен всем знакам unicode
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
        
        //добавляю новое мероприятие к текущему админу
        var adminId = HttpContext.User.Claims.FirstOrDefault(e => e.Type == ClaimTypes.Sid).Value;
        var currentAdmin = dbContext.Admins
            .ToList()
            .Where(e => e.Id.ToString() == adminId)
            .FirstOrDefault();
        currentAdmin.Records.Add(record.Id);
        
        dbContext.SaveChanges();
        return RedirectToAction("Account", "Admin", new { adminId = adminId });
    }

    [HttpPut]
    public IActionResult Update(Guid id, string name, int price, string[] employeesLogins, string address, string description)
    {
        var currentRecord = dbContext.Records.ToList().Where(e => e.Id == id).FirstOrDefault();
        if (currentRecord == null)
            return NotFound("Такой записи не найдено(");
        currentRecord.Name = name;
        currentRecord.Price = price;
        currentRecord.Address = address;
        currentRecord.Description = description;
        currentRecord.EmployeesLogins = employeesLogins;
        
        dbContext.SaveChanges();
        return Ok("Заявка успешно обновлена");
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