using crm.Data;

namespace crm.Models.ViewModels;

public class ViewModelAdminAccount
{
    public Admin Admin { get; private set; }
    public List<Employee> AllEmployees { get; private set; }
    public List<Record> AllRecords { get; set; }

    public ViewModelAdminAccount(Admin admin, List<Employee> allEmployees, List<Record> allRecords)
    {
        Admin = admin;
        AllEmployees = allEmployees;
        AllRecords = allRecords;
    }
}