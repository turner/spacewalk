import { makeDraggable } from "./draggable.js";
import { globalEventBus } from "./eventBus.js";

let currentURL = undefined;

class JuiceboxPanel {

    constructor ({ container, panel }) {

        this.container = container;

        this.$panel = $(panel);

        layout(container, panel);

        makeDraggable(panel, $(panel).find('.trace3d_card_drag_container').get(0));

        $(window).on('resize.trace3d.juicebox_panel', () => { this.onWindowResize(container, panel) });

        $(panel).on('mouseenter.trace3d.juicebox_panel', (event) => {
            event.stopPropagation();
            globalEventBus.post({ type: "DidEnterGUI" });
        });

        $(panel).on('mouseleave.trace3d.juicebox_panel', (event) => {
            event.stopPropagation();
            globalEventBus.post({ type: "DidLeaveGUI" });
        });

        // URL
        const $url_input = $('#trace3d_juicebox_panel_url_input');
        $url_input.val('');

        const $url_button = $('#trace3d_juicebox_panel_url_button');

        $url_input.on('change.trace3d_juicebox_panel_url_input', (event) => {
            event.stopPropagation();
            currentURL = event.target.value;
        });

        const $spinner_container = $('#trace3d_hic_url_form_group');

        $url_button.on('click.trace3d_juicebox_panel_url_button', async (event) => {

            event.stopPropagation();

            $url_input.trigger('change.trace3d_juicebox_panel_url_input');
            await this.loadURL({ url: currentURL, $spinner: $spinner_container.find('.spinner-border')});
            $url_input.val('');
            currentURL = undefined;

        });


        globalEventBus.subscribe("ToggleUIControls", this);
    }

    receiveEvent({ type }) {
        if ("ToggleUIControls" === type) {
            this.$panel.toggle();
        }
    }

    async createBrowser (config) {

        const urlShortenerConfig =
            [
                {
                    provider: "bitly",
                    apiKey: "ABCD",        // TODO -- replace with your Bitly access token
                    hostname: 'bit.ly'
                },
                {
                    provider: "google",
                    apiKey: "ABCD",        // TODO -- replace with your Google API Key
                    hostname: "goo.gl"
                }
            ];

        hic.setURLShortener(urlShortenerConfig);

        try {
            const browser = await hic.createBrowser(config.container, config);
            layout(this.container, this.$panel.get(0));
            this.browser = browser;
            return browser;
        } catch (error) {
            console.warn(error.message);
            return undefined;
        }
    }

    async goto({ chr, start, end }) {
        this.locus = chr + ':' + start + '-' + end;
        await this.browser.parseGotoInput(this.locus);
    }

    async defaultConfiguration () {

        const config =
            {
                url: "https://hicfiles.s3.amazonaws.com/hiseq/gm12878/in-situ/HIC010.hic",
                name: "Rao and Huntley et al. | Cell 2014 GM12878 (human) in situ MboI HIC010 (47M)",
                isControl: false
            };

        await this.browser.loadHicFile(config);
        await this.goto({ chr:'chr21', start:28e6, end:30e6 });
    }

    async loadURL({ url, $spinner }){

        url = url || '';

        if ('' !== url) {
            $spinner.show();

            await this.browser.loadHicFile({ url });
            await this.browser.parseGotoInput(this.locus);
            $spinner.hide();
        }

    };

    onWindowResize(container, panel) {
        layout(container, panel);
    };

}

let layout = (container, element) => {

    // const { left, top, right, bottom, x, y, width, height } = container.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const left = (containerRect.width - elementRect.width)/2;
    const top = containerRect.height - 1.05 * elementRect.height;

    $(element).offset( { left, top } );

};

export default JuiceboxPanel;