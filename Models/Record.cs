
namespace crm.Models;

public class Record
{
    public Guid Id { get; private set; }//asp net core требует обязателно сеттер для свойств бд, поэтому без него никак
    public string Name { get; set; }
    public int Price { get; set; }
    
    public string[] EmployeesLogins { get; set; }
    
    public string Address { get; set; }
    public string Description { get; set; }
    
    

    public Record()
    {
        Id = Guid.NewGuid();
    }
    public Record(string name, int price, string[] employeesLogins, string address, string description)
    {
        Id = Guid.NewGuid();
        Name = name;
        Price = price;
        EmployeesLogins = employeesLogins;
        Address = address;
        Description = description;
    }
}