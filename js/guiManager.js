import Noodle from "./noodle.js";
import BallAndStick from "./ballAndStick.js";
import { StringUtils } from '../node_modules/igv-utils/src/index.js'
import { rgb255ToThreeJSColor } from "./color.js";
import { eventBus, noodle, ballAndStick, sceneManager, juiceboxPanel, ensembleManager } from "./app.js";

const $spacewalk_ui_manager_panel = $('#spacewalk_ui_manager_panel');

const zIndexPanelSelected = 1124;
const zIndexPanelUnselected = 1024;

class GUIManager {

    constructor ({ $button, $panel }) {

        $button.on('click.gui_manager', (e) => {
            e.preventDefault();
            $panel.toggle();
        });

        let $widgetPanels = undefined;
        $panel.find('input').each(function(unused) {

            const id = $(this).attr('data-target');

            if (undefined !== id) {

                const selectionString = `#${id}`;

                if (undefined === $widgetPanels) {
                    $widgetPanels = $(selectionString)
                } else {
                    $widgetPanels = $widgetPanels.add($(selectionString));
                }

            }
        });

        this.$widgetPanels = $widgetPanels;

        const input_id_list =
            [
                'spacewalk_ui_manager_groundplane',
                'spacewalk_ui_manager_gnomon',

                'spacewalk_ui_manager_ui_controls_color_ramp',
                'spacewalk_ui_manager_ui_controls_trace_select',
                'spacewalk_ui_manager_ui_controls_juicebox',
                'spacewalk_ui_manager_ui_controls_igv',
                'spacewalk_ui_manager_ui_controls_distance_map',
                'spacewalk_ui_manager_ui_controls_contact_frequency_map'
            ];

        configureVisibilityControl(input_id_list, $panel);

        configureRenderStyleControl($panel.find('#spacewalk-render-style-ball-stick'), BallAndStick.getRenderStyle());

        configureRenderStyleControl($panel.find('#spacewalk-render-style-noodle'), Noodle.getRenderStyle());

        // ball radius
        const $ball_radius_control = $('#spacewalk-ball-radius-control');

        $ball_radius_control.find('i.fa-minus-circle').on('click.spacewalk-ball-radius-minus', () => {
            ballAndStick.updateBallRadius(-1);
        });

        $ball_radius_control.find('i.fa-plus-circle').on('click.spacewalk-ball-radius-plus', () => {
            ballAndStick.updateBallRadius(1);
        });

        // stick radius
        const $stick_radius_control = $('#spacewalk-stick-radius-control');

        $stick_radius_control.find('i.fa-minus-circle').on('click.spacewalk-stick-radius-minus', () => {
            ballAndStick.updateStickRadius(-1);
        });

        $stick_radius_control.find('i.fa-plus-circle').on('click.spacewalk-stick-radius-plus', () => {
            ballAndStick.updateStickRadius(1);
        });

        // noodle radius
        const $noodle_radius_control = $('#spacewalk-noodle-radius-control');

        $noodle_radius_control.find('i.fa-minus-circle').on('click.spacewalk-noodle-radius-minus', () => {
            noodle.updateRadius(-1);
        });

        $noodle_radius_control.find('i.fa-plus-circle').on('click.spacewalk-noodle-radius-plus', () => {
            noodle.updateRadius(1);
        });


        const backgroundColorPickerConfig =
            {
                color: "#f00",
                move: color => {
                    const { r, g, b } = color.toRgb();
                     sceneManager.setBackground(rgb255ToThreeJSColor(r, g, b));
                }

            };

        $('#spacewalk_background_colorpicker').spectrum(backgroundColorPickerConfig);

        const groundplaneColorPickerConfig =
            {
                color: "#f00",
                move: color => {
                    const { r, g, b } = color.toRgb();
                    sceneManager.groundPlane.setColor (rgb255ToThreeJSColor(r, g, b));
                }

            };

        $('#spacewalk_ui_manager_groundplane_colorpicker').spectrum(groundplaneColorPickerConfig);

        const gnomonColorPickerConfig =
            {
                color: "#f00",
                move: color => {
                    const { r, g, b } = color.toRgb();
                    sceneManager.gnomon.setColor (rgb255ToThreeJSColor(r, g, b));
                }

            };

        $('#spacewalk_ui_manager_gnomon_colorpicker').spectrum(gnomonColorPickerConfig);

        eventBus.subscribe("DidSelectPanel", this);
        eventBus.subscribe('DidLoadEnsembleFile', this);

    }

    receiveEvent({ type, data }) {

        if ('DidSelectPanel' === type) {

            const $selected = data;
            const $unselected = this.$widgetPanels.not($selected);
            $selected.css('zIndex', zIndexPanelSelected);
            $unselected.css('zIndex', zIndexPanelUnselected);

        } else if ('DidLoadEnsembleFile' === type) {

            let str;

            const { sample, genomeAssembly, chr, genomicStart, genomicEnd } = data;

            $('#spacewalk_info_panel_genome').text( genomeAssembly );

            str = `${ chr } : ${StringUtils.numberFormatter(genomicStart) } - ${ StringUtils.numberFormatter(genomicEnd) }`;
            $('#spacewalk_info_panel_locus').text( str );

            str = `Sample ${ sample }`;
            $('#spacewalk_info_panel_ensemble').text( str );

            $('#spacewalk_info_panel_juicebox').text(juiceboxPanel.blurb());

            $('#spacewalk_info_panel').show();

            if (true === ensembleManager.isPointCloud) {
                $('#spacewalk_ui_manager_render_styles').hide();
            } else {
                $('#spacewalk_ui_manager_render_styles').show();
            }


        }
    }

}

const configureVisibilityControl = (input_id_list, $panel) => {

    for (let input_id of input_id_list) {

        const selector = '#' + input_id;
        const $input = $panel.find(selector);
        const change = 'change.' + input_id;

        $input.on(change, (e) => {

            e.preventDefault();

            if ('spacewalk_ui_manager_groundplane' === input_id) {
                sceneManager.groundPlane.toggle();
            } else if ('spacewalk_ui_manager_gnomon' === input_id) {
                sceneManager.gnomon.toggle();
            } else {
                const payload = $input.data('target');
                eventBus .post({ type: 'ToggleUIControl', data: { payload } });
            }
        });

    }

};

const configureRenderStyleControl = ($input, renderStyle) => {

    $input.val( renderStyle );

    $input.on('change.gui_manager.render_style_ball_stick', (e) => {
        e.preventDefault();
        eventBus .post({ type: "RenderStyleDidChange", data: $(e.target).val() });
    });

};

export const getGUIRenderStyle = () => {
    const id = $('#spacewalk_ui_manager_panel').find("input:radio[name='spacewalk-render-style']:checked").attr('id');
    return 'spacewalk-render-style-ball-stick' === id ? BallAndStick.getRenderStyle() : Noodle.getRenderStyle();
};

export const setGUIRenderStyle = renderStyle => {

    const $ui_manager_panel = $('#spacewalk_ui_manager_panel');

    if (renderStyle === Noodle.getRenderStyle()) {
        $ui_manager_panel.find('#spacewalk-render-style-noodle').prop('checked', true);
        eventBus .post({ type: "RenderStyleDidChange", data: renderStyle });
    } else if (renderStyle === BallAndStick.getRenderStyle()) {
        $ui_manager_panel.find('#spacewalk-render-style-ball-stick').prop('checked', true);
        eventBus .post({ type: "RenderStyleDidChange", data: renderStyle });
    }

};

export const doConfigureGroundplaneHidden = () => {
    const $input = $('#spacewalk_ui_manager_panel').find('#spacewalk_ui_manager_groundplane');
    return !($input.prop('checked'));
};

export const setGUIGroundplaneVisibility = status => {
    const $input = $('#spacewalk_ui_manager_panel').find('#spacewalk_ui_manager_groundplane');
    $input.prop('checked', status);
};

export const doConfigureGnomonHidden = () => {
    const $input = $('#spacewalk_ui_manager_panel').find('#spacewalk_ui_manager_gnomon');
    return !($input.prop('checked'));
};

export const setGUIGnomonVisibility = status => {
    const $input = $('#spacewalk_ui_manager_panel').find('#spacewalk_ui_manager_gnomon');
    $input.prop('checked', status);
};

export const doConfigurePanelHidden = panelID => {
    return !($('#spacewalk_ui_manager_panel').find(`[data-target='${ panelID }']`).prop('checked'));
};

export const setPanelVisibility = (panelID, status) => {
    $('#spacewalk_ui_manager_panel').find(`[data-target='${ panelID }']`).prop('checked', status);
};

export default GUIManager;
