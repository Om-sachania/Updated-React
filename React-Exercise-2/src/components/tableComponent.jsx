import React, { Component } from 'react';

class TableComponent extends Component {
    constructor() {
        super();
        this.state = {
            rows: [],
            firstName: '',
            lastName: '',
            editIndex : null,
        };
    }

    checkDuplicate(rows,firstName,lastName){
        let duplicate = rows.find((row)=>row.firstName == firstName && row.lastName == lastName);
        if(duplicate){
            return true;
        }
        else{
            return false;
        }
    }
    addRow=()=>{
        let {rows,firstName,lastName} =this.state
        firstName = firstName.trim();
        lastName = lastName.trim();
    
        if(firstName && lastName){
            if (this.checkDuplicate(rows,firstName,lastName)) {
                alert('Row Already Exists!!!');
                this.setState({
                    firstName : '',
                    lastName : ''
                })
            } else {
                let obj = {
                    firstName,
                    lastName,
                }
                this.setState((prevState)=>{
                    console.log(prevState.rows)
                    return {
                        rows : [...prevState.rows,obj],
                        firstName : '',
                        lastName : '',
                    };
                });
            }
        }
        else{
            alert('Enter both fields properly!!!');
            this.setState({
                firstName : '',
                lastName : ''
            })
        }
    }

    handleFirstName=(event)=>{
        this.setState({firstName : event.target.value});
    }

    handleLastName=(event)=>{
        this.setState({lastName : event.target.value});
    }

    deleteRow(index){
        this.setState((prevState)=>{
            prevState.rows.splice(index,1);
            return{rows : prevState.rows};
        })
    }
    
    editRow(index){
        this.setState((prevState)=>{
            return {
                firstName : prevState.rows[index].firstName,
                lastName : prevState.rows[index].lastName,
                editIndex : index,
            }
        })
    }
    
    updateRow=()=>{
        let {rows,firstName,lastName,editIndex} = this.state;
        firstName = firstName.trim();
        lastName = lastName.trim();
    
        if(firstName && lastName){
            if (this.checkDuplicate(rows,firstName,lastName)) {
                alert('Row Already Exists!!!');
                this.setState({
                    firstName : '',
                    lastName : ''
                })
            } else {
                let updatedRow = {
                    firstName,
                    lastName,
                };
            
                let newRows = rows.map((row,i)=>{
                    if(i === editIndex){
                        return updatedRow;
                    }
                    else{
                        return row
                    }
                })
            
                this.setState({
                    rows : newRows,
                    editIndex : null,
                    firstName : '',
                    lastName : '',
                })
            }
        }
        else{
            alert('Enter both fields properly!!!');
            this.setState({
                firstName : '',
                lastName : ''
            })
        }
    }
    
    render() {
        let {rows,firstName,lastName,editIndex} = this.state;
    return ( 
        <>
        <div id="main">
            <div id="section-1">
                <input type="text" value={firstName} placeholder='First Name' onChange={this.handleFirstName}/>
                <input type="text" value={lastName} placeholder='Last Name' onChange={this.handleLastName}/>
                <button id='add' onClick={this.state.editIndex!==null ? this.updateRow : this.addRow}>
                    {this.state.editIndex!==null ? 'Update' : 'Add'}
                </button>
            </div>
            <div id="section-2">
                <table>
                    <tbody>
                        {
                            rows.map((row,index)=>{
                                return <tr key={index}>
                                    <td>
                                        <input type="text" value={row.firstName} disabled={true}/>
                                    </td>
                                    <td>
                                        <input type="text" value={row.lastName} disabled={true}/>
                                    </td>
                                    <td>
                                        <button onClick={()=>this.editRow(index)} className='EditBtn'>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={()=>this.deleteRow(index)} className='DeleteBtn' disabled={editIndex !== null}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>    
    )
}

}

export default TableComponent