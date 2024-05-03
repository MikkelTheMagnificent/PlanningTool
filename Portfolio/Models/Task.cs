namespace Portfolio.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Status { get; set; }
        public string? color { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? CompletionDate { get; set; }
    }
}
