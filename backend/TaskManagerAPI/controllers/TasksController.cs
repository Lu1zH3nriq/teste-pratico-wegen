using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskManagerAPI.dbConfig;
using TaskManagerAPI.Models;
using TaskManagerAPI.Dtos;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskDbContext _context;

    public TasksController(TaskDbContext context)
    {
        _context = context;
    }

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

    private IActionResult CustomResponse(int statusCode, string message, object? data)
    {
        return StatusCode(statusCode, new
        {
            status = statusCode,
            message,
            data
        });
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        int userId = GetUserId();
        var tasks = await _context.TaskItems
            .Where(t => t.UserId == userId)
            .ToListAsync();

        return CustomResponse(200, "Tarefas recuperadas com sucesso.", tasks);
    }

    [HttpGet("categoria/{categoria}")]
    public async Task<IActionResult> GetByCategoria(string categoria)
    {
        int userId = GetUserId();
        var tasks = await _context.TaskItems
            .Where(t => t.UserId == userId && t.Category.ToLower() == categoria.ToLower())
            .ToListAsync();

        return CustomResponse(200, $"Tarefas da categoria '{categoria}' recuperadas com sucesso.", tasks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        int userId = GetUserId();
        var task = await _context.TaskItems
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (task == null)
            return CustomResponse(404, "Tarefa não encontrada ou não pertence ao usuário.", null);

        return CustomResponse(200, "Tarefa encontrada.", task);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask(CreateTaskDto taskDto)
    {
        int userId = GetUserId(); // já está implementado

        var task = new TaskItem
        {
            Title = taskDto.Title,
            Description = taskDto.Description,
            Category = taskDto.Category,
            IsCompleted = taskDto.IsCompleted,
            UserId = userId
        };

        _context.TaskItems.Add(task);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateTaskDto updatedTask)
    {
        int userId = GetUserId();

        var task = await _context.TaskItems
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (task == null)
            return CustomResponse(404, "Tarefa não encontrada ou não pertence ao usuário.", null);

        task.Title = updatedTask.Title;
        task.Description = updatedTask.Description;
        task.Category = updatedTask.Category;
        task.IsCompleted = updatedTask.IsCompleted;
        task.UpdatedAt = DateTime.UtcNow;

        _context.TaskItems.Update(task);
        await _context.SaveChangesAsync();

        return CustomResponse(200, "Tarefa atualizada com sucesso.", task);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        int userId = GetUserId();
        var task = await _context.TaskItems
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (task == null)
            return CustomResponse(404, "Tarefa não encontrada ou não pertence ao usuário.", null);

        _context.TaskItems.Remove(task);
        await _context.SaveChangesAsync();

        return CustomResponse(204, "Tarefa deletada com sucesso.", null);
    }
}
