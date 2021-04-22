using System;
using Microsoft.EntityFrameworkCore;

namespace React518RouterPeopleCars.data
{
    public class PeopleCarContext : DbContext
    {
        private readonly string _conn;

        public PeopleCarContext(string connection)
        {
            _conn = connection;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_conn);
        }


        public DbSet<Person> People { get; set; }
        public DbSet<Car> Cars { get; set; }
    }
}
