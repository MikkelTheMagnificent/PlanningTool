using MongoDB.Bson;
using Portfolio.Services;

namespace Portfolio.Services
{
    public class TaskManager
    {

        private readonly MongoDbService _dbService;

        public TaskManager(string connectionString, string dbName)
        {
            _dbService = new MongoDbService(connectionString, dbName);
        }


        public void AddTask(string taskName, string status, string color, DateTime dueDate)
        {
            var taskDoc = new BsonDocument
        {
            { "TaskName", taskName },
            { "Status", status },
            { "Color", color },
            { "DueDate", dueDate }
        };

            _dbService.InsertTask("Tasks", taskDoc);
        }

        public List<BsonDocument> GetAllTasks()
        {
            return _dbService.GetTasks("Tasks");
        }
    }
}

