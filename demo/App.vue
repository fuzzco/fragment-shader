<template>
    <main class="class">
        <div class="single-shader">
            <fragment-shader :key="Date.now()">
                <script type="shader/fragment">
                    precision mediump float;
                    uniform vec2 uResolution;
                    uniform float uTime;

                    void main() {
                        vec2 uv = gl_FragCoord.xy / uResolution.xy;
                        gl_FragColor = vec4(uv.x, 0.2, 0.2, 1.);
                    }
                </script>
            </fragment-shader>
        </div>

        <div class="single-shader">
            <!-- Date.now() key allows live reload -->
            <fragment-shader :key="Date.now() + 1">
                <script type="shader/fragment">
                    precision mediump float;
                    uniform vec2 uResolution;
                    uniform float uTime;

                    #include <snoise>

                    void main() {
                        vec2 uv = gl_FragCoord.xy / uResolution.xy;
                        uv.x *= uResolution.x / uResolution.y;
                        vec4 color = vec4(vec3(1. - abs(snoise(uv + uTime * 0.2))), 1.);
                        gl_FragColor = color;
                    }
                </script>
            </fragment-shader>
        </div>

        <div class="single-shader">
            <!-- Date.now() key allows live reload -->
            <fragment-shader :key="Date.now() + 2">
                <script type="shader/fragment">
                    precision mediump float;
                    uniform vec2 uResolution;
                    uniform float uTime;

                    #include <snoise>
                    #include <rotate2d>

                    void main() {
                        vec2 uv = gl_FragCoord.xy / uResolution.xy;
                        uv -= vec2(0.5);
                        uv *= rotate2d(uTime / 4.);
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
