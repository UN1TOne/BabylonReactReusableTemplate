import React, { useEffect, useState } from 'react';
import MainScene from '../3D/MainScene';
import { Engine } from '@babylonjs/core';
import BJSCanvas from './BJSCanvas';
import css from "./Mainpage.module.scss";

const MainPage: React.FC = () => {
    const [scene, setScene] = useState<MainScene | null>(null);
    const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement>();
    
    /*************************************************
     * Canvas Init
     */
    const onCanvasLoad = (engine: Engine, canvas?: HTMLCanvasElement) => {
        if (engine && canvas) {
            setCanvasElement(canvas);
            const mainScene = new MainScene(engine);
            setScene(mainScene);
        }
    };

    return (
        <>
            <div className={css.rootContainer}>
                <BJSCanvas onLoad={onCanvasLoad}></BJSCanvas> 
            </div>
        </>
    );
}

export default MainPage;

