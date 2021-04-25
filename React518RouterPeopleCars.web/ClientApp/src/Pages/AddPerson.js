import React from 'react';
import axios from 'axios';
import {produce} from 'immer';

class PersonRow extends React.Component {
    state = { 
        person: {
            firstName: '',
            lastName: '',
            age: ''
        }
     }

     onTextChange = e => {
         const nextState = produce(this.state, draft => {
             draft.person[e.target.name] = e.target.value;
                          
         })
         this.setState(nextState);
     }

     onClickAdd = async() => {
      await axios.post('/api/peoplecar/addperson', {...this.state.person, age: +this.state.person.age});
      this.props.history.push('/');
     }
     
    render() { 
        const {firstName, lastName, age } = this.state.person;
        const isMissingData = (firstName ==='' || lastName===''|| age==='');

        return ( 
            <div style={{ minHeight: 1000, paddingTop: 300 }}>
                

                <div className="col-md-6 offset-3">                  
                  <h1 style={{textAlign:"center"}}>New Person</h1>
                  
                  <div className="row jumbotron" style={{marginTop:30}}>
                    
                    <input type="text" className="form-control" placeholder="First Name" value={firstName}
                     onChange={this.onTextChange}  
                     name="firstName"   
                     />                     
                     <br/>
                     <input type="text" className="form-control" placeholder="Last Name" value={lastName}
                      onChange={this.onTextChange}
                      name="lastName" 
                      />
                      <br/>
                      <input type="text" className="form-control" placeholder="Age" value={age}
                       onChange={this.onTextChange}
                       name="age"
                      />
                      <br/>
                      <br/>
                      
                       <button disabled={isMissingData} className="btn btn-success  btn-block" onClick={this.onClickAdd}>Add</button>
                      

                     
                  </div> 
                  
                </div>
                

            </div>

         );
    }
}
 
export default PersonRow ;
