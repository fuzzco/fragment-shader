<template>
    <main class="class">
        <div class="single-shader">
            <!-- Date.now() key allow live reload -->
            <fragment-shader :key="Date.now()">
                <script type="shader/fragment">
                    precision mediump float;
                    uniform vec2 uResolution;
                    uniform float uTime;

                    void main() {
                        vec2 uv = gl_FragCoord.xy / uResolution.xy;
                        uv.x *= uResolution.x / uResolution.y;
                        gl_FragColor = vec4(uv.x / 2., 0., 0., 1.);
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
    }
}
</style>
