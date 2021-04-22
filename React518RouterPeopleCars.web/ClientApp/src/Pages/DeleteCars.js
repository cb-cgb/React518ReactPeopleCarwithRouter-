import React from 'react';
import axios from 'axios';
import CarRow from '../Components/CarRow';

class DeleteCars extends React.Component {
    state = { 
        cars:[],
        person: {
            id: '',
            firstName: '',
            lastName: ''
        }
     }

     componentDidMount = async() => {
      await this.getPersonDetails(); //need this to pass person object to the deletecars call later. 
      const {data} = await axios.get(`/api/peoplecar/getcars?id=${this.props.match.params.personId}`);
      this.setState({cars:data});      
     }

     getPersonDetails = async() => {
        const {data} = await axios.get(`api/peoplecar/getperson?id=${this.props.match.params.personId}`);
        this.setState({person: data});
        
     }

     onClickDelete = async()=> {
         await axios.post('/api/peoplecar/delete', this.state.person);
         this.props.history.push('/');
     }

    render() { 
        const {firstName, lastName} = this.state.person;
        return ( 
           <div>
            <div className="col-md-6 offset-md-3">
                <h2 style={{textAlign:"center"}}>Delete Cars for {firstName} {lastName} </h2>
                <table className="table table-hover table-bordered table-striped" style={{marginTop:30}}>
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cars.map(c=> 
                          <CarRow key={c.Id} car={c} />                           
                         )
                        }
                    </tbody>
                </table>
                </div>

                <div className="row" style={{marginTop:20}}>
                 <div className="col-md-12" style={{textAlign:"center"}}>                 
                    <h4>Are you sure you want to delete all cars? </h4> 
                    <button className="btn btn-danger" onClick={this.onClickDelete}>Delete</button> 
                    <button className="btn btn-success" onClick={()=> {this.props.history.push('/')} }>Do Not Delete</button>
                 </div>
                </div>
                 
        </div>
            

         );
    }
}
 
export  default DeleteCars;