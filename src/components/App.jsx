import "../scss/App.scss";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import CharacterCard from "./CharacterCard"; // ¡Importamos CharacterCard aquí!
import { useState, useEffect, useCallback } from "react";

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true); // Definimos setLoading aquí
    const [error, setError] = useState(null);   // Definimos setError aquí

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch("https://dragonball-api.com/api/characters");
                if (!response.ok) {
                    throw new Error(`Error en la petición a la API: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
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
                (character.name?.kanji?.toLowerCase().includes(lowerCaseName)) ||
                (character.name?.romaji?.toLowerCase().includes(lowerCaseName))
            );
        }

        if (minKi !== '') {
            filteredResults = filteredResults.filter(character => character.ki >= parseInt(minKi, 10));
        }

        if (maxKi !== '') {
            filteredResults = filteredResults.filter(character => character.ki <= parseInt(maxKi, 10));
        }

        setSearchResults(filteredResults);
    }, [characters]);

    return (
        <>
            <header>
                <h1>Buscador de Personajes de Dragon Ball</h1>
            </header>
            <main>
                <SearchBar onSearch={handleSearch} />
                <SearchResults characters={searchResults} />

                <h2>Listado de Personajes (Directo desde App)</h2>
                <div className="character-list-direct">
                    {searchResults.map(character => (
                        <CharacterCard key={character.id} character={character} />
                    ))}
                </div>
            </main>
        </>
    );
};

export default App;