import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FiltersEtat from "./filterEtat"
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./redux/actions"
import axios from "axios"
import { Link } from "react-router"

export default function TableUser({ setSelectedRow }) {
  // Redux state selectors / Sélecteurs d'état Redux
  const { loading, filterData, error, tableData, isHistory } = useSelector((state) => state);
  const paginatedData = useSelector(state => state.paginatedData)
  const visibleColumns = useSelector(state => state.visibleColumns)
  const SelectedRows = useSelector(state => state.SelectedRows)
  const dispatch = useDispatch()

  // Fetch data from API / Récupération des données depuis l'API
  const fetchData = async (dispatch) => {
    try {
      const response = await axios.get("http://localhost/php_inventaire/controller/controllerUser.php", {
        params: { id: "" },
      });
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_DATA_FAILURE,
        payload: error.message,
      });
    }
  }

  // Reset selected rows when filter changes / Réinitialiser les lignes sélectionnées lors du changement de filtre
  useEffect(() => {
    dispatch({ type: "defaultSelectedRows" })
  }, [filterData])

  // Fetch data when table data changes / Actualiser les données lors des changements
  useEffect(() => {
    fetchData(dispatch);
  }, [JSON.stringify(tableData)]);

  // Delete row handler / Gestionnaire de suppression de ligne
  const deleteRow = (idRowDelete) => {
    axios.delete("http://localhost/php_inventaire/controller/controllerUser.php", {
      params: { id: idRowDelete }
    }).then(() => {
      fetchData(dispatch)
    })
  }

  // Table action handlers / Gestionnaires d'actions du tableau
  const handleClickSort = (key) => {
    dispatch({ type: 'sort', payload: key })
  }

  const handleClickSetTypeFilter = (typeFilter) => {
    dispatch({ type: 'setTypeFilter', payload: typeFilter })
  }

  const toggleColumnVisibility = (column) => {
    dispatch({ type: "setVisibleColumns", payload: column })
  }

  const toggleSelectAll = () => {
    dispatch({ type: "toggleSelectAll" })
  }

  const toggleRowSelection = (id) => {
    dispatch({ type: "toggleRowSelection", payload: id })
  }

  // Render table header / Rendu de l'en-tête du tableau
  const renderTableHeader = () => (
    <tr>
      <th>
        <input
          type="checkbox"
          onChange={toggleSelectAll}
          checked={SelectedRows.length === filterData.length && filterData.length > 0}
        />
      </th>
      {visibleColumns.id && (
        <th className='relative'>
          <div className='flex relative justify-end pr-2'>
            <div className='close absolute top-0 mb-3' onClick={() => toggleColumnVisibility('id')} />
          </div>
          <div className='flex items-center gap-2 mt-4'>
            ID
            <div className='relative sort' onClick={() => handleClickSort("id")} />
          </div>
        </th>
      )}
      {visibleColumns.nom && (
        <th className='relative'>
          <div className='flex relative justify-end pr-2'>
            <div className='close absolute top-0 mb-3' onClick={() => toggleColumnVisibility('nom')} />
          </div>
          <div className='flex items-center gap-2 mt-4'>
            Nom
            <div className='sort' onClick={() => handleClickSort("nom")} />
          </div>
        </th>
      )}
      {visibleColumns.phone && (
        <th className='relative'>
          <div className='flex relative justify-end pr-2'>
            <div className='close absolute top-0 mb-3' onClick={() => toggleColumnVisibility('phone')} />
          </div>
          <div className='flex items-center gap-2 mt-4'>
            Téléphone
            <div className='sort' onClick={() => handleClickSort("phone")} />
          </div>
        </th>
      )}
      <th>Actions</th>
    </tr>
  )

  // Render table row / Rendu d'une ligne du tableau
  const renderTableRow = (item) => (
    <tr key={item.id}>
      <td>
        <input
          type="checkbox"
          checked={SelectedRows.includes(item.id)}
          onChange={() => toggleRowSelection(item.id)}
        />
      </td>
      {visibleColumns.id && <td>{item.id}</td>}
      {visibleColumns.nom && <td><div className="truncated-text" title={item.nom}>{item.nom}</div></td>}
      {visibleColumns.phone && <td>{item.phone}</td>}
      <td className='flex justify-center max-lg:w-[223px]'>
        <Link to={`/Edit_user/${item.id}/${item.nom}`}>
          <button className="btn btn-primary btn-sm mx-1 w-[50px] h-[50px]">
            <img src={`${process.env.PUBLIC_URL}/edit.png`} className='w-[30px] h-[25px]' alt="Modifier" />
          </button>
        </Link>
        <Link to="/List_user/List_user">
          <button className="btn btn-danger btn-sm mx-1 w-[50px] h-[50px]" onClick={() => deleteRow(item.id)}>
            <img src={`${process.env.PUBLIC_URL}/bin.png`} className='w-[25px] h-[25px]' alt="Supprimer" />
          </button>
        </Link>
        <button className="btn btn-info btn-sm mx-1 w-[50px] h-[50px]" onClick={() => setSelectedRow(item)}>
          <img src={`${process.env.PUBLIC_URL}/search-file.png`} className='w-[25px] h-[25px]' alt="Détails" />
        </button>
      </td>
    </tr>
  )

  return (
    <>
      {/* Selected rows message / Message des lignes sélectionnées */}
      {SelectedRows.length > 0 && (
        <div className="flex md:w-[90%] items-center">
          <div className="alert alert-info col h-[25px] flex items-center justify-center">
            {`${SelectedRows.length} ligne(s) sélectionnée(s)`}
          </div>
        </div>
      )}

      {/* Table container / Conteneur du tableau */}
      <div className='relative'>
        <div className="table-responsive">
          <table className="table table-striped z-1">
            <thead>{renderTableHeader()}</thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map(item => renderTableRow(item))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">
                    {loading ? (
                      <span className="text-warning">Chargement en cours...</span>
                    ) : (
                      <span className="text-danger">Aucun résultat trouvé</span>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

