import * as THREE from "./threejs_es6/three.module.js";
import { globalEventBus } from "./eventBus.js";

import { fitToContainer, getMouseXY } from "./utils.js";
import { lerp, quantize } from "./math.js";
import { rgb255, rgb255Lerp, rgb255String } from "./color.js";

let currentSegmentIndex = undefined;
class ColorRampWidget {

    constructor({ panel, namespace, colors, highlightColor }) {

        this.colors = colors;
        let { r, g, b } = highlightColor;
        this.highlightColor = rgb255(r*255, g*255, b*255);

        const $panel = $(panel);

        // header
        this.$header = $panel.find('#trace3d_color_ramp_header');

        // ramp canvas
        const $canvas = $panel.find('canvas');
        const canvas = $canvas.get(0);

        fitToContainer(canvas);

        $canvas.on(('mousemove.trace3d.' + namespace), (event) => {
            event.stopPropagation();
            this.onCanvasMouseMove(canvas, event)
        });

        $canvas.on(('mouseenter.trace3d.' + namespace), (event) => {
            event.stopPropagation();
            currentSegmentIndex = undefined;
        });

        $canvas.on(('mouseleave.trace3d.' + namespace), (event) => {
            event.stopPropagation();
            currentSegmentIndex = undefined;
        });

        // soak up misc events
        let eventSink = e => { e.stopPropagation(); };
        $canvas.on(('mouseup.trace3d.' + namespace), eventSink);
        $canvas.on(('mousedown.trace3d.' + namespace), eventSink);
        $canvas.on(('click.trace3d.' + namespace), eventSink);

        // footer
        this.$footer = $panel.find('#trace3d_color_ramp_footer');

        this.context = canvas.getContext('2d');

        this.canvas = canvas;

        this.colors = colors;
    }

    configure({ genomicStart, genomicEnd, structureLength }) {

        this.structureLength = structureLength;

        const [ ss, ee ] = [ genomicStart / 1e6, genomicEnd / 1e6 ];
        this.$footer.text(ss + 'Mb');
        this.$header.text(ee + 'Mb');
        this.paintQuantizedRamp(this.context, this.colors, structureLength, undefined);
    }

    repaint () {
        this.paintQuantizedRamp(this.context, this.colors, this.structureLength, undefined);
    }

    onCanvasMouseMove(canvas, event) {

        let { yNormalized } = getMouseXY(canvas, event);

        // 0 to 1. Flip direction.
        yNormalized = 1.0 - yNormalized;

        // find bucket. 0 based.
        let quantized = quantize(yNormalized, this.structureLength);

        // scale to structure length
        quantized *= (this.structureLength - 1);

        // Convert to discrete value. Integer-ize.
        quantized = Math.ceil(quantized);

        // segment index is 1-based
        const segmentIndex = 1 + quantized;

        this.highlight(segmentIndex);

        if (currentSegmentIndex !== segmentIndex) {
            currentSegmentIndex = segmentIndex;
            globalEventBus.post({type: "DidSelectSegmentIndex", data: segmentIndex });
        }

    };

    highlight (segmentIndex) {
        this.paintQuantizedRamp(this.context, this.colors, this.structureLength, segmentIndex)
    }

    paintQuantizedRamp(ctx, colors, structureLength, highlightedSegmentIndex){

        const yIndices = new Array(ctx.canvas.offsetHeight);

        for (let y = 0;  y < yIndices.length; y++) {

            // 0 to 1 continuous
            const interpolant = y / (yIndices.length - 1);

            // 0 to 1 quantized into discrete steps
            let quantized = quantize(interpolant, structureLength);

            // flip direction
            quantized = 1.0 - quantized;

            // map to 1-based segment-index
            const segmentIndex = Math.round(quantized * structureLength);

            // console.log(Date.now() + ' segmentIndex ' + segmentIndex + ' quantized ' + quantized);

            if (highlightedSegmentIndex && highlightedSegmentIndex === segmentIndex) {
                ctx.fillStyle = rgb255String(this.highlightColor);
            } else {
                const { r, g, b } = rgb255Lerp(colors[ 0 ], colors[ 1 ], quantized);
                ctx.fillStyle = rgb255String({r, g, b});
            }

            ctx.fillRect(0, y, ctx.canvas.offsetWidth, 1);
        }

    }

    colorForInterpolant(interpolant) {
        const { r, g, b } = rgb255Lerp(this.colors[ 0 ], this.colors[ 1 ], interpolant);
        const str = `rgb(${r},${g},${b})`;
        return new THREE.Color( str );
    }

}

export default ColorRampWidget;
