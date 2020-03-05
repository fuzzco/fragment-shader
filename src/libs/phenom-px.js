// This is a modified version of the phenomenon-px package
// The main difference is that you need to pass in the Phenomenon class

export default function(phenom, fragment, uniforms, render, canvas, min, max) {
    new phenom({ canvas, position: { x: 0, y: 0, z: 100 } }).add(Date.now(), {
        vertex: `
      attribute vec3 aPosition;
      uniform mat4 uProjectionMatrix;
      uniform mat4 uModelMatrix;
      uniform mat4 uViewMatrix;
      void main(){
        gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(aPosition, 1.0);
      }
    `,
        fragment,
        uniforms,
        mode: 4,
        onRender: p => render(p.uniforms),
        geometry: {
            vertices: [
                { x: min, y: min, z: 0 },
                { x: min, y: max, z: 0 },
                { x: max, y: min, z: 0 },
                { x: max, y: max, z: 0 },
                { x: min, y: max, z: 0 },
                { x: max, y: min, z: 0 }
            ]
        }
    })
}
