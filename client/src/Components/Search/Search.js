import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { searchByname } from '../../Redux/Actions/PetsAction'
import './Search.css'

function Search() {
    const navigte = useNavigate()
    const result = useSelector(state => state.search.items)
    const [temp, setTemp] = useState([])
    const dispatch = useDispatch()

    const searching = (e) => {
        let data = e.target.value
        console.log(data.length);
        if (data.length === 0) {
            dispatch(searchByname(null))
        }
        if (data.length === 3) {

            axios.get('/users/search', { params: { data } }).then((res) => {
                console.log(res);
                if (res.data) {
                    setTemp(res.data)
                    dispatch(searchByname(res.data))
                }
            })
        } else if (data.length > 3) {
            if (!result) {
                return
            }
            if (result.length === 0) {
                dispatch(searchByname(temp))
            }
            var matched_terms = [];
            var search_term = data;
            search_term = search_term.toLowerCase();
            console.log(result);
            console.log(data);
            if (result.length !== 0) {
                result.forEach(item => {
                    if (item.name.toLowerCase().indexOf(search_term) !== -1) {
                        matched_terms.push(item);
                    }
                })
                dispatch(searchByname(matched_terms));
            }
        }
    }
    return (
        <div className="searchParent">
            <div className="search">
                <p>Search.</p>
                <input type="text" onChange={searching} placeholder="Mecavo."/>
                <div className="tiles">
                    {result && result.map((obj) => {
                        return (<div className="search-tile" onClick={() => {
                            navigte(`/views/${obj._id}`)
                        }}>
                            <span>{obj.name}</span>
                            <span className="cate">{obj.category}</span>
                        </div>)
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Search
