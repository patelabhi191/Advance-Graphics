var Shaders = {};

Shaders.BasicShader = {

    name:'BasicShader1',

    uniforms: {
        'time' : {type:'f', value:0}
    },  

    vertexShader: [

        'void main(){',

        'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',

        '}'

        ].join( '\n' ),

    fragmentShader: [
        'uniform float time;',

        'void main(){',

        'gl_FragColor = vec4(abs(sin(time)), abs(sin(time*3.0)), 0, 0.5);',

        '}'

    ].join( '\n' )


};

Shaders.BasicShader2 = {

    name:'BasicShader2',

    uniforms: {
        'time' : {type:'f', value:0}
    },  

    vertexShader: [

        'void main(){',

        'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',

        '}'

        ].join( '\n' ),

    fragmentShader: [
        'uniform float time;',

        'vec3 colora = vec3(0.149,0.141,0.929);',

        'vec3 colorb = vec3(1.0,0.852,0.520);',

        'void main(){',

        'vec3 color = mix(colora, colorb, abs(sin(time)));',

        'gl_FragColor = vec4(abs(sin(time)), abs(sin(time*3.0)), 0, 0.5);',

        '}'

    ].join( '\n' )


};

Shaders.BasicShader3 = {

    name:'BasicShader3',

    uniforms: {
        'time' : {type:'f', value:0},
        'texture' : {value: null}
    },  

    vertexShader: [

        'varying vec2 vUv;',

        'void main(){',
        
        'vUv = uv;',

        'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',

        '}'

        ].join( '\n' ),

    fragmentShader: [

        'uniform sampler2D texture;',

        'uniform float time;',

        'varying vec2 vUv;',

        'void main(){',

        'vec4 color = texture2D(texture,vUv);',

        'gl_FragColor = color;',

        '}'

    ].join( '\n' )


};
