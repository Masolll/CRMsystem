using crm.Models;

namespace crm.StaticData;

public static class FormRepository
{
    public static List<Form> AllForms {get; set;} = new List<Form>();

    public static void Update(int id, string newName, string newMaster, int newPrice)
    {
        var targetForm = AllForms.Where(e => e.id == id).First();
        targetForm.name = newName;
        targetForm.master = newMaster;
        targetForm.price = newPrice;
    }

    public static void Delete(int id)
    {
        AllForms = AllForms.Where(e => e.id != id).ToList();
    }
}