using calendar_API.DTOs.TaskDto;
using calendar_API.Helpers;
using calendar_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace calendar_API.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class TaskController : ControllerBase
{
    private readonly todoappContext _context;

    public TaskController(todoappContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Authorize(Roles = AppRole.User)]
    public async Task<ActionResult<IEnumerable<TaskResponse>>> GetTasks(int? taskId)
    {
        IQueryable<TodoTask> query = _context.TodoTasks.Include(t => t.Priority);

        if (taskId.HasValue)
        {
            query = query.Where(t => t.TaskId == taskId.Value);
        }

        var tasks = await query.Select(t => new TaskResponse
        {
            Title = t.Title,
            Description = t.Description,
            Date = t.Date.ToString("dd-MM-yyyy"),
            StartTime = t.StartTime,
            EndTime = t.EndTime,
            PriorityName = t.Priority.PriorityName
        }).ToListAsync();

        return Ok(tasks);
    }

    [HttpGet]
    [Authorize(Roles = AppRole.User)]
    public async Task<ActionResult<IEnumerable<TaskResponse>>> GetTasksByDate(DateTime date)
    {
        var tasks = await _context.TodoTasks
            .Include(t => t.Priority)
            .Where(t => t.Date == date)
            .Select(t => new TaskResponse
            {
                Title = t.Title,
                Description = t.Description,
                Date = t.Date.ToString("dd-MM-yyyy"),
                StartTime = t.StartTime,
                EndTime = t.EndTime,
                PriorityName = t.Priority.PriorityName
            }).ToListAsync();

        return Ok(tasks);
    }

    [HttpPost]
    [Authorize(Roles = AppRole.User)]
    public async Task<ActionResult<TodoTask>> AddTask(TaskRequest task)
    {
        var newTask = new TodoTask
        {
            Title = task.Title,
            Description = task.Description,
            Date = DateTime.Parse(task.Date),
            StartTime = task.StartTime,
            EndTime = task.EndTime,
            PriorityId = task.PriorityId,
        };

        _context.TodoTasks.Add(newTask);
        await _context.SaveChangesAsync();

        
        return Ok(newTask);
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Priority>>> GetPriorities()
    {
        return await _context.Set<Priority>().ToListAsync();
    }
}