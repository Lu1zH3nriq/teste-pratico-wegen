using System.ComponentModel.DataAnnotations;
using TaskManagerAPI.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string PasswordHash { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<TaskItem>? Tasks { get; set; } = new List<TaskItem>();

    
}
