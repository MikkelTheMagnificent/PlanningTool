using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Portfolio.Services;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private readonly MongoDbService _mongoDbService;

        public TasksController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        [HttpPost]
        [Route("add")]
        public IActionResult AddTask([FromBody] TaskModel task)
        {
            var bsonTask = new BsonDocument
            {
                { "taskName", task.Name },
                { "taskStatus", task.Status },
                { "taskColor", task.Color },
                { "taskDue", task.DueDate }
            };

            _mongoDbService.InsertTask("Tasks", bsonTask);

            return Ok(task);
        }

        [HttpGet]
        [Route("all")]
        public IActionResult GetAllTasks()
        {
            try
            {
                var activeTasks = _mongoDbService.GetTasks("Tasks").Select(t => new {
                    Name = t.Contains("taskName") ? t["taskName"].AsString : string.Empty,
                    Status = t.Contains("taskStatus") ? t["taskStatus"].AsString : string.Empty,
                    Color = t.Contains("taskColor") ? t["taskColor"].AsString : string.Empty,
                    DueDate = t.Contains("taskDue") ? t["taskDue"].AsBsonDateTime.ToUniversalTime() : DateTime.MinValue
                }).ToList();

                var completedTasks = _mongoDbService.GetCompletedTasks().Select(t => new {
                    Name = t.Contains("taskName") ? t["taskName"].AsString : string.Empty,
                    Status = t.Contains("taskStatus") ? t["taskStatus"].AsString : string.Empty,
                    Color = t.Contains("taskColor") ? t["taskColor"].AsString : string.Empty,
                    DueDate = t.Contains("taskDue") ? t["taskDue"].AsBsonDateTime.ToUniversalTime() : DateTime.MinValue
                }).ToList();

                return Ok(new { activeTasks, completedTasks });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }

    public class TaskModel
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public string Color { get; set; }
        public DateTime DueDate { get; set; }
    }
}

