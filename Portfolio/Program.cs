using Portfolio.Configuration;
using Portfolio.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

// Load MongoDB settings from appsettings.json
var mongoDbSettings = builder.Configuration.GetSection("MongoDbSettings").Get<MongoDbSettings>();

// Register MongoDbService with dependency injection
builder.Services.AddSingleton<MongoDbService>(sp => new MongoDbService(mongoDbSettings.ConnectionString, mongoDbSettings.DatabaseName));

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.MapGet("/", context => {
    context.Response.Redirect("/Pages/planner.html");
    return Task.CompletedTask;
});

app.UseAuthorization();

app.MapControllers();
app.MapRazorPages();

app.Run();
