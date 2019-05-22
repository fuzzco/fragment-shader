<template>
    <div class="fragment-shader">
        <!-- the shader will go here -->
        <slot />
        <!-- and the result will be drawn here -->
        <canvas class="canvas" ref="canvas" />
    </div>
</template>

<script>
import snoise from './libs/snoise'

export default {
    props: {
        uniforms: {
            type: Object,
            default: () => {}
        },
        render: {
            type: Function,
            default: () => () => {}
        },
        timescale: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            alive: true
        }
    },
    mounted() {
        if (!window.shader) window.shader = 1

        // get the HTML of the first element in the default slot
        // to use as the shader
        let fragment = this.$slots.default[0].elm.innerHTML

        // include external functions
        fragment = fragment.replace('#include <snoise>', snoise)

        // include time and resolution as default uniforms
        const uniforms = {
            uTime: {
                type: 'float',
                value: 1.0
            },
            uResolution: {
                type: 'vec2',
                value: [this.$refs.canvas.width, this.$refs.canvas.height]
            },
            ...this.uniforms
        }

        // render function
        const render = ({ uTime, uResolution }) => {
            if (uTime) {
                uTime.value += 0.01666 * this.timescale
            }
            if (uResolution && this && this.$refs && this.$refs.canvas) {
                uResolution.value = [
                    this.$refs.canvas.width,
                    this.$refs.canvas.height
                ]
            }

            if (this.render && this.alive) {
                this.render()
            }
        }

        const Phenomenon = require('phenomenon-px').default

        // kick loop
        Phenomenon(fragment, uniforms, render, this.$refs.canvas)
    },
    beforeDestroy() {
        this.alive = false
    }
}
</script>

<style>
.fragment-shader,
.fragment-shader .canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
