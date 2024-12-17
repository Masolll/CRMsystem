using Microsoft.AspNetCore.Mvc;
using crm.Data;
using crm.Models;
using System.Text.Json;
using System.Text.Unicode;
using System.Text.Encodings.Web;
using crm.Models.CreateModels;

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
    public IActionResult Create(RecordCreateModel record)
    {
        dbContext.Records.Add(new Record(record));
        dbContext.SaveChanges();
        return Ok("все супер пупер! лес гоу!");
    }

    [HttpPut]
    public IActionResult Update(Guid id, string name, int price, string[] employeesLogins, string address, string description)
    {
        var updateRecord = dbContext.Records.ToList().Where(e => e.Id == id).FirstOrDefault();
        if (updateRecord == null)
            return NotFound("Такой записи не найдено(");
        updateRecord.Name = name;
        updateRecord.Price = price;
        updateRecord.EmployeesLogins = employeesLogins;
        updateRecord.Address = address;
        updateRecord.Description = description;
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