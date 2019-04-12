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

    `varying vec2 vUv;

    void main(){

        vUv = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    }`,

    fragmentShader:
 
    `uniform sampler2D texture;
    uniform sampler2D texture2;
    uniform float time;
    varying vec2 vUv;

    void main(){

        vec4  color1 = texture2D(texture, vUv);
        vec4  color2 = texture2D(texture2, vUv);
        vec4  colormix1 = mix(color1, color2 ,0.4);
        vec4  colormix2 = mix(color1, color2 ,0.6);
        vec4  colormixer1 = mix(color1, colormix1, abs(sin(time)));
        vec4  colormixer2 = mix(colormix2, color2, abs(sin(time)));
        vec4  colormixers = mix(colormixer1, colormixer2, abs(sin(time)));
        gl_FragColor = vec4(colormixers);

    }`
};
