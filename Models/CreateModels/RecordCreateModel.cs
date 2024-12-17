namespace crm.Models.CreateModels;

public class RecordCreateModel
{
    public string Name { get; set; }
    public int Price { get; set; }
    
    public string[] EmployeesLogins { get; set; }
    
    public string Address { get; set; }
    public string Description { get; set; }
    
    public RecordCreateModel()
    {
    }
    
    public RecordCreateModel(string name, int price, string[] employeesLogins, string address, string description)
    {
        Name = name;
        Price = price;
        EmployeesLogins = employeesLogins;
        Address = address;
        Description = description;
    }
}