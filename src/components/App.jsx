import "../scss/App.scss";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import CharacterCard from "./CharacterCard";
import { useState, useEffect, useCallback } from "react";

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch("https://dragonball-api.com/api/characters");
                if (!response.ok) {
                    throw new Error(`API request failed: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                console.log("Sample character:", data.items[0]); 
                setCharacters(data.items || []);
                setSearchResults(data.items || []); 
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    const handleSearch = useCallback(({ name, minKi, maxKi }) => {
        let filteredResults = [...characters]; 

        if (name) {
            const lowerCaseName = name.toLowerCase();
            filteredResults = filteredResults.filter(character =>
                character.name?.toLowerCase().includes(lowerCaseName)
            );
        }
        if (minKi !== '') {
            filteredResults = filteredResults.filter(character => character.ki >= parseInt(minKi, 10));
        }
        if (maxKi !== '') {
            filteredResults = filteredResults.filter(character => character.ki <= parseInt(maxKi, 10));
        }

        setSearchResults(filteredResults);
        setSelectedCharacter(null);
    }, [characters]);

    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
    };

    const handleBackToResults = () => {
        setSelectedCharacter(null);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Dragon Ball Character Finder</h1>
            </header>
            <main className="app-main">
                <div className="search-section">
                    <h2>What Dragon Ball character are you looking for?</h2>
                    <SearchBar onSearch={handleSearch} />
                </div>
                {loading && <p className="loading-message">Loading characters...</p>}
                {error && <p className="error-message">Error: {error.message}</p>}
                {!loading && !selectedCharacter && (
                    <>
                        {searchResults.length > 0 ? (
                            <div className="results-section">
                                <h2>{searchResults.length} results found:</h2>
                                <SearchResults
                                    characters={searchResults}
                                    onCharacterSelect={handleCharacterSelect}
                                />
                            </div>
                        ) : (
                            <p>No characters found. Try another search.</p>
                        )}
                    </>
                )}
                {selectedCharacter && (
                    <div className="character-details-section">
                        <button className="back-button" onClick={handleBackToResults}>
                            Back to results
                        </button>
                        <CharacterCard character={selectedCharacter} isDetailed={true} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
