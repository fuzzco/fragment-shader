<template>
    <div class="fragment-shader">
        <!-- the shader will go here -->
        <slot />

        <canvas class="canvas" ref="canvas" />
    </div>
</template>

<script>
import Phenomenon from 'phenomenon-px'

export default {
    props: {
        uniforms: {
            type: Object,
            default: () => {}
        },
        render: {
            type: Function,
            default: () => () => {}
        }
    },
    mounted() {
        // get the HTML of the first element in the default slot
        // to use as the shader
        const fragment = this.$slots.default[0].elm.innerHTML

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
                uTime.value += 0.2
            }
            if (uResolution && this && this.$refs && this.$refs.canvas) {
                uResolution.value = [
                    this.$refs.canvas.width,
                    this.$refs.canvas.height
                ]
            }

            if (this.render) {
                this.render()
            }
        }

        // kick loop
        Phenomenon(fragment, uniforms, render, this.$refs.canvas)
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
