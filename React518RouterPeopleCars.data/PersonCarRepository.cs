using System;
using System.Collections.Generic;
using System.Text;
using React518RouterPeopleCars.data;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace React518RouterPeopleCars.data
{
    public class PersonCarRepository
    {
        private string _conn;
        public PersonCarRepository(string connStr)
        {
            _conn = connStr;
        }

        public List<Person> GetPeople()
        {
            using (var context  = new PeopleCarContext(_conn))
            {
                return context.People.Include(c => c.Cars).ToList();
                //return context.People.ToList();
            }
             
        }
        public Person GetPerson(int id)
        {
            using (var context = new PeopleCarContext(_conn))
            {
                return context.People.Include(p => p.Cars).FirstOrDefault(p => p.Id == id);
            }
        }

        public void AddPerson(Person p)
        {
            using (var context = new PeopleCarContext(_conn))
            {
                context.People.Add(p);
                context.SaveChanges();
            }
        }

        public void AddCar(Car c)
        {
            using (var context = new PeopleCarContext(_conn))
            {
                context.Cars.Add(c);
                context.SaveChanges();
            }
        }

        public List<Car> GetCarsByPersonId(int Id)
        {
            using(var context = new PeopleCarContext(_conn))
            {
                return context.Cars.Where(c => c.PersonId == Id).ToList() ;
            }            
        }

        public void DeleteCars(int personId)
        {
            using (var context = new PeopleCarContext(_conn))
            {
                var carsToDelete = context.Cars.Where(c => c.PersonId == personId);
                context.Cars.RemoveRange(carsToDelete);
                context.SaveChanges();
            }
        } 

    }
}
