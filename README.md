Vue component to drop in a WebGL shader anywhere for <10kb. [Demo](https://fuzzco.github.io/fragment-shader/)

```html
<!-- Add the `fragment-shader` component to start the shader -->
<fragment-shader>
    <!-- Add a `shader/fragment` script to include a fragment shader -->
    <script type="shader/fragment">
        precision highp float;

        // Available uniforms
        uniform float uTime; // ms since start
        uniform vec2 uResolution; // { x: width, y: height }

        void main() {
            vec2 uv = gl_FragCoord.xy / uResolution.xy;
            gl_FragColor = vec4(uv.x, 0.2, 0.2, 1.);
        }
    </script>
</fragment-shader>
```

## Table of Contents

## TODO

-   Common replacements with [THREE.js #include convention](https://github.com/SaFrMo/vue-three-wrap/blob/master/example/FragmentShader.vue#L9)
    -   snoise
    -   rotate2d
