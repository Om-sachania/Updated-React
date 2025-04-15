import React, { useState } from 'react';
import './popUpStyle.css'

const CategoryPopupModel = (props) => {
    const {setIsOpen,popUpInput1,popUpInput2,setPopUpInput1,setPopUpInput2,data,setData,isEdit,setIsEdit} = props

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'popUpInput1') {
            setPopUpInput1(value);
        } else if (name === 'popUpInput2') {
            setPopUpInput2(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let selectedItem = data.find((currItem)=>currItem.popUpInput1 === popUpInput1);
        if (popUpInput1 && popUpInput2) {
            if (selectedItem) {
                alert('Item Already Exists!!!')
                setPopUpInput1('');
                setPopUpInput2('');
            } else {
                const newItem = {
                    itemId : Date.now(),
                    checkBoxStatus : false,
                    popUpInput1,
                    popUpInput2,
                    childItems : []
                }
                setData((prev)=>[...prev,newItem]);
                setPopUpInput1('');
                setPopUpInput2('');
                closeModal();
            }
        } else {
            alert('Please fill in both input fields.');
        }
    };

    function handleUpdateItem(itemId,e){
        e.preventDefault();
        let selectedItem = data.find((currItem)=>currItem.itemId == itemId);
        if(selectedItem.popUpInput1 !== popUpInput1 || selectedItem.popUpInput2 !== popUpInput2){
            setData((prev)=>{
                return prev.map((currItem)=>{
                    return currItem.itemId == itemId ? {...currItem , popUpInput1 ,popUpInput2} : currItem
                })
            })
            closeModal();
            setPopUpInput1('');
            setPopUpInput2('');
            setIsEdit({editState : false,editItemId : ''});
        }
        else{
            alert('Data Already Exists!!!!')
        }
    }
    return (
        <div>
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2>Popup with Input Fields</h2>
                    <form>
                        <div>
                            <label htmlFor="input1">Category Name :</label>
                            <input
                                type="text"
                                id="popUpInput1"
                                name="popUpInput1"
                                value={popUpInput1}
                                onChange={handleInputChange}
                                placeholder="Enter Category Name"
                            />
                        </div>

                        <div>
                            <label htmlFor="input2">Category Description :</label>
                            <input
                                type="text"
                                id="popUpInput2"
                                name="popUpInput2"
                                value={popUpInput2}
                                onChange={handleInputChange}
                                placeholder="Enter Category Description"
                            />
                        </div>

                        <div>
                            <button className='submitButton' onClick={isEdit.editState ? (e)=>handleUpdateItem(isEdit.editItemId,e) :handleSubmit}>{isEdit.editState ? 'Update' : 'Submit'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryPopupModel;
