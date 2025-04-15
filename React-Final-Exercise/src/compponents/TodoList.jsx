import React, { useState, useMemo} from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import CategoryPopupModel from './PopUpComponents/CategoryPopUpModel';

const TodoList = () => {
    function dataInitialValue(){
        let localDataArray = JSON.parse(localStorage.getItem('Data'));
        return localDataArray ? localDataArray : [];
    }

    const [searchData, setSearchData] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [data, setData] = useState(dataInitialValue);
    const [isOpen, setIsOpen] = useState(false);
    const [popUpInput1, setPopUpInput1] = useState('');
    const [popUpInput2, setPopUpInput2] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [isEdit,setIsEdit] = useState({editState : false,editItemId :''});

    localStorage.setItem('Data',JSON.stringify(data));

    // PAGINATION PART
    const [currentPage,setCurrentPage] = useState(1);
    const rowsPerPage = 5;
        const totalPages = data.length>0 ? Math.ceil(data.length/rowsPerPage) : 0;
        const renderPaginationButtons = () => {
            const buttons = [];
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <button 
                    key={i} 
                    onClick={() => handlePageChange(i)} 
                    disabled={i === currentPage} 
                    style={{ margin: '0 5px', padding: '5px 10px', backgroundColor: i === currentPage ? 'red' : '#4CAF50'}}
                    >
                    {i}
                </button>
                );
            }
            return buttons;
        };
    
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    //PAGINATION PART OVER...............................................

    const openModal = () => {
        setIsOpen(true);
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchData(searchValue);
        const filtered = currentItems.filter(item =>
            item.popUpInput1.toLowerCase().includes(searchValue.toLowerCase()) 
        );
        setFilterData(filtered);
    };

    const handleSelectAll = (e) => {
        let checkBoxAllCurrentState = e.target.checked;
        checkBoxAllCurrentState ? setSelectedItems(data.map(item=>item.itemId)) : setSelectedItems([]);
    };

    const handleSelectItem = (itemId) => {
        setSelectedItems((prev)=>{
            return prev.includes(itemId) ? prev.filter(id=> id!==itemId) : [...prev,itemId]
        })
    };

    const handleDeleteItem = (itemId)=>{
        setData((prev)=>{
            return prev.filter((item)=>item.itemId !== itemId)
        });
        setFilterData((prev)=>{
            return prev.filter((item)=>item.itemId !== itemId)
        });
    }

    const handleEditItem = (itemId)=>{
        setIsOpen(true);
        setIsEdit({editState : true,editItemId:itemId});
        let selectedItem = data.find((currData)=>currData.itemId == itemId)
        setPopUpInput1(selectedItem.popUpInput1);
        setPopUpInput2(selectedItem.popUpInput2);
    }

    const categoryData = useMemo(() => {
        return searchData ? filterData : currentItems;
    }, [searchData, filterData, currentItems]);

    return (
        <>
            {isOpen && (
                <CategoryPopupModel
                    setIsOpen={setIsOpen}
                    popUpInput1={popUpInput1}
                    popUpInput2={popUpInput2}
                    setPopUpInput1={setPopUpInput1} 
                    setPopUpInput2={setPopUpInput2}
                    data = {data}
                    setData={setData}
                    isEdit = {isEdit}
                    setIsEdit = {setIsEdit}
                />
            )}
            <div className="container">
                <h2>Categories</h2>
                <div className="section-1">
                    <input
                        type="text"
                        id="searchField"
                        value={searchData}
                        onChange={handleSearch}
                    />
                    <button onClick={openModal}>Create New Category</button>
                </div>
                <div className="section-2">
                    {categoryData.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            name="selectAll"
                                            id="selectAll"
                                            onChange={handleSelectAll}
                                            checked={selectedItems.length === categoryData.length}
                                        />
                                    </th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryData.map(item => (
                                    <tr key={item.itemId}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.itemId)}
                                                onChange={() => handleSelectItem(item.itemId)}
                                            />
                                        </td>
                                        <td>
                                            <Link to={`itemDescription`} state={{itemDetail : item}} style={{fontSize:'32px', margin:'0px 16px'}}>{item.popUpInput1}</Link>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={item.popUpInput2}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <button onClick={()=>handleEditItem(item.itemId)}>Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={()=>handleDeleteItem(item.itemId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {data.length>0 && 
                        <div className="pagination-controls">
                            {renderPaginationButtons()}
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default TodoList;