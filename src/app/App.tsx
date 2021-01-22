import "../styles/App.scss";
import {AppContent} from "./app-content/AppContent";
import {ModalManagers} from "./modal/ModalManagers";
import {Providers} from "./providers/Providers";
import React from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
    return (
        <Providers>
            <AppContent />
            <ModalManagers />
            <ToastContainer />
        </Providers>
    );
};

export default App;
