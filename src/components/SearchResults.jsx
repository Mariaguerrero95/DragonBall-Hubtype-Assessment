import React from 'react';
import "../scss/components/SearchResults.scss";
import CharacterCard from "./CharacterCard";

const SearchResults = ({ characters, onCharacterSelect }) => {
    if (!characters || characters.length === 0) {
        return <p className="no-results">No characters found matching the current search criteria.</p>;
    }

    return (
        <div className="search-results-list">
            {characters.map((character) => (
                <div key={character.id} onClick={() => onCharacterSelect(character)} className="search-result-item">
                    <CharacterCard character={character} />
                </div>
            ))}
        </div>
    );
};

export default SearchResults;