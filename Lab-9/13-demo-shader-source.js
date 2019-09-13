var Shaders = {};

Shaders.BasicShader1 = {

    name: "Basic Shader 1",

    uniforms:{

    },

    vertexShader:
        `
        
        varying vec2 vUv;

        void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
        }`
    ,

    fragmentShader: 
        `


        void main(){

            gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0);
        }`
        
    ,
    

}


Shaders.BasicShader2 = {

    name: "Basic Shader 1",
    
    uniforms:{
        time: {type: 'f', value: 0}
    },

    vertexShader:
        `
        
        varying vec2 vUv;

        uniform float time;

        void main(){
            vUv = uv;
            vec3 pos = position;
            pos.z += ( 2.0 * sin(time)) * sin( pos.x* 0.10 + time ) + ( sin(pos.y* 0.2 + time + 0.5) );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0);
        }`
    ,

    fragmentShader: 
        `


        void main(){

            gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0);
        }`
        
    ,
    

}

Shaders.BasicShader3 = {

    name: "Basic Shader 3",
    
    uniforms:{
        time: {type: 'f', value: 0}
    },

    vertexShader:
        `
        
        varying vec2 vUv;
        varying vec3 vNormal;

        uniform float time;

        void main(){
            vNormal = normal;
            vUv = uv;
            vec3 pos = position;
            pos.z += ( 2.0 * sin(time)) * sin( pos.x* 0.10 + time ) + ( sin(pos.y* 0.2 + time + 0.5) );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0);
        }`
    ,

    fragmentShader: 
        `
        varying vec3 vNormal;
        varying vec2 vUv;

        void main(){

            gl_FragColor = vec4( vUv, 0.0, 1.0);
        }`
        
    ,
    

}

Shaders.PartC1 = {

    name: "Basic Shader 4",
    
    uniforms:{
        time: {type: 'f', value: 0}
    },

    vertexShader:
        `
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec4 objectOrigin;

        uniform float time;

        void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
        }`
    ,

    fragmentShader: 
        `
        varying vec3 vNormal;
        varying vec2 vUv;

        void main(){
            
            float pct = distance( vUv , vec2(0.5));
            vec3 color = mix( vec3(1, 0.874, 0.219), vec3(1.0, 0.0, 0.0), sin( pct) );
            gl_FragColor = vec4( color,  1.0);
        }`
        
    ,
    

}


Shaders.PartC2 = {

    name: "Basic Shader 4",
    
    uniforms:{
        time: {type: 'f', value: 0}
    },

    vertexShader:
        `
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec4 objectOrigin;

        uniform float time;

        void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
        }`
    ,

    fragmentShader: 
        `
        varying vec3 vNormal;
        varying vec2 vUv;

        void main(){
            
            float pct = distance( vUv , vec2(0.5)) * 50.0;
            vec3 color = mix( vec3(1, 0.874, 0.219), vec3(1.0, 0.0, 0.0), sin( pct) );
            gl_FragColor = vec4( color,  1.0);
        }`
        
    ,
    

}



Shaders.PartC3 = {

    name: "Basic Shader 4",
    
    uniforms:{
        time: {type: 'f', value: 0}
    },

    vertexShader:
        `
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec4 objectOrigin;

        uniform float time;

        void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
        }`
    ,

    fragmentShader: 
        `
        varying vec3 vNormal;
        varying vec2 vUv;

        uniform float time;

        void main(){
            
            float pct = distance( vUv , vec2(0.5)) * 50.0;
            vec3 color = mix( vec3(1, 0.874, 0.219), vec3(1.0, 0.0, 0.0), sin( pct) + sin(time) * 2.0  );
            gl_FragColor = vec4( color,  1.0);
        }`
        
    ,
    

}



Shaders.PartC4 = {

    name: "Basic Shader 4",
    
    uniforms:{
        time: {type: 'f', value: 0}
    },

    vertexShader:
        `
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec4 objectOrigin;

        uniform float time;

        void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
        }`
    ,

    fragmentShader: 
        `
        varying vec3 vNormal;
        varying vec2 vUv;

        uniform float time;

        void main(){
            
            float pct = distance( vUv , vec2(0.5)) * 50.0 * sin(time);
            vec3 color = mix( vec3(1, 0.874, 0.219), vec3(1.0, 0.0, 0.0), sin( pct) );
            gl_FragColor = vec4( color,  1.0);
        }`
        
    ,
    

}