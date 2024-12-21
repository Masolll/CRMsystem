namespace crm.Models.ViewModels;

public class EditEmployeeAdminAccountViewModel
{
    public Admin Admin { get; private set; }
    public Employee Employee { get; private set; }

    public EditEmployeeAdminAccountViewModel(Admin admin, Employee employee)
    {
        Admin = admin;
        Employee = employee;
    }
}