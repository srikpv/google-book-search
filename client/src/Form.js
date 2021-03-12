import React, { Component } from 'react'
import API from "./utils/API";

class Form extends Component {
    constructor(){
        super();
        this.state = {
            fullName : '',
            username : '',
            email : '',
            password : ''
        };
        this.changeInput = this.changeInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }    

    changeInput(event){
        this.setState({
            fullName : (event.target.name === 'fullName' ? event.target.value : this.state.fullName),
            username : (event.target.name === 'username' ? event.target.value : this.state.username),
            email : (event.target.name === 'email' ? event.target.value : this.state.email),
            password : (event.target.name === 'password' ? event.target.value : this.state.password),
        });
    }

    onSubmit(event){
        event.preventDefault();
        const registered = {
            fullName : this.state.fullName,
            username : this.state.username,
            email : this.state.email,
            password : this.state.password,
        }
        
        API.postUserInfo(registered)
        .then(res => console.log(res));

        this.setState({
            fullName : '',
            username : '',
            email : '',
            password : ''
        });
    }

    render(){
        return (
            <div>
                <div className='container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type='text' name='fullName' placeholder='Full Name' onChange={this.changeInput} value={this.state.fullName} className='form-control form-group' />
                            <input type='text' name='username' placeholder='User Name' onChange={this.changeInput} value={this.state.username} className='form-control form-group' />
                            <input type='text' name='email' placeholder='email' onChange={this.changeInput} value={this.state.email} className='form-control form-group' />
                            <input type='password' name='password' placeholder='password' onChange={this.changeInput} value={this.state.password} className='form-control form-group' />
                            <input type="submit" className='btn btn-danger btn-block' value="Submit"  />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form;