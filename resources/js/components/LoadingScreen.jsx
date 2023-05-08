import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { LoadingContext } from "./LoadingContext";
import anim from '@img/img/anim.png';

export const LoadingScreen = ({children}) => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const handleToggle = () => {
    setIsLoading((prev) => !prev);
  };

  return (
    <>
    <CSSTransition
      in={isLoading}
      timeout={300}
      classNames="loading-screen"
      unmountOnExit
    >
      <div>
        <div className={isLoading ? "loading-spinner" : ''}>
        </div>
      </div>
    </CSSTransition>
          {/* <button onClick={handleToggle}>isLoading true</button> */}
          </>
  );
};
