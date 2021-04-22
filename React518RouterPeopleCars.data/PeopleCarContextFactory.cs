using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace React518RouterPeopleCars.data
{
    public class PeopleCarContextFactory : IDesignTimeDbContextFactory<PeopleCarContext>
    {
        public PeopleCarContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}React518RouterPeopleCars.web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new PeopleCarContext(config.GetConnectionString("ConStr"));
        }
    }
}
