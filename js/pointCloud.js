import * as THREE from "../node_modules/three/build/three.module.js";
import { setGeometryAttributeColorListWithColorThreeJS } from './color.js';
import { ensembleManager, eventBus, sceneManager } from "./app.js";
import EnsembleManager from "./ensembleManager.js";

const pointSize = 128;
class PointCloud {

    constructor () {

        const materialConfig =
            {
                size: pointSize,
                vertexColors: THREE.VertexColors,
                map: new THREE.TextureLoader().load( "texture/dot.png" ),
                sizeAttenuation: true,
                alphaTest: 0.5,
                transparent: true,
                depthTest: true
            };

        this.material = new THREE.PointsMaterial( materialConfig );
        this.material.side = THREE.DoubleSide;

        const deemphasizedConfig =
            {
                size: pointSize,
                vertexColors: THREE.VertexColors,
                map: new THREE.TextureLoader().load( "texture/dot.png" ),
                sizeAttenuation: true,
                alphaTest: 0.5,
                transparent: true,
                depthTest: true
            };

        this.deemphasizedMaterial = new THREE.PointsMaterial( deemphasizedConfig );
        this.deemphasizedMaterial.side = THREE.DoubleSide;

        eventBus.subscribe("DidLeaveGUI", this);
        eventBus.subscribe("DidSelectSegmentID", this);
        eventBus.subscribe("ColorRampMaterialProviderCanvasDidMouseMove", this);

    }

    receiveEvent({ type, data }) {

        const typeConditional = "DidSelectSegmentID" === type || "ColorRampMaterialProviderCanvasDidMouseMove" === type;

        if (typeConditional && sceneManager.renderStyle === PointCloud.getRenderStyle()) {

            if (this.meshList) {

                const { interpolantList } = data;

                const interpolantWindowList = EnsembleManager.getInterpolantWindowList({ trace: ensembleManager.currentTrace, interpolantList });

                if (interpolantWindowList) {

                    for (let mesh of this.meshList) {
                        mesh.material = this.deemphasizedMaterial;
                        setGeometryAttributeColorListWithColorThreeJS(mesh.geometry.attributes.color.array, mesh.geometry.userData.deemphasizedColor)
                    }

                    for (let { index } of interpolantWindowList) {
                        let mesh = this.meshList[ index ];
                        mesh.material = this.material;
                        setGeometryAttributeColorListWithColorThreeJS(mesh.geometry.attributes.color.array, mesh.geometry.userData.color)
                    }

                } // if (interpolantWindowList)

            } // if (this.meshList)

        } else if ("DidLeaveGUI" === type) {
            this.unHighlight();
        }

    }

    configure(trace) {

        this.dispose();

        this.meshList = this.createPointCloud(trace);

        if (sceneManager.renderStyle === PointCloud.getRenderStyle()) {
            this.show();
        } else {
            this.hide();
        }

    }

    createPointCloud(trace) {

        return trace
            .map(({ geometry }) => {
                let mesh = new THREE.Points( geometry, this.material );
                mesh.name = 'point_cloud';
                return mesh;
            });

    };

    updateMaterialProvider (materialProvider) {
        // do stuff
    }

    addToScene (scene) {
        for (let mesh of this.meshList) {
            scene.add( mesh );
        }
    }

    renderLoopHelper () {

        if (this.meshList) {
            for (let mesh of this.meshList) {
                mesh.geometry.attributes.color.needsUpdate = true;
            }
        }

    }

    hide () {
        for (let mesh of this.meshList) {
            mesh.visible = false;
        }
    }

    show () {
        for (let mesh of this.meshList) {
            mesh.visible = true;
        }
    }

    dispose () {

        if (this.meshList) {
            for (let mesh of this.meshList) {
                // mesh.material.dispose();
                mesh.geometry.dispose();
            }
        }

    }

    getBounds() {
        return pointCloudManager.getBounds();
    }

    unHighlight() {

        if (this.meshList) {

            for (let mesh of this.meshList) {
                mesh.material = this.material;
                setGeometryAttributeColorListWithColorThreeJS(mesh.geometry.attributes.color.array, mesh.geometry.userData.color)
            }

        }

    }

    static getRenderStyle() {
        return 'render-style-point-cloud';
    }
}

export default PointCloud;
