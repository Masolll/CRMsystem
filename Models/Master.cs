namespace crm.Models;

public class Master
{
    public Guid MasterId { get; private set; }
    public string MasterName { get; set; }
    public string MasterInfo { get; set; }
    public string MasterContacts { get; set; }
    public string MasterEmail { get; set; }
    public string MasterPassword { get; set; }

    public Master()
    {
        MasterId = Guid.NewGuid();
    }

    public Master(string masterName, string masterInfo, string masterContacts, string masterEmail, string masterPassword)
    {
        MasterId = Guid.NewGuid();
        MasterName = masterName;
        MasterInfo = masterInfo;
        MasterContacts = masterContacts;
        MasterEmail = masterEmail;
        MasterPassword = masterPassword;
    }
}