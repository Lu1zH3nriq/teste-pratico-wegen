using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.Dtos
{
    public class UpdateTaskDto
    {
        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public bool IsCompleted { get; set; }
    }

}
