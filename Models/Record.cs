
using System.ComponentModel.DataAnnotations.Schema;
using crm.Models.CreateModels;

namespace crm.Models;

public class Record
{
    public Guid Id { get; private set; }//asp net core требует обязателно сеттер для свойств бд, поэтому без него никак
    public string Name { get; set; }
    public int Price { get; set; }
    public string Address { get; set; }
    public string[] EmployeesLogins { get; set; }
    public string Description { get; set; }
    
    public Record()
    {
        Id = Guid.NewGuid();
    }
    
    public Record(RecordCreateModel record)
    {
        Id = Guid.NewGuid();
        Name = record.Name;
        Price = record.Price;
        Address = record.Address;
        Description = record.Description;
        EmployeesLogins = record.EmployeesLogins;
    }
}