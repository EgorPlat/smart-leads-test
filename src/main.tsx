import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './ui/App';
import { Provider } from 'react-redux';
import { store } from './store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ScenariosList from './pages/ScenariosList/ScenariosList';
import EditorPage from './pages/EditorPage/EditorPage';
import './styles.css';

const router = createBrowserRouter([
    { 
        path: '/', 
        element: <App />, 
        children: [
            { index: true, element: <ScenariosList /> },
            { path: '/editor/:id', element: <EditorPage /> },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);
