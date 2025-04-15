import React, { useEffect, useState,useMemo} from 'react';
import { useLocation ,NavLink} from 'react-router-dom';
import TagsPopUpModel from './PopUpComponents/TagsPopUpModel';
import DeletePopUp from './PopUpComponents/DeletePopUp';
import MoveMergePopUp from './PopUpComponents/MoveMergePopUp';
import { BsThreeDotsVertical } from "react-icons/bs";

const ItemDescription = () => {

    // Input Field State : 
    const [searchData,setSearchData] = useState('');
    const [filteredSearchData,setFilterSearchData] = useState([])
    const handleSearch = (e)=>{
        let searchItem = e.target.value;
        setSearchData(searchItem);

        const filteredData = itemsData.filter((item)=>{
                console.log(item.tagName.includes(searchData))
                return item.tagName.toLowerCase().includes(searchItem.toLowerCase())
            }
        )
        setFilterSearchData(filteredData)
    }
    // console.log('FilteredSearch Data',filteredSearchData)

    //Description of Tag :
    const [descriptionTag,setDescriptionTag] = useState(null);
    const handleDescription = (event,tag)=>{
        event.stopPropagation();
        console.log(tag);
        setDescriptionTag(tag)
    }
    // Pop-up states
    const [isOpen, setIsOpen] = useState({ popUpModelState: false, eventTarget: '' });
    const [deletePopUp, setDeletePopUp] = useState({ popUpModelState: false, tag: '', tagId: '' });
    const [moveMergePopUp, setMoveMergePopUp] = useState({ popUpModelState: false, tag: '' ,eventTarget:''});

    // Overview and Tags view state
    const [isOverView, setOverView] = useState(true);
    const [currentPage, setCurrentPage] = useState('');

    const location = useLocation();
    const item = location.state.itemDetail;
    const itemName = item.popUpInput1;
    console.log('Item : ',item)

    const [itemsData, setItemsData] = useState(() => {
        const savedItems = localStorage.getItem('Data');
        if (savedItems) {
            const data = JSON.parse(savedItems);
            const selectedItem = data.find((currItem) => currItem.popUpInput1 === itemName);
            return selectedItem ? selectedItem.childItems : [];
        }
        return [];
    });
    console.log('Items Data : ',itemsData)

    // console.log('Items Data : ',itemsData)
    const tagsData = JSON.parse(localStorage.getItem('Data'));
    let totalNumberOfTags = tagsData.reduce((acc,curr)=>{
        return acc+(curr.childItems.length>0 ? curr.childItems.length : 0);
    },0)

    useEffect(() => {
        const updateItemsInLocalStorage = () => {
            const updatedData = JSON.parse(localStorage.getItem('Data')) || [];
            const updatedDataArray = updatedData.map((item) => {
                if (item.popUpInput1 === itemName) {
                    return { ...item, childItems: itemsData };
                }
                return item;
            });
            localStorage.setItem('Data', JSON.stringify(updatedDataArray));
        };

        if (itemsData.length > 0) {
            updateItemsInLocalStorage();
        }
    }, [itemsData, itemName]);

    const filteredTagsData = useMemo(() => {
        return searchData ? filteredSearchData : itemsData;
    }, [searchData, filteredSearchData, itemsData]);

    const renderTags = (tags) => {
        return tags.map((tag) => (
        <li key={tag.tagId} className="tag-Id" data-litag-id={tag.tagId} onClick={(e)=>handleDescription(e,tag)}>
            <div className="tagLi-Div">
                <p>{tag.tagName}</p>
                <div className="menu-container">
                    <button className="menu-button"><BsThreeDotsVertical /></button>
                    <div className="dropdown">
                        <ul>
                            <li onClick={(e) => setIsOpen({ popUpModelState: true, eventTarget: e.target })}>Add</li>
                            <li onClick={() => setDeletePopUp({ popUpModelState: true, tag, tagId: tag.tagId })}>Delete</li>
                            <li onClick={(e) => setMoveMergePopUp({ popUpModelState: true, tag ,eventTarget:e.target})}>Move</li>
                            <li onClick={(e) => setMoveMergePopUp({ popUpModelState: true, tag ,eventTarget:e.target})}>Merge</li>
                        </ul>
                    </div>
                </div>
            </div>
            {tag.childItems && tag.childItems.length > 0 && (
                <ul>{renderTags(tag.childItems)}</ul>
            )}
        </li>
    ));
    };

return (
    <>
        {isOpen.popUpModelState && (
            <TagsPopUpModel
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                itemsData={itemsData}
                setItemsData={setItemsData}
            />
        )}
    
        {deletePopUp.popUpModelState && (
            <DeletePopUp
                deletePopUp={deletePopUp}
                setDeletePopUp={setDeletePopUp}
                setItemsData={setItemsData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        )}
    
        {moveMergePopUp.popUpModelState && (
            <MoveMergePopUp
                moveMergePopUp={moveMergePopUp}
                setMoveMergePopUp={setMoveMergePopUp}
                setItemsData={setItemsData}
            />
        )}

        <div className="item-container">
            <h1>{itemName[0].toUpperCase() + itemName.slice(1)}</h1>
            <div className="buttonsDiv">
                <button onClick={() => setOverView(true)}>Overview</button>
                <button onClick={() => setOverView(false)}>Tags</button>
            </div>
            {isOverView ? (
                <div className="overview-div">
                    <h2>{`${itemName[0].toUpperCase() + itemName.slice(1)} Overview`}</h2>
                    <div>
                        <p>{`${itemName[0].toUpperCase() + itemName.slice(1)} Tag Count`}</p>
                        <p>{itemsData.length}</p>
                    </div>
                    <div>
                        <p>All Tags Count</p>
                        <p>{tagsData ? totalNumberOfTags : 0}</p>
                    </div>
                </div>
        ) : (
            <div className="tags-div">
                <div className="tag-category-div">
                    <div className="tag-category-div-1">
                        <h2>Tags</h2>
                        <button onClick={(e) => setIsOpen({ popUpModelState: true, eventTarget: e.target })}>Add Tags</button>
                    </div>
                    <input 
                        type="text"
                        id="searchField"
                        value={searchData}
                        onChange={handleSearch} 
                    />
                    <ul>{renderTags(filteredTagsData)}</ul>
                </div>
                <div className="tag-description-div">
                    {
                        descriptionTag && (
                            <>
                                <h1>{descriptionTag.tagName}</h1>
                                <div>
                                    <h3>Description</h3>
                                    <p>{descriptionTag.tagDescription}</p>
                                </div>
                            </>
                        )
                    }
                    <h1></h1>
                </div>
            </div>
        )}
        <NavLink to='/'><button className='backButton'>Back</button></NavLink>
        </div>
    </>
);
};

export default ItemDescription;
