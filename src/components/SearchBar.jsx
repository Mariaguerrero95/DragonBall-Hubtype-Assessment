import React, { useState } from 'react';
import "../scss/components/SearchBar.scss";

const SearchBar = ({ onSearch }) => {
    const [name, setName] = useState("");
    const [minKi, setMinKi] = useState("");
    const [maxKi, setMaxKi] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ name, minKi, maxKi });
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <h2>Search by name</h2>
            <input
                type="text"
                placeholder="e.g., Goku"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <h2>Search by Ki</h2>
            <div className="ki-inputs">
                <select value={minKi} onChange={(e) => setMinKi(e.target.value)}>
                    <option value="">From</option>
                    <option value="10000">10000</option>
                    <option value="20000">20000</option>
                    <option value="30000">30000</option>
                    {/* ... add more options if necessary */}
                </select>

                <select value={maxKi} onChange={(e) => setMaxKi(e.target.value)}>
                    <option value="">To</option>
                    <option value="30000">30000</option>
                    <option value="40000">40000</option>
                    <option value="50000">50000</option>
                </select>
            </div>

            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
