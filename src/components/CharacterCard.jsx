import React from 'react';
import "../scss/components/CharacterCard.scss";

const CharacterCard = ({ character, isDetailed }) => {
    return (
        <div className={`character-card ${isDetailed ? 'detailed' : ''}`}>
            <img
                src={character.image}
                alt={character.name?.romaji || "Dragon Ball Character"}
                className="character-image"
            />
            <div className="character-info">
                <h3>{character.name?.romaji}</h3>
                <p><strong>Ki:</strong> {character.ki}</p>
                {isDetailed && (
                    <p className="description">
                        <strong>Description:</strong> {character.description || "No description available."}
                    </p>
                )}
            </div>
            
            {!isDetailed && <span className="ki-value">{character.ki}</span>}
        </div>
    );
};

export default CharacterCard;