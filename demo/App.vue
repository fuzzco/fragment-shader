<template>
    <main class="class">
        <div class="single-shader">
            <fragment-shader>
                <script type="shader/fragment">
                    precision highp float;
                    uniform vec2 uResolution;
                    uniform sampler2D uImage;

                    void main() {
                        vec2 uv = gl_FragCoord.xy / uResolution.xy;
                        gl_FragColor = texture2D(uImage, uv);
                    }
                </script>
            </fragment-shader>
        </div>

        <div class="single-shader">
            <fragment-shader :uniforms="imageUniforms">
                <script type="shader/fragment">
                    precision highp float;
                    uniform vec2 uResolution;

                    void main() {
                        vec2 uv = gl_FragCoord.xy / uResolution.xy;
                        gl_FragColor = vec4(uv.x, 0.2, 0.2, 1.);
                    }
                </script>
            </fragment-shader>
        </div>

        <div class="single-shader">
            <fragment-shader>
                <script type="shader/fragment">
                    precision highp float;
                    uniform vec2 uResolution;
                    uniform float uTime;

                    #include <snoise>

                    void main() {
                        vec2 uv = gl_FragCoord.xy / uResolution.xy;
                        uv.x *= uResolution.x / uResolution.y;
                        vec4 color = vec4(vec3(1. - abs(snoise(uv + uTime * 0.0002))), 1.);
                        gl_FragColor = color;
                    }
                </script>
            </fragment-shader>
        </div>

        <div class="single-shader">
            <fragment-shader>
                <script type="shader/fragment">
                    precision highp float;
                    uniform vec2 uResolution;
                    uniform float uTime;

                    #include <snoise>
                    #include <rotate2d>

                    void main() {
                        vec2 uv = gl_FragCoord.xy / uResolution.xy;
                        uv -= vec2(0.5);
                        uv *= rotate2d(uTime * 0.00025);
                        uv += vec2(0.5);

                        vec4 color = vec4(vec3(1. - abs(snoise(uv))), 1.);
                        gl_FragColor = color;
                    }
                </script>
            </fragment-shader>
        </div>
    </main>
</template>

<script>
import FragmentShader from '../src/FragmentShader'

export default {
    components: {
        'fragment-shader': FragmentShader
    },
    computed: {
        imageUniforms() {
            return {
                uImage: {
                    type: 'image',
                    value:
                        'https://images.prismic.io/flores/8779cd82-4868-43c3-86b9-b83e934dce69_Center.jpg?auto=compress,format&rect=0,0,1920,1080&w=1920&h=1080'
                }
            }
        }
    }
}
</script>

<style lang="scss">
.class {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    .single-shader {
        width: 300px;
        height: 300px;
        position: relative;
        margin: 20px auto;
    }
}
</style>
