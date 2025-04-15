import React, { useState ,useEffect} from 'react'
import './MoveMerge.css'

const MoveMergePopUp = ({moveMergePopUp,setMoveMergePopUp,setItemsData}) => {
    console.log('Event Target : ',moveMergePopUp.eventTarget.textContent)
    const dataArray = JSON.parse(localStorage.getItem('Data'));

    const [selectedCategory,setSelectedCategory] = useState('');
    const [subCategory , setSubCategory] = useState('');
    const [subCategoryArray,setSubCategoryArray] = useState([]);

    
    useEffect(() => {
        if (selectedCategory) {
            const selectedData = dataArray.find((data) => data.popUpInput1 === selectedCategory);
            if (selectedData) {
                setSubCategoryArray(selectedData.childItems);
            } else {
                setSubCategoryArray([]);
            }
        } else {
            setSubCategoryArray([]);
        }
    }, [selectedCategory]);

    function handleSelectInput(e){
        console.log(e.target.value);
        setSelectedCategory(e.target.value)
    }

    const handleClick =(e)=>{
        console.log(e.target.getAttribute('value'));
        setSubCategory(e.target.getAttribute('value'))
    }

    const findTags = (tags, movingTagName, destinationTagName) => {
        let movingTag = null;
        let destinationTag = null;
    
        const traverse = (tagsArray) => {
            for (let item of tagsArray) {
                if (item.tagName === movingTagName) movingTag = item;
                if (item.tagName === destinationTagName) destinationTag = item;
    
                if (item.childItems) traverse(item.childItems);
            }
        };
        traverse(tags);
        return { movingTag, destinationTag };
    };

    const movingItem = (parentArray, destinationTag, movingTag) => {
        const moveTag = (arr, destination, movingItem) => {
            return arr.map((item) => {
                console.log('Current Item : ',item)
                if (item.tagName === destination.tagName) {
                    console.log('Yes Destination MAtched!!!')
                    return {
                        ...item,
                        childItems: [...item.childItems, movingItem],
                    };
                }
    
                if (item.tagName === movingItem.tagName) {
                    console.log('Yes MOving MAtched!!!')
                    return null;
                }
    
                if (item.childItems && item.childItems.length > 0) {
                    return {
                        ...item,
                        childItems: moveTag(item.childItems, destination, movingItem), 
                    };
                }
    
                return item;
            }).filter((item) => item !== null);
        };
    
        const updatedArray = moveTag(parentArray, destinationTag, movingTag);
        
        console.log('Updated Array : ',updatedArray)
        localStorage.setItem('Data',JSON.stringify(updatedArray));

        setItemsData((prev)=>moveTag(prev,destinationTag,movingTag))
    };
    
    const mergingItem = (parentArray,destinationTag,mergingTag)=>{
        const mergeTag = (arr,destination,mergingItem)=>{
            return arr.map((item) => {
                if (item.tagName === destination.tagName) {
                    return {
                        ...item,
                        childItems: [...item.childItems, ...mergingTag.childItems],
                    };
                }
    
                if (item.tagName === mergingItem.tagName) {
                    return null; 
                }
    
                if (item.childItems && item.childItems.length > 0) {
                    return {
                        ...item,
                        childItems: mergeTag(item.childItems, destination, mergingItem),
                    };
                }
    
                return item;
            }).filter((item) => item !== null); 
        }

        const updatedArray = mergeTag(parentArray, destinationTag, mergingTag);
        localStorage.setItem('Data',JSON.stringify(updatedArray));

        setItemsData((prev)=>mergeTag(prev,destinationTag,mergingTag))
    }

    const handleSubmit = ()=>{
        const { movingTag, destinationTag } = findTags(
            dataArray,
            moveMergePopUp.tag.tagName,
            subCategory
        );
        
        if (movingTag && destinationTag) {
            if (moveMergePopUp.eventTarget.textContent === 'Move') {
                movingItem(dataArray, destinationTag, movingTag);
            } else {
                mergingItem(dataArray, destinationTag, movingTag);
            }
        }
        setMoveMergePopUp({ popUpModelState: false, tag: '', eventTarget: '' });
    }

    const handleCancel = ()=>{
        setMoveMergePopUp({popUpModelState : false , tag : '',eventTarget:''})
    }

    const renderTags = (tags) => {
        return tags.map((tag) => (
            <li key={tag.tagId} className="parent" onClick={handleClick} value={tag.tagName}>
                {tag.tagName}
                {tag.childItems && tag.childItems.length > 0 && (
                    <ul className="nested">
                        {renderTags(tag.childItems)} 
                    </ul>
                )}
            </li>
        ));
    };
    return (
        <>
            <div className='moveMergeModel'>
                <div className='moveMergeModel-content'>
                    <div className='moveMerge-section-1'>
                        <h2>{`${moveMergePopUp.eventTarget.textContent} Tag`}</h2>
                        <span className="close" onClick={()=>setMoveMergePopUp(false)}>&times;</span> 
                    </div>
                    <div className='moveMerge-section-2'>
                        <div className='moveMerge-targetCategory'>
                            <label htmlFor="targetCategory">Target Category</label>
                            <select name="targetCategory" id="targetCategory" value={selectedCategory} onChange={handleSelectInput} >
                                <option value="">Select Category</option>
                                {dataArray.map((data)=>{
                                    return <option key={data.tagId} value={data.popUpInput1}>{data.popUpInput1}</option>
                                })}
                            </select>
                        </div>
                        <div className='moveMerge-parentCategory'>
                            <label htmlFor="parentCategory">Parent Category</label>
                            <span> {subCategory}</span>
                            <div className="hover-list">
                                <ul className="main">
                                    {
                                        renderTags(subCategoryArray)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>  
                    <div className='moveMerge-section-3 ' style={{marginTop:'16px'}}>
                        <button className='saveButton' style={{backgroundColor : 'transparent', color:'black', border:'2px solid black' }} onClick={(e)=>handleSubmit(e)}>Save</button>
                        <button style={{backgroundColor : 'transparent', color:'black', border:'2px solid black'}} onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MoveMergePopUp