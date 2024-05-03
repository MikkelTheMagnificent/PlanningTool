using MongoDB.Driver;
using MongoDB.Bson;

public class MongoDbService
{
    private readonly IMongoDatabase _database;

    public MongoDbService(string connectionString, string dbName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(dbName);
    }

    public IMongoCollection<BsonDocument> GetCollection(string collectionName)
    {
        return _database.GetCollection<BsonDocument>(collectionName);
    }

    public void InsertTask(string collectionName, BsonDocument task)
    {
        var collection = GetCollection(collectionName);
        collection.InsertOne(task);
    }

    public List<BsonDocument> GetTasks(string collectionName)
    {
        var collection = GetCollection(collectionName);
        return collection.Find(new BsonDocument()).ToList();
    }

    public List<BsonDocument> GetCompletedTasks()
    {
        return GetTasks("CompletedTasks");
    }
    // Additional methods for update, delete, or specific queries can be added similarly.
}
