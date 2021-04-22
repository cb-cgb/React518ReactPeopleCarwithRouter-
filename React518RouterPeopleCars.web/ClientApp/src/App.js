import React from 'react';
import { Route } from 'react-router';
import PeopleTable from './Pages/PeopleTable';
import AddPerson from './Pages/AddPerson';
import AddCar from './Pages/AddCar';
import DeleteCars from './Pages/DeleteCars';



  const App=() =>  {
    return (
      <div>
        <Route exact path='/' component={PeopleTable} />
        { <Route path='/addperson' component={AddPerson} /> }
        { <Route path='/addcar/:personId' component={AddCar} /> }
        { <Route path='/delcar/:personId' component={DeleteCars}/> }
      </div>
    );
  }

export default App;
