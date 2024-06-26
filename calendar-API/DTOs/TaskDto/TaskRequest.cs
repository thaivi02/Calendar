namespace calendar_API.DTOs.TaskDto;

public class TaskRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Date { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public int PriorityId { get; set; }
}