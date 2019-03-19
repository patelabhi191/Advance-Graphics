/// <reference path="../libs/three.min.js" />
/// <reference path="../libs/dat.gui.min.js" />
/// <reference path="../libs/orbitcontrols.js" />

//author: Narendra Pershad Feb 15, 2019
//filename: 05-demo-translate-rotate-scale.js
//purpose: demonstrate scaling, rotation and translate

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

let orbitControls, cube, length = 20,
    speed = 0.01,
    toRotate = true;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {
    camera.position.set(-50, 20, 20);
    camera.lookAt(scene.position);

    scene.add(new THREE.AmbientLight(0x666666));

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

    scene.add(new THREE.GridHelper(40, 8));
    scene.add(new THREE.AxesHelper(50));
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 40),
        new THREE.MeshLambertMaterial({ color: 0xeeeeee })
    );
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    //scene.add(plane);

    resetCube();

}

function resetCube() {

    if (cube !== undefined){

        scene.remove(cube);
        console.log('removing existing mesh');
    }

    cube = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, length, 24),
        new THREE.MeshLambertMaterial({ color: 0x7777ff })
    );
    //cube.position.set(0, 10, 0);
    cube.castShadow = true;
    let arrow_length = 6;
    let x_direction = new THREE.Vector3(1, 0, 0);
    let y_direction = new THREE.Vector3(0, 1, 0);
    let z_direction = new THREE.Vector3(0, 0, 1);
    let orig = new THREE.Vector3(0, length * 0.5, 0);

    let arrow = new THREE.ArrowHelper(x_direction, orig, arrow_length, 0xff0000);
    cube.add(arrow);
    arrow = new THREE.ArrowHelper(y_direction, orig, arrow_length, 0x00ff00);
    cube.add(arrow);
    arrow = new THREE.ArrowHelper(z_direction, orig, arrow_length, 0x0000ff);
    cube.add(arrow);
    console.log('adding a new mesh');
    scene.add(cube);

}

function rotateCube(angle) { cube.rotation.z += angle; console.log(`rotating about z-axis ${angle}`);}
function scaleCube(x, y, z) { cube.geometry.scale(x, y, z); console.log(`scaling ( ${x}, ${y}, ${z}`);}
function translateCube(x, y, z) { cube.geometry.translate(x, y, z); console.log(`translating ( ${x}, ${y}, ${z}`);}
//function rotateCube(angle) { cube.rotation.set(.z = angle; }

function rad(deg) { return Math.PI * deg / 180;}

function setupDatGui() {

    let controls = new function () {

        this.rotateScene = toRotate;
        this.resetMesh = function () { resetCube() };
        this.rotateMesh = function () { rotateCube(Math.PI * 0.5) };
        this.scaleHeightGeometry = function () { scaleCube(1, 2, 1) };
        this.scaleWidthGeometry = function () { scaleCube(2, 1, 1) };
        this.translateGeometry = function () { translateCube(0, length * 0.5, 0) };

    }

    let gui = new dat.GUI();
    gui.add(controls, 'rotateScene').name('Scene revolution').onChange((e) => toRotate = e);
    gui.add(controls, 'resetMesh');
    gui.add(controls, 'rotateMesh');
    gui.add(controls, 'scaleHeightGeometry');
    gui.add(controls, 'scaleWidthGeometry');
    gui.add(controls, 'translateGeometry');
    //gui.add(controls, '');
    
}

function render() {

    orbitControls.update();
    if (toRotate)
        scene.rotation.y += speed;//rotates the scene  
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
