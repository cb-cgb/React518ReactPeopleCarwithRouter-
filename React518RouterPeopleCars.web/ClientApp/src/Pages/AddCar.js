import React from 'react';
import {produce} from 'immer';
import axios from 'axios';

class AddCar extends React.Component {
    state = { 
        person: {
            firstName:'',
            lastName:''
        },
        car: {
            make: '',
            model: '',
            year: '',
            personId: ''
        }
    }
    
    componentDidMount =async()=> {
        const {data} = await axios.get(`/api/peoplecar/getperson?id=${this.props.match.params.personId}`)
        await this.setState({person:data})
        console.log(this.state.person);
    }

    onTextChange=e=> {
      const nextState = produce(this.state, draft=> {
        draft.car[e.target.name]= e.target.value;
       })
       this.setState(nextState);
    }

    onClickAdd=async()=> {
        const {year} = this.state.car;
        const {id} = this.state.person;

        await axios.post('/api/peoplecar/addcar', {...this.state.car, year: +year, personId: id });
        this.props.history.push('/');
    }

     
    render() {
        const {id,firstName,lastName} = this.state.person;
        const {make,model,year} = this.state.car;
        const isMissingData = (make==='' || model==='' || year==='');

        return ( 
            <div className="container">
                <div className="col-md-6 offset-md-3">
                    <h2 style={{textAlign:"center"}}>Add Car for {firstName} {lastName}</h2>
                    
                    <div className="row jumbotron" style={{marginTop:20}}>
                        <input type="text" className="form-control" value={make} placeholder="Make" 
                         onChange={this.onTextChange} 
                         name="make" 
                         />
                         <br/>
                         <input type="text" className="form-control" value={model} placeholder="Model" 
                         onChange={this.onTextChange} 
                         name="model" 
                         />
                         <br/>
                         <input type="text" className="form-control" value={year} placeholder="Year" 
                         onChange={this.onTextChange} 
                         name="year" 
                         />
                         <br/>
                         <br/>
                         <button disabled={isMissingData} className="btn btn-success btn-block" 
                           onClick={this.onClickAdd}>Add!</button>
                    </div>
                </div>

            </div>

         );
    }
}
 
export default AddCar;