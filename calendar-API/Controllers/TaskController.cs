using System.Security.Claims;
using calendar_API.DTOs.TaskDto;
using calendar_API.Helpers;
using calendar_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;

namespace calendar_API.Controllers;

[ApiController]
[Route("odata/[controller]/[action]")]
[Authorize(Roles = AppRole.User)]
public class TaskController : ODataController
{
    private readonly todoappContext _context;

    public TaskController(todoappContext context)
    {
        _context = context;
    }

    [HttpGet]
    [EnableQuery]
    public async Task<ActionResult<IEnumerable<TaskResponse>>> GetTasks()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        IQueryable<TodoTask> query = _context.TodoTasks.Include(t => t.Priority)
            .Where(t => t.UserId == userId);


        var tasks = await query.Select(t => new TaskResponse
        {
            TaskId = t.TaskId,
            Title = t.Title,
            Description = t.Description,
            Date = t.Date.ToString("dd-MM-yyyy"),
            StartTime = t.StartTime,
            EndTime = t.EndTime,
            PriorityName = t.Priority.PriorityName
        }).ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("{taskId}")]
    public async Task<ActionResult<TaskResponse>> GetTaskById(int taskId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var task = await _context.TodoTasks
            .Include(t => t.Priority)
            .Where(t => t.UserId == userId && t.TaskId == taskId)
            .Select(t => new TaskResponse
            {
                TaskId = t.TaskId,
                Title = t.Title,
                Description = t.Description,
                Date = t.Date.ToString("dd-MM-yyyy"),
                StartTime = t.StartTime,
                EndTime = t.EndTime,
                PriorityName = t.Priority.PriorityName
            })
            .FirstOrDefaultAsync();

        if (task == null)
        {
            return NotFound("Task not found");
        }

        return Ok(task);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskResponse>>> GetTasksByDate(DateTime date)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);


        var tasks = await _context.TodoTasks
            .Include(t => t.Priority)
            .Where(t => t.UserId == userId && t.Date == date)
            .Select(t => new TaskResponse
            {
                TaskId = t.TaskId,
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
    public async Task<ActionResult<TodoTask>> AddTask(TaskRequest task)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            return Unauthorized("Invalid user");

        var newTask = new TodoTask
        {
            Title = task.Title,
            Description = task.Description,
            Date = DateTime.Parse(task.Date),
            StartTime = task.StartTime,
            EndTime = task.EndTime,
            PriorityId = task.PriorityId,
            UserId = userId
        };

        _context.TodoTasks.Add(newTask);
        await _context.SaveChangesAsync();

        return Ok(newTask);
    }

    [HttpPut("{taskId}")]
    public async Task<ActionResult<TaskRequest>> UpdateTask(int taskId, TaskRequest task)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            return Unauthorized("Invalid user");

        var taskToUpdate = await _context.TodoTasks
            .FirstOrDefaultAsync(t => t.TaskId == taskId && t.UserId == userId);

        if (taskToUpdate == null)
            return NotFound("Task not found");

        taskToUpdate.Title = task.Title;
        taskToUpdate.Description = task.Description;
        taskToUpdate.Date = DateTime.Parse(task.Date);
        taskToUpdate.StartTime = task.StartTime;
        taskToUpdate.EndTime = task.EndTime;
        taskToUpdate.PriorityId = task.PriorityId;

        await _context.SaveChangesAsync();

        return Ok(task);
    }

    [HttpDelete("{taskId}")]
    public async Task<ActionResult> DeleteTask(int taskId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            return Unauthorized("Invalid user");

        var taskToDelete = await _context.TodoTasks
            .FirstOrDefaultAsync(t => t.TaskId == taskId && t.UserId == userId);

        if (taskToDelete == null)
            return NotFound("Task not found");

        _context.TodoTasks.Remove(taskToDelete);
        await _context.SaveChangesAsync();

        return Ok();
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Priority>>> GetPriorities()
    {
        return await _context.Set<Priority>().ToListAsync();
    }
}