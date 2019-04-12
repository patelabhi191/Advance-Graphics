var Shaders = {};

Shaders.BasicShader = {

    name: 'BasicShader',

    uniforms: {},

    vertexShader:

    `void main(){

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    }`,

    fragmentShader:

    `void main(){

        gl_FragColor = vec4(1.0, 0, 0, 0.5);

    }`
};

Shaders.BasicShader1 = {

    name: 'BasicShader1',

    uniforms: {
        'time' : {type: 'f', value: 0}
    },

    vertexShader:

    `void main(){

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    }`,

    fragmentShader:
 
    `uniform float time;

    void main(){

        gl_FragColor = vec4(abs(sin(time)), abs(sin(time * 3.0)), 0, 0.5);

    }`
};

Shaders.BasicShader2 = {

    name: 'BasicShader2',

    uniforms: {
        'time' : {type: 'f', value: 0}
    },

    vertexShader:

    `void main(){

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    }`,

    fragmentShader:
 
    `uniform float time;
    vec3 colora = vec3(0.149, 0.141, 0.929);
    vec3 colorb = vec3(1.0, 0.852, 0.520);

    void main(){

        vec3  color = mix(colora, colorb, abs(sin(time)));
        gl_FragColor = vec4(color, 1.0);

    }`
};

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
        pos.z -= (3.0 * color1.x)*abs(sin(time)) ;
        
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
