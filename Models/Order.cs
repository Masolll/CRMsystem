using crm.Models.CreateModels;

namespace crm.Models;

public class Order
{
    public Guid Id { get; private set; }
    public Guid RecordId { get; set; }
    public string EmployeeLogin { get; set; }
    public DateTime DateTime { get; set; }
    public string ClientName { get; set; }
    public string ClientEmail { get; set; }
    public string ClientPhone { get; set; }
    public string ClientComment { get; set; }
    public bool Finished { get; set; }

    public Order()
    {
        Id = Guid.NewGuid();
    }
    
    public Order(OrderCreateModel order)
    {
        Id = Guid.NewGuid();
        RecordId = order.RecordId;
        EmployeeLogin = order.EmployeeLogin;
        DateTime = order.DateTime;
        ClientName = order.ClientName;
        ClientEmail = order.ClientEmail;
        ClientPhone = order.ClientPhone;
        ClientComment = order.ClientComment;
        Finished = false;
    }
}