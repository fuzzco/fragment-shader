(function(n){function e(e){for(var r,a,s=e[0],l=e[1],c=e[2],f=0,h=[];f<s.length;f++)a=s[f],o[a]&&h.push(o[a][0]),o[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(n[r]=l[r]);u&&u(e);while(h.length)h.shift()();return i.push.apply(i,c||[]),t()}function t(){for(var n,e=0;e<i.length;e++){for(var t=i[e],r=!0,s=1;s<t.length;s++){var l=t[s];0!==o[l]&&(r=!1)}r&&(i.splice(e--,1),n=a(a.s=t[0]))}return n}var r={},o={app:0},i=[];function a(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=n,a.c=r,a.d=function(n,e,t){a.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},a.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},a.t=function(n,e){if(1&e&&(n=a(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)a.d(t,r,function(e){return n[e]}.bind(null,r));return t},a.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return a.d(e,"a",e),e},a.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},a.p="/fragment-shader/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;i.push(["a1ec","chunk-vendors"]),t()})({"0b73":function(n,e,t){e=n.exports=t("2350")(!1),e.push([n.i,".fragment-shader,.fragment-shader .canvas{position:absolute;top:0;left:0;width:100%;height:100%}",""])},"46ba":function(n,e,t){var r=t("c0c8");"string"===typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);var o=t("499e").default;o("1f36de2f",r,!0,{sourceMap:!1,shadowMode:!1})},"5a44":function(n,e,t){var r=t("0b73");"string"===typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);var o=t("499e").default;o("0cc0ffa0",r,!0,{sourceMap:!1,shadowMode:!1})},"6e90":function(n,e,t){"use strict";var r=t("5a44"),o=t.n(r);o.a},a1ec:function(n,e,t){"use strict";t.r(e);var r=t("2b0e"),o=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("main",{staticClass:"class"},[t("div",{staticClass:"single-shader"},[t("fragment-shader",[t("script",{attrs:{type:"shader/fragment"}},[n._v("\n                precision highp float;\n                uniform vec2 uResolution;\n\n                void main() {\n                    vec2 uv = gl_FragCoord.xy / uResolution.xy;\n                    gl_FragColor = vec4(uv.x, 0.2, 0.2, 1.);\n                }\n            ")])])],1),t("div",{staticClass:"single-shader"},[t("fragment-shader",[t("script",{attrs:{type:"shader/fragment"}},[n._v("\n                precision highp float;\n                uniform vec2 uResolution;\n                uniform float uTime;\n\n                #include <snoise>\n\n                void main() {\n                    vec2 uv = gl_FragCoord.xy / uResolution.xy;\n                    uv.x *= uResolution.x / uResolution.y;\n                    vec4 color = vec4(vec3(1. - abs(snoise(uv + uTime * 0.0002))), 1.);\n                    gl_FragColor = color;\n                }\n            ")])])],1),t("div",{staticClass:"single-shader"},[t("fragment-shader",[t("script",{attrs:{type:"shader/fragment"}},[n._v("\n                precision highp float;\n                uniform vec2 uResolution;\n                uniform float uTime;\n\n                #include <snoise>\n                #include <rotate2d>\n\n                void main() {\n                    vec2 uv = gl_FragCoord.xy / uResolution.xy;\n                    uv -= vec2(0.5);\n                    uv *= rotate2d(uTime * 0.00025);\n                    uv += vec2(0.5);\n\n                    vec4 color = vec4(vec3(1. - abs(snoise(uv))), 1.);\n                    gl_FragColor = color;\n                }\n            ")])])],1)])},i=[],a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"fragment-shader"},[n._t("default"),t("full-canvas",{ref:"canvas",staticClass:"canvas",on:{"canvas-ready":n.initializeCanvas}})],2)},s=[],l="//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : stegu\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//               https://github.com/stegu/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat snoise(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289(i); // Avoid truncation effects in permutation\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n\t\t+ i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}",c="mat2 rotate2d(float _angle){\n    return mat2(cos(_angle),-sin(_angle),\n                sin(_angle),cos(_angle));\n}",u=t("9b02"),f=t.n(u),h=t("1b9b"),m=t.n(h),d=function(n){const e=n.getContext("webgl");if(null!==e)return e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),{gl:e};console.warn("Unable to initialize WebGL. Your browser or machine may not support it.")};const v="\nattribute vec4 aVertexPosition;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvoid main() {\n  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n}\n",p="\nvoid main() {\n  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n}\n";var g=function(n,e,t){const r=x(n,n.VERTEX_SHADER,e),o=x(n,n.FRAGMENT_SHADER,t),i=n.createProgram();return n.attachShader(i,r),n.attachShader(i,o),n.linkProgram(i),n.getProgramParameter(i,n.LINK_STATUS)?i:(console.warn("Unable to initialize the shader program: "+n.getProgramInfoLog(i)),null)};function x(n,e,t){const r=n.createShader(e);return n.shaderSource(r,t),n.compileShader(r),n.getShaderParameter(r,n.COMPILE_STATUS)?r:(console.warn("An error occurred compiling the shaders: "+n.getShaderInfoLog(r)),n.deleteShader(r),null)}let y="undefined"!==typeof Float32Array?Float32Array:Array;Math.random;Math.PI;function b(){let n=new y(16);return y!=Float32Array&&(n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0),n[0]=1,n[5]=1,n[10]=1,n[15]=1,n}function w(n,e,t){let r,o,i,a,s,l,c,u,f,h,m,d,v=t[0],p=t[1],g=t[2];return e===n?(n[12]=e[0]*v+e[4]*p+e[8]*g+e[12],n[13]=e[1]*v+e[5]*p+e[9]*g+e[13],n[14]=e[2]*v+e[6]*p+e[10]*g+e[14],n[15]=e[3]*v+e[7]*p+e[11]*g+e[15]):(r=e[0],o=e[1],i=e[2],a=e[3],s=e[4],l=e[5],c=e[6],u=e[7],f=e[8],h=e[9],m=e[10],d=e[11],n[0]=r,n[1]=o,n[2]=i,n[3]=a,n[4]=s,n[5]=l,n[6]=c,n[7]=u,n[8]=f,n[9]=h,n[10]=m,n[11]=d,n[12]=r*v+s*p+f*g+e[12],n[13]=o*v+l*p+h*g+e[13],n[14]=i*v+c*p+m*g+e[14],n[15]=a*v+u*p+d*g+e[15]),n}function _(n,e,t,r,o){let i,a=1/Math.tan(e/2);return n[0]=a/t,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=a,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[11]=-1,n[12]=0,n[13]=0,n[15]=0,null!=o&&o!==1/0?(i=1/(r-o),n[10]=(o+r)*i,n[14]=2*o*r*i):(n[10]=-1,n[14]=-2*r),n}Math.hypot||(Math.hypot=function(){var n=0,e=arguments.length;while(e--)n+=arguments[e]*arguments[e];return Math.sqrt(n)});var M=function(n,e){const t=P(n);n.clearColor(0,0,0,1),n.clearDepth(1),n.enable(n.DEPTH_TEST),n.depthFunc(n.LEQUAL),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT);const r=45*Math.PI/180,o=n.canvas.clientWidth/n.canvas.clientHeight,i=.1,a=100,s=b();_(s,r,o,i,a);const l=b();w(l,l,[-0,0,-6]);{const r=2,o=n.FLOAT,i=!1,a=0,s=0;n.bindBuffer(n.ARRAY_BUFFER,t.position),n.vertexAttribPointer(e.attribLocations.vertexPosition,r,o,i,a,s),n.enableVertexAttribArray(e.attribLocations.vertexPosition)}n.useProgram(e.program),n.uniformMatrix4fv(e.uniformLocations.projectionMatrix,!1,s),n.uniformMatrix4fv(e.uniformLocations.modelViewMatrix,!1,l);{const e=0,t=4;n.drawArrays(n.TRIANGLE_STRIP,e,t)}};function P(n){const e=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,e);const t=[-100,100,100,100,-100,-100,100,-100];return n.bufferData(n.ARRAY_BUFFER,new Float32Array(t),n.STATIC_DRAW),{position:e}}var A={components:{"full-canvas":m.a},props:{uniforms:{type:Object,default:()=>{}}},data(){return{gl:null,shaderProgram:{},canvas:null,builtUniforms:{},lastTime:Date.now(),time:0}},methods:{initializeCanvas(n){this.canvas=n;const{gl:e}=d(n);this.gl=e;const t=f()(this.$slots,"default",[]).find(n=>"shader/fragment"===f()(n,"data.attrs.type",""));let r=f()(t,"elm.innerHTML",null);r=r.replace("#include <snoise>",l),r=r.replace("#include <rotate2d>",c);const o=f()(this.$slots,"default",[]).find(n=>"shader/vertex"===f()(n,"data.attrs.type",""));let i=f()(o,"elm.innerHTML",null);this.shaderProgram=g(this.gl,i||v,r||p),this.render()},render(){this.time+=Date.now()-this.lastTime,this.lastTime=Date.now();const n={uTime:{type:"float",value:this.time},uResolution:{type:"vec2",value:[this.canvas.width,this.canvas.height]},...this.uniforms};Object.keys(n).map(e=>{const t=n[e],r=this.uniformMap[t.type]||this.gl["uniform"+t.type]||this.gl[t.type];r?r(this.gl.getUniformLocation(this.shaderProgram,e),t.value):console.warn("No uniform method for type "+t.type)}),M(this.gl,this.programInfo),requestAnimationFrame(this.render)}},computed:{uniformMap(){return{float:(n,e)=>this.gl.uniform1f(n,e),vec2:(n,e)=>this.gl.uniform2fv(n,e),vec3:(n,e)=>this.gl.uniform3fv(n,e),vec4:(n,e)=>this.gl.uniform4fv(n,e),mat2:(n,e)=>this.gl.uniformMatrix2fv(n,!1,e),mat3:(n,e)=>this.gl.uniformMatrix3fv(n,!1,e),mat4:(n,e)=>this.gl.uniformMatrix4fv(n,!1,e)}},programInfo(){return{program:this.shaderProgram,attribLocations:{vertexPosition:this.gl.getAttribLocation(this.shaderProgram,"aVertexPosition")},uniformLocations:{projectionMatrix:this.gl.getUniformLocation(this.shaderProgram,"uProjectionMatrix"),modelViewMatrix:this.gl.getUniformLocation(this.shaderProgram,"uModelViewMatrix")}}}}},C=A,T=(t("6e90"),t("2877")),R=Object(T["a"])(C,a,s,!1,null,null,null),L=R.exports,F={components:{"fragment-shader":L}},S=F,E=(t("dfa1"),Object(T["a"])(S,o,i,!1,null,null,null)),O=E.exports;r["a"].config.productionTip=!1,new r["a"]({render:n=>n(O)}).$mount("#app")},c0c8:function(n,e,t){e=n.exports=t("2350")(!1),e.push([n.i,".class{position:absolute;top:0;left:0;width:100vw;height:100vh}.class .single-shader{width:300px;height:300px;position:relative;margin:20px auto}",""])},dfa1:function(n,e,t){"use strict";var r=t("46ba"),o=t.n(r);o.a}});
//# sourceMappingURL=app.c8bf81b8.js.map