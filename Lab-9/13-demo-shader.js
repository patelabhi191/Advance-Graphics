//author: Narendra Pershad Feb 8, 2019
//filename: 00-lab-base.js
//purpose: a useful base for threejs applications

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);
const clock = new THREE.Clock();

var __shader = Shaders.PartC3;


var orbitControls, controls,
    speed = 0.01,
    toRotate = true;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {
    camera.position.set(-30, 10, 30);
    camera.lookAt(scene.position);

    scene.add(new THREE.AmbientLight(0x666666));
    scene.position.set(0, -10, 0);

    let directionalLight = new THREE.DirectionalLight(0xeeeeee);
    directionalLight.position.set(20, 60, 10);
    directionalLight.castShadow = true;
    directionalLight.target = scene;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    let hemiSphereLight = new THREE.HemisphereLight(0x7777cc, 0x00ff00, 0.6);//skycolor, groundcolor, intensity  
    hemiSphereLight.position.set(0, 100, 0);
    scene.add(hemiSphereLight);
}

function createGeometry() {

    // if(___shader.uniforms.texture){
    //     ___shader.uniforms.texture.value = new THREE.TextureLoader().load( "../assets/textures/cheese.jpg" );
    // }

    scene.add(new THREE.AxesHelper(100));
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshLambertMaterial({ color: 0xeeeeee })
    );
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    //scene.add(plane);

    var mesh = new THREE.Mesh(
        new THREE.TorusKnotGeometry( 5, 1.5, 32,32),
        new THREE.ShaderMaterial({
            uniforms: __shader.uniforms,
            vertexShader: __shader.vertexShader,
            fragmentShader: __shader.fragmentShader
        })
    );
    mesh.position.set(-10, 10, -10);
    mesh.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    mesh.castShadow = true;
    scene.add(mesh);

    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10,32,32),
        new THREE.ShaderMaterial({
            uniforms: __shader.uniforms,
            vertexShader: __shader.vertexShader,
            fragmentShader: __shader.fragmentShader
        })
    );
    mesh.position.set(10, 10, -10);
    mesh.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    mesh.castShadow = true;
    scene.add(mesh);


    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100,100,100),
        new THREE.ShaderMaterial({
            uniforms: __shader.uniforms,
            vertexShader: __shader.vertexShader,
            fragmentShader: __shader.fragmentShader
        })
    );
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    console.log(`${__shader.name}`);
}

function setupDatGui() {

    controls = new function() {

        this.rotate = toRotate;
        this.ColorA = "#aabbcc"
        this.ColorB = "#aabbcc"
    }

    let gui = new dat.GUI();
    gui.add(controls, 'rotate').onChange((e) => toRotate = e);

    gui.addColor(controls, 'ColorA').onChange(function(e){

        if(___shader.uniforms.ColorA){
            let color = new THREE.Color(e);
            ___shader.uniforms.ColorA.value =  new THREE.Vector3(color.r, color.g, color.b);
            console.log("color a",___shader.uniforms.ColorA)
        }
    });

    gui.addColor(controls, 'ColorB').onChange(function(e){
        let v3 = new THREE.Vector3();
        if(___shader.uniforms.ColorB){
            let color = new THREE.Color(e);
            ___shader.uniforms.ColorB.value =  new THREE.Vector3(color.r, color.g, color.b);

        }
    });
    //let upperFolder = gui.addFolder('Upper arm');
    //upperFolder.add(controls, 'upperRotationX', -Math.PI * 0.5, Math.PI * 0.5);
    //upperFolder.add(controls, 'upperRotationY', -Math.PI * 0.5, Math.PI * 0.5);
    //upperFolder.add(controls, 'upperRotationZ', -Math.PI * 0.5, Math.PI * 0.5);

    
    //gui.add(controls, 'stop').name('Stop rotation').onChange((stop) => speed = !stop ? 0.01 : 0);

}

function render() {

    orbitControls.update();
    // if (toRotate)
    //     scene.rotation.y += speed;//rotates the scene  
    

    if(__shader.uniforms.time){
        __shader.uniforms.time.value = clock.getElapsedTime();
    }
   
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

window.onload = () => {

    init();
    setupCameraAndLight();
    createGeometry();
    setupDatGui();
    render();

}
