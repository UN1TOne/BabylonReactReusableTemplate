import {
    ArcRotateCamera,
    Engine,
    Scene,
    SceneLoader,
    TransformNode,
    Vector3,
    Color4,
    HemisphericLight,
    DirectionalLight,
    ShadowGenerator,
    Nullable,
    PointLight,
    Tools,
} from "@babylonjs/core";
import { GLTFFileLoader } from "@babylonjs/loaders";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

class MainScene extends Scene {
    engine: Engine;
    isScenePaused: boolean = false;
    sceneRoot: Nullable<TransformNode> = null;
    camera: Nullable<ArcRotateCamera> = null;
    shadowGenerator: Nullable<ShadowGenerator> = null;
    dirLight: Nullable<DirectionalLight> = null;
    pointLight: Nullable<PointLight> = null;
    
    constructor(engine: Engine) {
        super(engine, { useClonedMeshMap: true, useMaterialMeshMap: true, useGeometryUniqueIdsMap: true });
        this.engine = engine;
        this.init();
    }

    protected init() {
        GLTFFileLoader.IncrementalLoading = false;
        
        this.animationsEnabled = true;
        this.collisionsEnabled = false;

        this.addDefaultCameras();
        this.addDefaultLights();
        this.loadModels();

        this.engine.runRenderLoop(() => {
            if (!this.isScenePaused) {
                this.render();
            }
        });
    }

    addDefaultCameras() {
        const camera = new ArcRotateCamera("ArcRotateCamera", Math.PI/2,  Tools.ToRadians(90), 30, new Vector3(0, 3, 0), this, true);
        camera.attachControl();
        camera.wheelDeltaPercentage = 0.015;
        camera.zoomToMouseLocation = true;

        camera.inertia = 0.6
        camera.panningInertia = 0.6;

        camera.minZ = 0.1;
        camera.maxZ = 1000;

        camera.fov = 0.7;

        camera.lowerRadiusLimit = 1;
        camera.upperRadiusLimit = 100;

        this.camera = camera;
    }

    addDefaultLights() {
        const hemiLight = new HemisphericLight("Hemi Light", new Vector3(0, 1, 0), this);
        hemiLight.intensity = .5;
 
        this.dirLight = new DirectionalLight("Directional Light", new Vector3(-1, -2, -1), this);
        this.dirLight.position = new Vector3(0, 10, 0);
        this.dirLight.intensity = 3;

        this.clearColor = new Color4(255 / 255, 190 / 255, 152 / 255, 1); // color of the year 2024 by Pantone (PeachFuzz) #FFBE98
    }


    loadModels() {
        // [1]. Import mesh from local path
        SceneLoader.ImportMesh("", "/assets/", "UNIT logo.glb", this, function (meshes, particleSystems, skeletons, animations) {   
            const model = meshes[0];  
        });
         
        // [2]. Import mesh from git storage
        // SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/UN1TOne/3DAsset/master/", "UNIT logo.glb", this, (meshes, particleSystems, skeletons, animations) => {          
        //     const model = meshes[0];
        // });
        
        // [3]. Load assets and append them to scene from git storage
        // SceneLoader.Append("https://raw.githubusercontent.com/UN1TOne/3DAsset/master/", "UNIT logo.glb", this, (scene) => {          
        //     const model = scene.meshes.filter(m=> m.name === "__root__")[0];
        // });
    
        // [4]. Load assets and not append them to scene from git storage
        // SceneLoader.LoadAssetContainer("https://raw.githubusercontent.com/UN1TOne/3DAsset/master/", "UNIT logo.glb", this, (container) => {
        //     const meshes = container.meshes[0];

        //     container.addAllToScene();
        // });
    }
}

export default MainScene;
