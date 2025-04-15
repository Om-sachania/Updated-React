import React from 'react'

export default function TableComponent({rows,handleDeleteItem,editIndex,handleEditItem}) {
    return (
        <table id='table'>
            <tbody>
            {
                rows.map((row,index)=>{
                    return <tr key={index}>
                        <td>
                            <input type="text" 
                            className='' 
                            value={row.firstName} 
                            disabled={true}
                            />
                        </td>
                        <td>
                            <input type="text" 
                            className='' 
                            value={row.lastName} 
                            disabled={true}
                            />
                        </td>
                        <td>
                            <button id='editBtn' onClick={()=>handleEditItem(index)}>Edit</button>
                        </td>
                        <td>
                            <button id='deleteBtn' onClick={()=>handleDeleteItem(index)} disabled={editIndex!==null}>Delete</button>
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
    )
}
