import { useState } from 'react'
import './App.css'
import TableComponent from './components/TableComponent';

function App() {
  const [rows,setRows] = useState([]);
  const [userFirstName,setUserFirstName] = useState('');
  const [userLastName,setUserLastName] = useState('');
  const [editIndex,setEditIndex] = useState(null);

  // Logic of entering First Name
  function handleFirstName(event){
    setUserFirstName(event.target.value)
  }

  // Logic of entering Last Name
  function handleLastName(event){
    setUserLastName(event.target.value)
  }

  // Logic of checking duplicate user object
  function checkDuplicate(fName,lName){
    let matchedObject = rows.find((row)=>row.firstName == fName && row.lastName == lName);
    if(matchedObject){
      console.log('Found Object')
      return true
    }
    else{
      return false
    }
  }

  // Logic of clearing input fields(First name, Last name)
  function clearInputFields(){
    setUserFirstName('');
    setUserLastName('');
  }

  // Logic of Adding Rows
  function handleAddRow(fName,lName){
    fName = fName.trim();
    lName = lName.trim();

    if(fName && lName){
      if (!checkDuplicate(fName,lName)) {
        setRows((prevState)=>[...prevState,{firstName:fName,lastName:lName}]);
      } else {
        alert("User Alerady exist!!");
      }
    }
    else{
      alert('Please fill both the details')
    }
    clearInputFields();
  }

  // Logic of editing the Item
  function handleEditItem(editIndex){
    console.log('Edit');
    let currUser = rows.find((row,rowIndex)=>rowIndex==editIndex);
    let currFirstName = currUser.firstName
    let currLastName = currUser.lastName

    setUserFirstName(currFirstName);
    setUserLastName(currLastName);
    setEditIndex(editIndex);
  }

  // Logic of Updating an row 
  function handleUpdateItem(){
    console.log('Update')
    console.log(userFirstName,userLastName);
    let firstName = userFirstName.trim();
    let lastName = userLastName.trim();

    if (firstName && lastName) {
      if(checkDuplicate(firstName,lastName)){
        alert('User Already Exists!');
      }
      else{
        let updatedRow ={
          firstName,
          lastName,
        }
        let updatedRowsAfterUpdation = rows.map((row,index)=>{
          if(index==editIndex)return updatedRow
          return row
        });
  
        setRows(updatedRowsAfterUpdation);
        setEditIndex(null);
      }
    } else {
      alert('Please fill both the details');
    }
    clearInputFields();
  }

  // Logic of Deleting an Item
  function handleDeleteItem(deleteIndex){
    let updatedRowsAfterDeletion = rows.filter((row,rowIndex)=>rowIndex!==deleteIndex);
    setRows(updatedRowsAfterDeletion);
  }

  return (
    <>
      <div className='main'>
        <div className='section-1'>
          <input type="text" 
          className='firstName' 
          value={userFirstName} 
          onChange={handleFirstName}
          placeholder='First Name'
          />
          <input type="text" 
          className='lastName' 
          value={userLastName} 
          onChange={handleLastName}
          placeholder='Last Name'
          />
          <button id='AddOrUpdate' onClick={editIndex!==null ? ()=>handleUpdateItem():()=>handleAddRow(userFirstName,userLastName)}>
            {editIndex!==null ? 'Update' : 'Add'}
          </button>
        </div>

        <div className='section-2'>
          <TableComponent rows = {rows} handleDeleteItem={handleDeleteItem} editIndex={editIndex} handleEditItem={handleEditItem}/>
        </div>
      </div>
    </>
  )
}

export default App