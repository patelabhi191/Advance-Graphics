

//author: Narendra Pershad Feb 8, 2019
//filename: 09-lab-base.js
//purpose: a useful base for threejs applications

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
    renderer.setClearColor(0x008b99);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {
    camera.position.set(-50, 5, 0);
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

    scene.add(new THREE.AxesHelper(100));
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 60),
        new THREE.MeshLambertMaterial({ color: 0xeeeeee })
    );
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    __shader.uniforms.texture.value = new THREE.TextureLoader().load('https://t6.rbxcdn.com/ca2124f3dc2ac4cbe1b8affec342aae0');
    __shader.uniforms.texture2.value = new THREE.TextureLoader().load('https://res.cloudinary.com/teepublic/image/private/s--c9kcdTc7--/t_Preview/b_rgb:fb9392,c_limit,f_jpg,h_630,q_90,w_630/v1497775393/production/designs/1676022_1.jpg');
    // https://t6.rbxcdn.com/ca2124f3dc2ac4cbe1b8affec342aae0
    // https://i.imgur.com/f8MBbej.jpg

    let material = new THREE.ShaderMaterial(
    	{
    		uniforms: __shader.uniforms,
    		vertexShader: __shader.vertexShader,
    		fragmentShader: __shader.fragmentShader
    	});

    mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10),material);

    mesh.position.set(0, 10, 15);
    mesh.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    mesh.castShadow = true;
    scene.add(mesh);

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
    gui.add(controls, 'rotate').name('Object Rotation').onChange((e) => toRotate = e);


}

function render() {

    orbitControls.update();
    if (toRotate){
     //   scene.rotation.y += speed;//rotates the scene  

     mesh.rotation.x += 0.002;
     mesh.rotation.y += 0.003;
     mesh.rotation.z += 0.004;
     torusKnot.rotation.x += 0.004;
     torusKnot.rotation.y += 0.003;
     torusKnot.rotation.z += 0.002;


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
