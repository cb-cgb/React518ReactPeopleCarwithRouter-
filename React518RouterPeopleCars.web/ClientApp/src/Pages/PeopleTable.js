import React from 'react';
import axios from 'axios';
import PersonRow from '../Components/PersonRow';
import { Link } from 'react-router-dom';

class PeopleTable  extends React.Component {
    state = 
      {
          people: [],
          searchText: '',
      }

      componentDidMount = () => {
        this.refreshTable();
      }

      refreshTable = async() => {
        const response=await axios.get('/api/peoplecar/get');
        this.setState({people: response.data})
       } 
      
       onTextChange =  e =>  {
           this.setState({searchText: e.target.value});       
       }    
    
    
    render() { 
        return (
            <div className="container" style={{marginTop:30}}>
                <Link to ='/addperson' >
                    <button className="btn btn-info block-lg" style={{marginBottom:20}}>Add Person</button>
                </Link>
                   
                  
                  <input type="text" className="form-control" placeholder="Search Name" style={{width:200}}
                     value={this.state.searchText}
                     onChange={this.onTextChange}
                    />        
                
                    <table className="table table-bordered table-hover table-striped" style={{marginTop:10}}>
                     <thead>
                         <tr>
                             <th>First Name</th>
                             <th>Last Name</th>
                             <th>Age</th>
                             <th># of Cars</th>
                             <th>Add Cars</th>
                             <th>Delete Cars</th>
                         </tr>
                     </thead>
                     <tbody>
                         
                         {this.state.people.filter(
                             p=> `${p.firstName.toLowerCase()} ${p.lastName.toLowerCase()}`. includes(this.state.searchText.toLowerCase() ))
                             .map( p=> <PersonRow person={p} key={p.Id} /> )                                                  
                         }
                     </tbody>
                    </table>
                   
                </div>
              );
    }
}
 
export default PeopleTable;