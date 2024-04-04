'use client'
import React, { Component } from 'react'
import { ImportsNotUsedAsValues } from 'typescript';
 
 export class page extends Component {
    constructor(props){
        super(props);
        this.state={
            symp1:'',
            symp2:'',
            symp3:'',
            symp4:'',
            symp5:''
        };
    }
    handleSymp1 = (event) =>{
        this.setState({symp1:event.target.value})
    }
    handleSymp2 = (event) =>{
        this.setState({symp2:event.target.value})
    }
    handleSymp3 = (event) =>{
        this.setState({symp3:event.target.value})
    }
    handleSymp4 = (event) =>{
        this.setState({symp4:event.target.value})
    }
    handleSymp5 = (event) =>{
        this.setState({symp5:event.target.value})
    }
    handlePlus

   render() {
    const {symp1, symp2, symp3,symp4, symp5} = this.state
     return (
        <form>
            <div>
                <ul>
                    <li>
                    <label>Symptom1</label><input 
                                                type="text"
                                                value={symp1}
                                                onChange={this.handleSymp1}/> <button onClick={this.handlePlus}>+</button>
                                                    
                    </li>
                    <li>
                    <label>Symptom2</label><input 
                                                type="text"
                                                value={symp2}
                                                onChange={this.handleSymp2}/> <button>+</button>
                                                    
                    </li>
                    <li>
                    <label>Symptom3</label><input 
                                                type="text"
                                                value={symp3}
                                                onChange={this.handleSymp3}/> <button>+</button>
                                                    
                    </li>
                    <li>
                    <label>Symptom4</label><input 
                                                type="text"
                                                value={symp4}
                                                onChange={this.handleSymp4}/> <button>+</button>
                                                    
                    </li>
                    <li>
                    <label>Symptom5</label><input 
                                                type="text"
                                                value={symp5}
                                                onChange={this.handleSymp5}/> <button>+</button>
                                                             
                    </li>
                
            
            
            
            
                </ul>
            

            </div>
        </form>
       
     )
   }
 }
 
 export default page
