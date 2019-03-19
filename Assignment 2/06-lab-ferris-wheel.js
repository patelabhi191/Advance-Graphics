/// <reference path="../libs/three.min.js" />
/// <reference path="../libs/dat.gui.min.js" />
/// <reference path="../libs/orbitcontrols.js" />

//author: Narendra Pershad Feb 8, 2019
//filename: 05-lab-medieval-wheel.js
//purpose: a useful base for threejs applications

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

let orbitControls, controls,
    speed = 0.005;

let wheel;
let baskets = [];

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

    let directionalLight = new THREE.DirectionalLight(0xdddddd, 1);
    directionalLight.position.set(20, 80, 10);
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

    //scene.add(new THREE.AxesHelper(100));
    let texture = new THREE.TextureLoader().load('../assets/textures/dried-grass.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);

    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(400, 600),
        new THREE.MeshLambertMaterial({ color: 0xeeeeee, map: texture })
    );
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    wheel = createWheel(12, 11, 3, 2, 1.6, 14); //outer, inner, axle, numberOfSpokes
    wheel.position.set(0, 20, 0);
    //wheel.castShadow = true;
    scene.add(wheel);
}

function createWheel(outerRadius, innerRadius, rimWidth, axleRadius, spokeLength, numberOfSpokes) {

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
        depth: 1,
        bevelEnabled: false,
        curveSegments: 256
    };
    let geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.translate(0, 0, -extrudeSettings.depth * 0.5 + rimWidth);
    let rimF = new THREE.Mesh(
        geom,
        new THREE.MeshStandardMaterial({ color: 0x774444 })
    );
    rimF.castShadow = true;
    rimF.name='Rim front'
    wheel.add(rimF);
    let rimB = rimF.clone();
    rimB.translateZ(-2 * rimWidth);
    rimB.name = 'Rim back'
    wheel.add(rimB);

    //now the spokes
    let mat = new THREE.MeshStandardMaterial({ color: 0xdd7700 });
    geom = new THREE.BoxGeometry(1, innerRadius * spokeLength, 0.6);
    //geom.scale(0.6, 1, 1.4);
    geom.translate(0, innerRadius * 0.5, rimWidth); 
    let originalSpoke = new THREE.Mesh(geom, mat);
    //originalSpoke.castShadow = true;
    originalSpoke.name = 'Spoke';
    let basket = createBasket(outerRadius, rimWidth);
    let spoke = originalSpoke.clone();
    baskets.push(basket);
    spoke.add(basket);
    wheel.add(spoke);

    let tmpSpoke = originalSpoke.clone();
    tmpSpoke.translateZ(-2 * rimWidth);
    wheel.add(tmpSpoke);

    let angle = Math.PI * 2 / numberOfSpokes;
    for (let i = 1; i < numberOfSpokes; i++) {
        let clone = originalSpoke.clone();
        clone.rotation.z = angle * i;
        wheel.add(clone);

        tmpSpoke = clone.clone();
        tmpSpoke.translateZ(-2 * rimWidth);
        wheel.add(tmpSpoke);

        basket = basket.clone();
        basket.rotation.z = -angle * i;
        baskets.push(basket);
        clone.add(basket);
    }

    //inner axle
    let axle = new THREE.Mesh(
        new THREE.CylinderGeometry(axleRadius, axleRadius, 4 * rimWidth),
        new THREE.MeshStandardMaterial({ color: 0x774444 })
    );
    axle.rotation.x = Math.PI * 0.5;
    wheel.add(axle);
    wheel.castShadow = true;
    return wheel;
}

function createBasket(outerRadius, rimWidth) {

    let sphere = new THREE.Mesh(
        new THREE.SphereGeometry(rimWidth * 0.45, 12, 5, 0, Math.PI * 2, 1, 2),
        new THREE.MeshLambertMaterial({
            color: 0xff69b4,
            wireframe: false,
            side: THREE.DoubleSide,
            transparent: false,
            opacity: 0.8
        })
    );
    sphere.translateY(-2);
    sphere.castShadow = true;
    let basket = new THREE.Object3D();
    basket.name = 'basket';
    basket.add(sphere);
    let support = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 2, 0.35),
        new THREE.MeshLambertMaterial({ color: 0xffaaaa })
    );
    support.translateY(-1);
    support.castShadow = true;
    basket.add(support);

    support = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.35, 2 * rimWidth),
        new THREE.MeshLambertMaterial({ color: 0xffaaaa })
    );
    support.castShadow = true;
    basket.add(support);
    basket.translateY(outerRadius + 2);
    return basket;
}

function setupDatGui() {

    controls = new function() {
        this.rotateScene = false;
        this.rotateWheel = true;
      
    }
    let gui = new dat.GUI();
    gui.add(controls, 'rotateScene').onChange((e) => rotateScene = e);
    gui.add(controls, 'rotateWheel').onChange((e) => rotateWheel = e);
}

function render() {

    orbitControls.update();
    if (controls.rotateScene)
        scene.rotation.y += speed;//rotates the scene  
    if (controls.rotateWheel) {
        wheel.rotation.z += speed;
        baskets.forEach((basket) => basket.rotation.z -= speed);
        //baskets[0].rotation.z -= speed;
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
