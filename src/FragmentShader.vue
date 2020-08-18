<template>
    <div class="fragment-shader">
        <!-- the shader will go here -->
        <slot />
        <!-- and the result will be drawn here -->
        <full-canvas
            class="canvas"
            ref="canvas"
            @canvas-ready="initializeCanvas"
        />
    </div>
</template>

<script>
import FullCanvas from '@fuzzco/full-canvas'
import init from './gl/init'
import { vertex, fragment } from './libs/defaultShaders'
import buildShaders from './gl/buildShaders'
import buildPlane from './gl/buildPlane'

export default {
    components: { 'full-canvas': FullCanvas },
    data() {
        return {
            gl: null
        }
    },
    methods: {
        initializeCanvas(canvas) {
            // we will:
            // 1. initialize the canvas webgl context
            // 2. build our shaders
            // 3. render a plane where the fragment shader can live

            // initialize the canvas, saving the gl context
            const { gl } = init(canvas)
            this.gl = gl

            // build the desired shaders
            const programInfo = buildShaders(this.gl, vertex, fragment)

            buildPlane(gl, programInfo)
        }
    }
}

/*
import snoise from './libs/snoise'
import rotate2d from './libs/rotate2d'
import phenom from './libs/phenom-px'



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
        min: {
            type: Number,
            default: -100
        },
        max: {
            type: Number,
            default: 100
        }
    },
    data() {
        return {
            alive: true,
            startTime: 0
        }
    },
    mounted() {
        // // if (!window.shader) window.shader = 1
        // this.startTime = Date.now()
        //
        // // get the HTML of the first element in the default slot
        // // to use as the shader
        // let fragment = this.$slots.default[0].elm.innerHTML
        //
        // // include external functions
        // fragment = fragment.replace('#include <snoise>', snoise)
        // fragment = fragment.replace('#include <rotate2d>', rotate2d)
        //
        // // include time and resolution as default uniforms
        // const startingUniforms = {
        //     uTime: {
        //         type: 'float',
        //         value: 0.0
        //     },
        //     uResolution: {
        //         type: 'vec2',
        //         value: [this.$refs.canvas.width, this.$refs.canvas.height]
        //     },
        //     ...this.uniforms
        // }
        //
        // // render function
        // const render = uniforms => {
        //     if (uniforms.uTime) {
        //         uniforms.uTime.value = Date.now() - this.startTime
        //     }
        //     if (
        //         uniforms.uResolution &&
        //         this &&
        //         this.$refs &&
        //         this.$refs.canvas
        //     ) {
        //         uniforms.uResolution.value = [
        //             this.$refs.canvas.width,
        //             this.$refs.canvas.height
        //         ]
        //     }
        //
        //     // update passed uniforms each frame
        //     if (this.uniforms) {
        //         Object.keys(this.uniforms)
        //             .filter(Boolean)
        //             .forEach(u => {
        //                 uniforms[u].value = this.uniforms[u].value
        //             })
        //     }
        //
        //     // allow custom render function to be passed as prop
        //     if (this.render && this.alive) {
        //         this.render(uniforms)
        //     }
        // }
        //
        // const Phenomenon = require('phenomenon').default
        //
        // // kick loop
        // phenom(
        //     Phenomenon,
        //     fragment,
        //     startingUniforms,
        //     render,
        //     this.$refs.canvas,
        //     this.min,
        //     this.max
        // )
    },
    beforeDestroy() {
        this.alive = false
    }
}
*/
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
