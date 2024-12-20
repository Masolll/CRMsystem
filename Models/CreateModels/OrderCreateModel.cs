namespace crm.Models.CreateModels;

public class OrderCreateModel
{
    public Guid RecordId { get; set; }
    public string EmployeeLogin { get; set; }
    public DateTime DateTime { get; set; }
    public string ClientName { get; set; }
    public string ClientEmail { get; set; }
    public string ClientPhone { get; set; }
    public string ClientComment { get; set; }

    public OrderCreateModel(){}
    
    public OrderCreateModel(Guid recordId, string employeeLogin, DateTime dateTime, string clientName,
        string clientEmail, string clientPhone, string clientComment)
    {
        RecordId = recordId;
        EmployeeLogin = employeeLogin;
        DateTime = dateTime;
        ClientName = clientName;
        ClientEmail = clientEmail;
        ClientPhone = clientPhone;
        ClientComment = clientComment;
    }
}