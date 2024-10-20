namespace crm.Models;

public class Form
{
    public int id{get; set;}
    public string name {get; set;}
    public string master {get; set;}
    public int price {get; set;}
    public Form(string name, string master, int price)
    {
        var random = new Random();
        this.id = random.Next(1, 1000);
        this.name = name;
        this.master = master;
        this.price = price;
    }
}