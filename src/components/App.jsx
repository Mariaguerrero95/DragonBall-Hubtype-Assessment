import "../scss/App.scss";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import CharacterCard from "./CharacterCard";
import React, { useState, useEffect, useCallback } from 'react';



function App() {

    return (
        <div>
            <SearchBar />
            <SearchResults />
            <CharacterCard />
        </div>
    )
}

export default App
