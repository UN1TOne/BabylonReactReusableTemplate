import { useEffect, useRef } from "react";
import { Engine, WebGPUEngine } from "@babylonjs/core";
import css from './BJSCanvas.module.scss';
import { GLTFFileLoader } from "@babylonjs/loaders";

type BJSCanvasProps = {
    onLoad: (engine: Engine | WebGPUEngine, canvas?: HTMLCanvasElement) => void
}

const BJSCanvas = (props: BJSCanvasProps) => {
    const babylonCanvas = useRef<HTMLCanvasElement>(null);

    /** 
     * WebGL
     */
    /*

useEffect(() => {
    if (babylonCanvas?.current) {
        const engine = new Engine(babylonCanvas.current, true, {premultipliedAlpha: false, preserveDrawingBuffer: true, stencil: true}, true);
        GLTFFileLoader.IncrementalLoading = false;

        const resize = () => {
            if (babylonCanvas?.current && babylonCanvas.current.parentElement) {
                babylonCanvas.current.width = babylonCanvas.current.parentElement.offsetWidth;
                babylonCanvas.current.height = babylonCanvas.current.parentElement.offsetHeight;
            }
            engine.resize();
        };
        resize();

        if (window) {
            window.removeEventListener("resize", resize);
            window.addEventListener("resize", resize);
        }

        if (props.onLoad) {
            props.onLoad(engine, babylonCanvas.current);
        }

        return () => {
            engine.dispose();

            if (window) {
                window.removeEventListener("resize", resize);
            }
        };
    }
}, [babylonCanvas]);
*/


    /**
     * WebGPU
     */

    useEffect(() => {
        async function setupWebGPU() {
            let engine: WebGPUEngine | Engine | null = null;

            if (babylonCanvas?.current) {
                const isWebGPUIsSupported = await WebGPUEngine.IsSupportedAsync;

                if (isWebGPUIsSupported) {
                    engine = new WebGPUEngine(babylonCanvas.current, { premultipliedAlpha: false, stencil: true, antialias: true });
                    await (engine as WebGPUEngine).initAsync();
                } else {
                    engine = new Engine(babylonCanvas.current, true, { premultipliedAlpha: false, preserveDrawingBuffer: true, stencil: true, antialias: true }, true);
                }

                engine.enableOfflineSupport = false;
                engine.disableManifestCheck = true;
                engine.disablePerformanceMonitorInBackground = true;
                engine.renderEvenInBackground = false;
                engine.setHardwareScalingLevel(1.0);

                babylonCanvas.current.focus();

                const resize = () => {
                    if (babylonCanvas?.current && babylonCanvas.current.parentElement) {
                        babylonCanvas.current.width = babylonCanvas.current.parentElement.offsetWidth;
                        babylonCanvas.current.height = babylonCanvas.current.parentElement.offsetHeight;
                    }
                    engine?.resize();
                };
                resize();

                if (window) {
                    window.removeEventListener("resize", resize);
                    window.addEventListener("resize", resize);
                }
                if (props.onLoad) {
                    props.onLoad(engine, babylonCanvas.current);
                }

                return () => {
                    engine?.dispose();

                    if (window) {
                        window.removeEventListener("resize", resize);
                    }
                };
            }
        }

        setupWebGPU();
    }, [babylonCanvas]);


    return (
        <div className={css.canvasContainer}>
            <canvas ref={babylonCanvas}></canvas>
        </div>
    );
};

export default BJSCanvas;