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
import snoise from './libs/snoise'
import rotate2d from './libs/rotate2d'
import get from 'lodash/get'
import FullCanvas from '@fuzzco/full-canvas'
import init from './gl/init'
import {
    vertex as defaultVertex,
    fragment as defaultFragment
} from './libs/defaultShaders'
import buildShaders from './gl/buildShaders'
import buildPlane from './gl/buildPlane'
import loadTexture from './gl/load-texture'

export default {
    components: { 'full-canvas': FullCanvas },
    props: {
        uniforms: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            gl: null,
            shaderProgram: {},
            canvas: null,
            builtUniforms: {},
            lastTime: Date.now(),
            time: 0,

            // image loading
            textures: {}
        }
    },
    methods: {
        initializeCanvas(canvas) {
            this.canvas = canvas

            // we will:
            // 1. initialize the canvas webgl context
            // 2. build our shaders
            // 3. render a plane where the fragment shader can live

            // initialize the canvas, saving the gl context
            const { gl } = init(canvas)
            this.gl = gl

            // fetch user-defined fragment shader
            const fragmentVNode = get(this.$slots, 'default', []).find(
                h => get(h, 'data.attrs.type', '') === 'shader/fragment'
            )
            let fragment = get(fragmentVNode, 'elm.innerHTML', null)

            // include external functions
            fragment = fragment.replace('#include <snoise>', snoise)
            fragment = fragment.replace('#include <rotate2d>', rotate2d)

            // fetch user-defined vertex shader
            const vertexVNode = get(this.$slots, 'default', []).find(
                h => get(h, 'data.attrs.type', '') === 'shader/vertex'
            )
            let vertex = get(vertexVNode, 'elm.innerHTML', null)

            // build the desired shaders
            this.shaderProgram = buildShaders(
                this.gl,
                vertex || defaultVertex,
                fragment || defaultFragment
            )

            // kick render loop
            this.render()
        },
        render() {
            // update time
            this.time += Date.now() - this.lastTime
            this.lastTime = Date.now()

            // prep to load images
            const images = {}

            // filter out images
            const nonImageUniforms = Object.keys(this.uniforms || {}).reduce(
                (acc, curr) => {
                    const uni = this.uniforms[curr]
                    if (uni.type === 'image') {
                        images[curr] = uni
                    } else {
                        acc[curr] = uni
                    }

                    return acc
                },
                {}
            )

            // load unloaded images
            const loadedImages = Object.keys(images).reduce((acc, curr) => {
                const target = images[curr]

                if (!this.textures[target.value]) {
                    const texture = this.loadTexture(target.value, this.gl)
                    this.textures[target.value] = texture
                }

                acc[curr] = {
                    type: '1i',
                    value: 0,
                    url: target.value
                }

                return acc
            }, {})

            // build uniforms
            const toBuild = {
                uTime: {
                    type: 'float',
                    value: this.time
                },
                uResolution: {
                    type: 'vec2',
                    value: [this.canvas.width, this.canvas.height]
                },
                ...loadedImages,
                ...nonImageUniforms
            }

            buildPlane(this.gl, this.programInfo)

            Object.keys(toBuild).map(key => {
                const uni = toBuild[key]

                const args = [
                    this.gl.getUniformLocation(this.shaderProgram, key),
                    uni.value
                ]

                if (uni.url) {
                    this.gl.activeTexture(this.gl.TEXTURE0)

                    // Bind the texture to texture unit 0
                    this.gl.bindTexture(
                        this.gl.TEXTURE_2D,
                        this.textures[uni.url]
                    )
                    // TODO: start here - can't find location of `key`
                    console.log(
                        this.gl.getUniformLocation(this.shaderProgram, key)
                    )
                    this.gl.uniform1i(args[1], 0)
                }

                if (this.uniformMap[uni.type]) {
                    this.uniformMap[uni.type](...args)
                } else {
                    this.gl[`uniform${uni.type}`](...args)
                }

                // if (!uniformValueSetFunction) {
                //     console.warn(`No uniform method for type ${uni.type}`)
                //     return
                // }
                // console.log(uniformValueSetFunction)
            })

            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)

            requestAnimationFrame(this.render)
        },
        loadTexture
    },
    computed: {
        uniformMap() {
            // from phenomenon - https://github.com/vaneenige/phenomenon/blob/master/src/index.ts
            return {
                float: (loc, val) => this.gl.uniform1f(loc, val),
                vec2: (loc, val) => this.gl.uniform2fv(loc, val),
                vec3: (loc, val) => this.gl.uniform3fv(loc, val),
                vec4: (loc, val) => this.gl.uniform4fv(loc, val),
                mat2: (loc, val) => this.gl.uniformMatrix2fv(loc, false, val),
                mat3: (loc, val) => this.gl.uniformMatrix3fv(loc, false, val),
                mat4: (loc, val) => this.gl.uniformMatrix4fv(loc, false, val)
            }
        },
        programInfo() {
            return {
                program: this.shaderProgram,
                attribLocations: {
                    vertexPosition: this.gl.getAttribLocation(
                        this.shaderProgram,
                        'aVertexPosition'
                    )
                },
                uniformLocations: {
                    projectionMatrix: this.gl.getUniformLocation(
                        this.shaderProgram,
                        'uProjectionMatrix'
                    ),
                    modelViewMatrix: this.gl.getUniformLocation(
                        this.shaderProgram,
                        'uModelViewMatrix'
                    )
                }
            }
        }
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
