var Shaders = {};


Shaders.BasicShader3 = {

    name: 'BasicShader3',

    uniforms: {
        'time' : {type: 'f', value: 0},
        'texture' : {value: null},
        'texture2' : {value: null}
    },

    vertexShader:

    `uniform float time;
    uniform sampler2D texture;
    varying vec2 vUv;
    void main(){
        vUv = uv;
        vec4  color1 = texture2D(texture, vUv);
        vec3 pos = position;
        
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    
    

    }`,

    fragmentShader:
 
    `uniform sampler2D texture;
    uniform sampler2D texture2;
    uniform float time;
    varying vec2 vUv;

    void main(){

        vec4  color1 = texture2D(texture, vUv);
        
        vec3  colorb = vec3(0.0,0.0,1.0);
        vec3  colorg = vec3(0.0,1.0,0.0);
        vec3  colormix = mix(colorb, colorg, color1.x);

        
        gl_FragColor = vec4(colormix,0.7);

       

    }`
};
