import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { recommendedSearch } from "../services/tribe";
import { darkColorTheme, FILE_URL } from "../constant";
import { useNavigate } from "react-router-dom";

export default function Search({ style, placeholder, children, setclicked, clicked }) {
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
                className="search-container secondary-bg"
                style={{
                    // background: "#3c3c3cb0",
                    borderRadius: 30,
                    padding: 12,
                    display: "flex",
                    alignItems: "center",
                    border: clicked ? '2px solid #fff' : 'none',
                    ...style
                }}
            >
                <CiSearch />
                <input
                    className="primary-text"
                    style={{
                        border: "none",
                        background: "transparent",
                        outline: "none",
                        marginLeft: 8,
                        flex: 1, // Makes the input expand to fill available space
                    }}
                    placeholder={placeholder ? placeholder : 'Search...'}
                    onChange={handleChange}
                    value={searchQuery}

                />
                <MdCancel />
            </form>
            {searchQuery.length > 0 &&
                <div style={{ position: 'relative' }}>
                    <div className="primary-bg" style={{  position: 'absolute', paddingBlock: 15, width: '100%', maxHeight: "calc(100vh - 100px)", overflowY: 'auto', borderBottomLeftRadius: 20, paddingInline: 15 }}>
                        <h4 style={{ marginBlock: 0,  }}>Tribes</h4>
                        {recommendation.map((item, key) => (
                            <div onClick={() => handlTribeClick(item._id)} key={key} style={{ display: 'flex', alignItems: 'center', marginBlock: 15, cursor: 'pointer' }}>
                                <div
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={`${FILE_URL}/${item.tribeProfileImage}`}
                                        alt=""
                                        style={{
                                            width: "90%",
                                            height: "90%",
                                            objectFit: "cover",
                                            borderRadius: "50%", // Optional: makes the image circular
                                            display: "block", // Removes extra space under image
                                        }}
                                    />
                                </div>
                                <h5 style={{ marginInline: 3, marginBlock: 0, fontSize: 14, fontWeight: 400, }}>t/{item.tribeName}</h5>
                            </div>
                        ))}
                    </div>
                </div>}
            {clicked && children}
        </div>
    );
}
