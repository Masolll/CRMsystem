namespace crm.Models.ViewModels;

public class AdminAccountViewModel
{
    public Admin Admin { get; private set; }
    public List<Employee> AllEmployees { get; private set; }
    public List<Record> AllRecords { get; set; }

    public AdminAccountViewModel(Admin admin, List<Employee> allEmployees, List<Record> allRecords)
    {
        Admin = admin;
        AllEmployees = allEmployees;
        AllRecords = allRecords;
    }
}