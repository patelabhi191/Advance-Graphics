/// <reference path="../libs/three.min.js" />
/// <reference path="../libs/dat.gui.min.js" />
/// <reference path="../libs/orbitcontrols.js" />

//author: Narendra Pershad Feb 8, 2019
//filename: 05-lab-medieval-wheel.js
//purpose: a useful base for threejs applications

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls,
    speed = 0.01,
    toRotate = true;

var wheel;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {
    camera.position.set(-100, 50, 40);
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

    let spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(10, 4, 10);
    spotlight.lookAt(scene.position);
    //spotlight.castShadow = true;
    scene.add(spotlight);
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

    //let mesh = new THREE.Mesh(
    //    new THREE.BoxGeometry(10, 10, 10),
    //    new THREE.MeshLambertMaterial({ color: 0x7777ff })
    //);
    //mesh.position.set(0, 10, 0);
    //mesh.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    //mesh.castShadow = true;
    //scene.add(mesh);




    let wheel = createWheel(12, 11, 2, 12); //outer, inner, axle, numberOfSpokes
    wheel.position.set(0, 14, 0);
    scene.add(wheel);
}

function createWheel(outerRadius, innerRadius, axleRadius, numberOfSpokes) {

    //container
    wheel = new THREE.Object3D();
    //outer rim
    let shape = new THREE.Shape();
    shape.absarc(0, 0, outerRadius);
    //// remove the center of the above rim
    var center = new THREE.Path();
    center.absarc(0, 0, innerRadius);
    shape.holes.push(center);

    var extrudeSettings = {
        depth: 4,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: .5,
        bevelSize: 1,
        bevelSegments: 1,
        curveSegments: 24
    };
    let geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.translate(0, 0, -extrudeSettings.depth * 0.5);
    let rim = new THREE.Mesh(
        geom,
        new THREE.MeshStandardMaterial({ color: 0x774444 })
    );
    rim.castShadow = true;
    wheel.add(rim);

    //12 spokes
    let mat = new THREE.MeshStandardMaterial({ color: 0xdd7700 });
    geom = new THREE.CylinderGeometry(1.2, 1.2, innerRadius);
    geom.scale(1, 1, 1.4);
    geom.translate(0, innerRadius * 0.5, 0); 
    let spoke = new THREE.Mesh(geom, mat);
    spoke.castShadow = true;
    wheel.add(spoke);
    let angle = Math.PI * 2 / numberOfSpokes;
    for (let i = 1; i < numberOfSpokes; i++) {
        let clone = spoke.clone();
        clone.rotation.z = angle * i;
        wheel.add(clone);
    }

    //inner axle
    let axle = new THREE.Mesh(
        new THREE.CylinderGeometry(axleRadius, axleRadius, 5.8),
        new THREE.MeshStandardMaterial({ color: 0x774444 })
    );
    axle.rotation.x = Math.PI * 0.5;
    wheel.add(axle);
    wheel.castShadow = true;

    return wheel;
}

function setupDatGui() {

    controls = new function() {

        this.rotate = toRotate;

    }

    let gui = new dat.GUI();
    gui.add(controls, 'rotate').onChange((e) => toRotate = e);
    //let upperFolder = gui.addFolder('Upper arm');
    //upperFolder.add(controls, 'upperRotationX', -Math.PI * 0.5, Math.PI * 0.5);
    //upperFolder.add(controls, 'upperRotationY', -Math.PI * 0.5, Math.PI * 0.5);
    //upperFolder.add(controls, 'upperRotationZ', -Math.PI * 0.5, Math.PI * 0.5);

    
    //gui.add(controls, 'stop').name('Stop rotation').onChange((stop) => speed = !stop ? 0.01 : 0);

}

function render() {

    orbitControls.update();
    if (toRotate)
        scene.rotation.y += speed;//rotates the scene  
    wheel.rotation.z += speed;
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
