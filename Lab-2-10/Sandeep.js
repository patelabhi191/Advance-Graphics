
const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);
const clock = new THREE.Clock();

const __shader = Shaders.BasicShader3;

var orbitControls, controls,
    speed = 0.01,
    toRotate = true;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {
    camera.position.set(-50, 15, 20);
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

    //scene.add(new THREE.AxesHelper(100));
    

    __shader.uniforms.texture.value = new THREE.TextureLoader().load('noise-black.jpg');
  

    let material = new THREE.ShaderMaterial(
    	{
    		uniforms: __shader.uniforms,
    		vertexShader: __shader.vertexShader,
    		fragmentShader: __shader.fragmentShader
        });
        
        let plane = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50, 50, 50),material);
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI * 0.5;
        scene.add(plane);

    geometry = new THREE.SphereGeometry( 8, 32, 32 );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    sphere.position.set(0, 10, 10);
    
    
       

    var geo = new THREE.TorusKnotGeometry( 5, 1, 100, 16 );
    torusKnot = new THREE.Mesh( geo, material );
    torusKnot.position.set(0,10,-15);
    torusKnot.castShadow = true;
    torusKnot.rotation.y=1.57;
    scene.add( torusKnot );

}

function setupDatGui() {

    controls = new function() {

        this.rotate = toRotate;

    }

    let gui = new dat.GUI();
    gui.add(controls, 'rotate').onChange((e) => toRotate = e);


}

function render() {

    orbitControls.update();
    if (toRotate){
     //   scene.rotation.y += speed;//rotates the scene  
    }
    __shader.uniforms.time.value = clock.getElapsedTime();
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
