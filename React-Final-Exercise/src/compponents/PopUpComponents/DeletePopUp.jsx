import React from 'react';
import './DeletePopUpStyle.css'

const DeletePopUp = ({deletePopUp,setDeletePopUp,setItemsData}) => {
    const onCancel = ()=>{
        setDeletePopUp({popUpModelState : false , tag:'' , tagId : ''});
        alert('Deletion Cancelled!!')
    }

    const onConfirm = ()=>{
        setDeletePopUp({popUpModelState : false , tag:'' , tagId : ''});
        handleDeleteItem(deletePopUp.tag,deletePopUp.tagId)
    }

    const handleDeleteItem = (tag, itemId) => {
        const deleteNestedItems = (tags, tagId) => {
            return tags
                .map((currTag) => {
                    if (currTag.tagId === tagId) {
                        return null;
                    }
    
                    if (currTag.childItems && currTag.childItems.length > 0) {
                        return {
                            ...currTag,
                            childItems: deleteNestedItems(currTag.childItems, tagId),
                        };
                    }
        
                    return currTag;
                })
                .filter((tag) => tag !== null); 
        };
        
        setItemsData((prev) => deleteNestedItems(prev, itemId)); 
    };

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Delete {deletePopUp.tag.tagName} Tag</h2>
                    <p>This action will delete the tag completely,and its all children, Are you sure?</p>
                    <div className="modal-buttons">
                        <button className="cancel-button" onClick={onCancel}>Cancel</button>
                        <button className="confirm-button" onClick={onConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletePopUp