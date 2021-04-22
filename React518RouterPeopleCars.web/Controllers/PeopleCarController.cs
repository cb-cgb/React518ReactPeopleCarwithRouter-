using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using React518RouterPeopleCars.data;

namespace React518RouterPeopleCars.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleCarController : ControllerBase
    {
        private string _conn;

        public PeopleCarController(IConfiguration configuration )
        {
            _conn = configuration.GetConnectionString("ConStr");
        }

        [Route("get")]
        public List<Person> GetPeople()
        {
            var db = new PersonCarRepository(_conn);
            return db.GetPeople();
        }

        [Route("getperson")]
        public Person GetPerson(int id)
        {
            var db = new PersonCarRepository(_conn);
            return db.GetPerson(id);
        }

        [Route("getcars")]
        public List<Car> GetCarsForPerson(int Id)
        {
            var db = new PersonCarRepository(_conn);
            return db.GetCarsByPersonId(Id);
        }

        [Route("delete")]
        [HttpPost]
        public void DeleteCars (Person p)
        {
            var db = new PersonCarRepository(_conn);
            db.DeleteCars(p.Id);
        }

        [Route("addperson")]
        [HttpPost]
        public void AddPerson(Person p)
        {
            var db = new PersonCarRepository(_conn);
            db.AddPerson(p);
        }

        [Route("addcar")]
        [HttpPost]
        public void AddCar(Car c)
        {
            var db = new PersonCarRepository(_conn);
            db.AddCar(c);
        }

    }
}
