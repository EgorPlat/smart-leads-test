import { Outlet, Link, useLocation } from 'react-router-dom';
import 'reactflow/dist/style.css';

export function App() {
    const location = useLocation();
    return (
        <div className="app">
            <header className="header">
                <Link to="/" className="logo">Конструктор сценариев</Link>
                <nav className="nav">
                    {location.pathname !== '/' && <Link to="/" className="btn">Список сценариев</Link>}
                </nav>
            </header>
            <main className="main">
                <Outlet />
            </main>
        </div>
    );
}
