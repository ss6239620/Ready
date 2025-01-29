import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { recommendedSearch } from "../services/tribe";
import { darkColorTheme, FILE_URL } from "../constant";
import { useNavigate } from "react-router-dom";

export default function Search({ style, placeholder, children, setclicked, clicked,className }) {
    const searchRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [recommendation, setRecommendation] = useState([]);
    const [loading, setloading] = useState(false)

    const navigate = useNavigate()

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            if (setclicked) setclicked(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    function handlTribeClick(id) {
        navigate(`/tribe/${id}`)
        setSearchQuery('')
    }

    function handleChange(e) {
        const query = e.target.value;
        setSearchQuery(query);
        setloading(true)
        if (query) {
            setclicked(false)
            recommendedSearch(query).then((res) => {
                setRecommendation(res.data.data)
                setloading(false)
            }).catch(err => {
                console.log(err.response.data);
                setloading(false)
            })
        } else {
            setRecommendation([])
            setclicked(true)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        navigate(`/search?q=${searchQuery}`)
        setSearchQuery('')
    }


    return (
        <div ref={searchRef}>
            <form
                onSubmit={handleSubmit}
                onClick={() => searchQuery.length === 0 ? setclicked((prev) => !prev) : null}
                className={`search-container secondary-bg ${className} border-radius-large p-3 div-center`}
                style={{
                    border: clicked ? '2px solid #fff' : 'none',
                    ...style
                }}
            >
                <CiSearch />
                <input
                    className="primary-text bg-transparent outline-none ml-2 flex-1 "
                    style={{
                        border: "none",
                    }}
                    placeholder={placeholder ? placeholder : 'Search...'}
                    onChange={handleChange}
                    value={searchQuery}

                />
                <MdCancel />
            </form>
            {searchQuery.length > 0 &&
                <div className="relative" >
                    <div className="primary-bg absolute p-4 w-[100%] max-h-[calc(100vh_-_100px)] overflow-y-auto rounded-bl-3xl " >
                        <h4 className="large-text-large-weight" >Tribes</h4>
                        {recommendation.map((item, key) => (
                            <div className="div-center my-4 cursor-pointer" onClick={() => handlTribeClick(item._id)} key={key}>
                                <img
                                    src={`${FILE_URL}/${item.tribeProfileImage}`}
                                    alt=""
                                    className="img-small-style"
                                />
                                <h5 className="medium-text-normal-weight">t/{item.tribeName}</h5>
                            </div>
                        ))}
                    </div>
                </div>}
            {clicked && children}
        </div>
    );
}
