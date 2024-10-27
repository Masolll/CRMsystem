using crm.Models;

namespace crm.StaticData;

public static class FormRepository
{
    public static List<Form> AllForms {get; set;} = new List<Form>();

    public static void Update(int formNumber, string newName, string newMaster, int newPrice)
    {
        var targetForm = AllForms.Where(e => e.FormNumber == formNumber).First();
        targetForm.Name = newName;
        targetForm.Master = newMaster;
        targetForm.Price = newPrice;
    }

    public static void Delete(int formNumber)
    {
        AllForms = AllForms.Where(e => e.FormNumber != formNumber).ToList();
    }
}