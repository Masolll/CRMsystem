
namespace crm.Models;

public class Record
{
    public Guid RecordId { get; private set; }//asp net core требует обязателно сеттер для полей бд, поэтому без него никак
    public Guid MasterId { get; set; }
    public string RecordName { get; set; }
    public DateTime RecordDateTime { get; set; }
    public string ClientName { get; set; }

    public Record()
    {
        RecordId = Guid.NewGuid();
    }
    public Record(Guid masterId, string recordName, DateTime recordDateTime,  string clientName)
    {
        RecordId = Guid.NewGuid();
        RecordName = recordName;
        RecordDateTime = recordDateTime;
        MasterId = masterId;
        ClientName = clientName;
    }
}