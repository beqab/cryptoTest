import * as React from "react";
import { AppRouter } from "../router/AppRouter";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Main } from "../components/main/Main";
import { useHistory } from "react-router";

export const AppContent: React.FC = () => {
  const [isFull, setIsFull] = React.useState<boolean>(true);
  const history = useHistory();
  const [allowCookies, setAllowCookies] = React.useState<number | string>(0);

  React.useEffect(() => {
    setIsFull(history.location.pathname === "/");
    history.listen((location) => {
      setIsFull(location.pathname === "/");
    });
  }, [history.location]);

  return (
    <div className={`App ${!isFull ? "App-full" : ""}`}>
      <div className="app-bg"></div>
      <div className="app-container">
        <Header />
        <Main>
          {!localStorage.getItem("allowCookies" || allowCookies) && (
            <div className="accessCookies">
              <span>
                This site uses cookies to help make it more useful to you.
              </span>
              <button
                onClick={() => {
                  setAllowCookies("1");
                  localStorage.setItem("allowCookies", "1");
                }}
                className="mt-3"
              >
                ACCEPT
              </button>
            </div>
          )}
          <AppRouter />
        </Main>
        <Footer />
      </div>
    </div>
  );
};
