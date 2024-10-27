namespace crm.Models;

public class Form
{
    public Guid Id{get; set;}
    public int FormNumber{get; set;}
    public string Name {get; set;}
    public string Master {get; set;}
    public int Price {get; set;}
    public Form(string name, string master, int price)
    {
        Id = Guid.NewGuid();
        var random = new Random();
        FormNumber = random.Next(1, 1000);
        Name = name;
        Master = master;
        Price = price;
    }
}