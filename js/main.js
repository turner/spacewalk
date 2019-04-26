import { globalEventBus } from './eventBus.js';
import GUIManager from './guiManager.js';
import SceneManager from './sceneManager.js';
import StructureManager from './structureManager.js';

// Data File Load Modal
import DataFileLoadModal from './dataFileLoadModal.js';
import { structureFileLoadModalConfigurator, juiceboxFileLoadModalConfigurator } from './dataFileLoadModal.js';

// IGV Panel
import IGVPanel from './igv/IGVPanel.js';
import * as IGVConfigurator from './igv/igvConfigurator.js';

// Track Load Controller
import TrackLoadController from './igv/trackLoadController.js';
import { trackLoadControllerConfigurator } from './igv/trackLoadController.js';

// Juicebox Panel
import JuiceboxPanel from './juicebox/juiceboxPanel.js';

// Structure Select Panel
import StructureSelectPanel from './structureSelectPanel.js';

import BallAndStick from './ballAndStick.js';
import Noodle from './noodle.js';

import { sceneManagerConfigurator } from './sceneManager.js';

import { mainEventListener } from './mainEventListener.js';

let structureFileLoadModal;
let juiceboxFileLoadModal;

let guiManager;

let structureSelectPanel;
let igvPanel;
let juiceboxPanel;

let sceneManager;
let structureManager;

let noodle;
let ballAndStick;

let trackLoadController;

let googleEnabled = false;

let igvBrowser;
let juiceboxBrowser;

let main = async container => {

    guiManager = new GUIManager({ $button: $('#trace3d_ui_manager_button'), $panel: $('#trace3d_ui_manager_panel') });

    structureSelectPanel = new StructureSelectPanel({ container, panel: $('#trace3d_structure_select_panel').get(0), isHidden: guiManager.isPanelHidden('trace3d_structure_select_panel') });

    juiceboxPanel = new JuiceboxPanel({ container, panel: $('#trace3d_juicebox_panel').get(0), isHidden: guiManager.isPanelHidden('trace3d_juicebox_panel') });

    igvPanel = new IGVPanel({ container, panel: $('#trace3d_igv_panel').get(0), isHidden: guiManager.isPanelHidden('trace3d_igv_panel') });

    juiceboxBrowser = await juiceboxPanel.createBrowser({ container: $('#trace3d_juicebox_root_container'), width: 400, height: 400 });
    juiceboxPanel.defaultConfiguration();

    igvBrowser = await igvPanel.createBrowser(IGVConfigurator.browser);

    const trackLoadControllerConfig = trackLoadControllerConfigurator(igvBrowser, IGVConfigurator.trackRegistryFile, googleEnabled, $('#igv-app-multiple-file-load-modal'));
    trackLoadController = new TrackLoadController(trackLoadControllerConfig);

    sceneManager = new SceneManager(sceneManagerConfigurator(container));
    sceneManager.defaultConfiguration();

    structureManager = new StructureManager();

    structureFileLoadModal = new DataFileLoadModal(structureFileLoadModalConfigurator());

    juiceboxFileLoadModal = new DataFileLoadModal(juiceboxFileLoadModalConfigurator());

    noodle = new Noodle();

    ballAndStick = new BallAndStick();

    renderLoop();

    globalEventBus.subscribe('DidSelectStructure', mainEventListener);
    globalEventBus.subscribe('DidLoadFile', mainEventListener);
    globalEventBus.subscribe('ToggleAllUIControls', mainEventListener);
};

let setup = ({ chr, genomicStart, genomicEnd, structure }) => {

    let [ structureLength, structureExtent, cameraPosition, structureCentroid ] = [ structure.array.length, structure.extent, structure.cameraPosition, structure.centroid ];

    sceneManager.configure({ chr, genomicStart, genomicEnd, structureLength, structureExtent, cameraPosition, structureCentroid });

    noodle.configure(structure.array, sceneManager.colorRampPanel.colorRampWidget);
    noodle.addToScene(sceneManager.scene);
    // noodle.hide();

    ballAndStick.configure(structure.array);
    ballAndStick.addToScene(sceneManager.scene);
    ballAndStick.hide();

};

let renderLoop = () => {

    requestAnimationFrame( renderLoop );

    if (sceneManager.scene && sceneManager.orbitalCamera) {
        noodle.renderLoopHelper();
        ballAndStick.renderLoopHelper();
        sceneManager.renderer.render(sceneManager.scene, sceneManager.orbitalCamera.camera);
    }

};

export { main, setup, structureSelectPanel, igvBrowser, igvPanel, juiceboxBrowser, juiceboxPanel, trackLoadController, sceneManager, structureManager, guiManager };
