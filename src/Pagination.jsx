
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Composant de pagination - Gère la navigation entre les pages de données
 * Pagination Component - Handles navigation between data pages
 */
function Pagination() {
    // Redux hooks / Hooks Redux
    const dispatch = useDispatch();
    const filterData = useSelector(state => state.filterData);

    // États locaux / Local states
    const [currentPage, setCurrentPage] = useState(1);
    const [isFirstRender, setIsFirstRender] = useState(true);

    // Constants / Constantes
    const ITEMS_PER_PAGE = 5;
    const totalPages = Math.ceil(filterData.length / ITEMS_PER_PAGE);

    /**
     * Passe à la page suivante si possible
     * Move to next page if possible
     */
    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    /**
     * Passe à la page précédente si possible
     * Move to previous page if possible
     */
    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    /**
     * Met à jour la pagination dans le store Redux
     * Updates pagination in Redux store
     */
    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        
        dispatch({ 
            type: 'pagination', 
            payload: currentPage 
        });
    }, [currentPage, totalPages, filterData, dispatch, isFirstRender]);

    /**
     * Réinitialise la page courante quand les données changent
     * Reset current page when data changes
     */
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    return (
        <div className="pagination-container">
            {/* Bouton précédent / Previous button */}
            <button 
                className="pagination-button previous"
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
            >
                Précédent
            </button>

            {/* Indicateur de page / Page indicator */}
            <span className="page-indicator">
                {currentPage}/{totalPages || 1}
            </span>

            {/* Bouton suivant / Next button */}
            <button 
                className="pagination-button next"
                onClick={handleNextPage} 
                disabled={currentPage === totalPages || totalPages === 0}
            >
                Suivant
            </button>
        </div>
    );
}

// PropTypes pour la validation des props
Pagination.propTypes = {
    filterData: PropTypes.array
};

// Valeurs par défaut des props
Pagination.defaultProps = {
    filterData: []
};

// Styles CSS pour la pagination / CSS styles for pagination
const styles = `
.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.pagination-button {
    padding: 0.5rem 1rem;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    min-width: 120px;
}

@media (max-width: 768px) {
    .pagination-button {
        min-width: 30vw;
    }
}

.pagination-button:hover:not(:disabled) {
    background-color: #5a6268;
}

.pagination-button:disabled {
    background-color: #dee2e6;
    cursor: not-allowed;
}

.page-indicator {
    font-size: 1rem;
    color: #495057;
    font-weight: 500;
}

.previous {
    margin-right: 1rem;
}

.next {
    margin-left: 1rem;
}
`;

// Injection des styles dans le document / Inject styles into document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Pagination;
