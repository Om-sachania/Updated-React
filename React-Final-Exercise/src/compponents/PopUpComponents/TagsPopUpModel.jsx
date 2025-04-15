import React, { useState } from 'react';

const TagsPopUpModel = ({ isOpen, setIsOpen, itemsData, setItemsData}) => {
    const [tagName, setTagName] = useState('');
    const [tagDescription, setTagDescription] = useState('');

    const closeModal = () => {
        setIsOpen({ popUpModelState: false, eventTarget: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tagName') {
            setTagName(value);
        } else if (name === 'tagDescription') {
            setTagDescription(value);
        }
    };

    const findDuplicateTags = (arr,currTagName)=>{
        for (let item of arr) {
            if (item.tagName === currTagName) {
                return true;
            }

            if (item.childItems.length > 0) {
                if (findDuplicateTags(item.childItems, currTagName)) {
                    return true;
                }
            }
        }
        return false; 
    }
    const handleSubmit = (e, eventTarget) => {
        e.preventDefault();

        if (tagName && tagDescription) {
            if (findDuplicateTags(itemsData, tagName)) {
                alert('Tagalready exists!'); 
                return;
            }
            if (eventTarget.textContent !== 'Add Tags') {
                let liElement = eventTarget.closest('.tag-Id');
                let parentLiId = liElement.getAttribute('data-litag-id');
                let newItem = {
                    tagId: Date.now(),
                    tagName,
                    tagDescription,
                    childItems: [],
                };

                const addTagToNestedList = (tags, parentLiId, newTag) => {
                    return tags.map((item) => {
                        if (item.tagId === +parentLiId) {
                            return { ...item, childItems: [...item.childItems, newTag] };
                        }

                        if (item.childItems.length > 0) {
                            return {
                                ...item,
                                childItems: addTagToNestedList(item.childItems, parentLiId, newTag),
                            };
                        }

                        return item;
                    });
                };

                setItemsData((prev) => addTagToNestedList(prev, parentLiId, newItem));
                closeModal();
            } else {
                const newTag = {
                    tagId: Date.now(),
                    tagName,
                    tagDescription,
                    childItems: [],
                };
                setItemsData((prev) => [...prev, newTag]);
                setTagName('');
                setTagDescription('');
                closeModal();
            }
        } else {
            alert('Please fill both fields');
        }
    };

    return (
        <div>
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                        &times;
                    </span>
                    <h2>Popup with Input Fields</h2>
                    <form>
                        <div>
                            <label htmlFor="tagName">Tag Name:</label>
                            <input
                                type="text"
                                id="tagName"
                                name="tagName"
                                value={tagName}
                                onChange={handleInputChange}
                                placeholder="Enter Tag Name"
                            />
                        </div>

                        <div>
                            <label htmlFor="tagDescription">Tag Description:</label>
                            <input
                                type="text"
                                id="tagDescription"
                                name="tagDescription"
                                value={tagDescription}
                                onChange={handleInputChange}
                                placeholder="Enter Tag Description"
                            />
                        </div>

                        <div>
                            <button
                                className="submitButton"
                                onClick={(e) => handleSubmit(e, isOpen.eventTarget)}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TagsPopUpModel;
