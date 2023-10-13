import './App.css';
import './assets/scss/base/_app.module.scss'
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes";

function App() {
    return (
        <>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </>
    )
}

export default App;
