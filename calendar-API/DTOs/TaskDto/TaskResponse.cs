namespace calendar_API.DTOs.TaskDto;

public class TaskResponse
{
    public int TaskId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Date { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public string PriorityName { get; set; }
}