import React from 'react';
import { HashRouter, Route, Routes } from 'react-router';

// Composants d'authentification
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

// Composants de gestion d'inventaire
import List_inventory from './List_inventory';
import Add_Inventory from "./Add_Inventory";
import Edit_inventory from './Edit_inventory';

// Composants de gestion d'utilisateurs
import List_user from './List_user';
import Add_user from "./Add_user";
import Edit_user from './Edit_user';

// Composant historique
import History from "./History";

const App = () => {
  // Routes groupées par fonctionnalité
  const inventoryRoutes = [
    {
      path: "/List_inventory/:file",
      element: <List_inventory />
    },
    {
      path: "/Add_Inventory/:file",
      element: <Add_Inventory />
    },
    {
      path: '/Edit/:id',
      element: <Edit_inventory />
    }
  ];

  const userRoutes = [
    {
      path: "/List_user/:file",
      element: <List_user />
    },
    {
      path: "/Add_user/:file",
      element: <Add_user />
    },
    {
      path: '/Edit_user/:id/:nom',
      element: <Edit_user />
    }
  ];

  return (
    <HashRouter>
      <Routes>
        {/* Route de connexion */}
        <Route path="/" element={<Login />} />

        {/* Routes d'inventaire */}
        {inventoryRoutes.map(({ path, element }) => (
          <Route 
            key={path}
            path={path} 
            element={<ProtectedRoute>{element}</ProtectedRoute>} 
          />
        ))}

        {/* Routes utilisateurs */}
        {userRoutes.map(({ path, element }) => (
          <Route 
            key={path}
            path={path} 
            element={<ProtectedRoute>{element}</ProtectedRoute>} 
          />
        ))}

        {/* Route historique */}
        <Route 
          path="/history/:file" 
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;

