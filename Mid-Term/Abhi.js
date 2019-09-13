const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls,
    speed = 0.01,
    toRotate = true;

let spotlight, armMaterial, towerMaterial, arms;

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

    spotlight = new THREE.SpotLight(0xaaaaaa,2);
    spotlight.position.set(0, 10, 20);
    spotlight.lookAt(scene.position);
    spotlight.castShadow = true;
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



}
function createWindmillMaterials() {

    armMaterial = new THREE.MeshLambertMaterial({
        color: 0x4c7be8,
        opacity: 0.8,
        transparent: true,
        wireframe: false
    });

    towerMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        metalness: 0.6
    });
}

function createWindmill(armlength, towerHeight, numberOfArms, armIncline = 0.25) {

    let windmill = new THREE.Object3D();             //creates an empty container

    arms = new THREE.Object3D();                        //creates an empty container

    let geom = new THREE.BoxGeometry( 4, armlength, 0.2 );
    geom.translate( 0, armlength * 0.5, 3 );            //change the origin for rotation later
    geom.rotateY(armIncline);
    let arm = new THREE.Mesh(geom, armMaterial);
    arm.castShadow = true;
    arms.add(arm);

    let angle = Math.PI * 2 / numberOfArms;             //arm angle
    for (let i = 1; i < numberOfArms; i++) {

        let clone = arm.clone();
        clone.rotation.z = angle * i;
        arms.add(clone);
    }

    let axleLength = 4;
    geom = new THREE.CylinderGeometry(0.5, 0.5, axleLength, 24, 1);
    geom.translate(0, axleLength * 0.5, 0);
    let axle = new THREE.Mesh(geom, towerMaterial);
    axle.rotation.x = Math.PI / 2;
    arms.add(axle);
    arms.position.set(0, towerHeight * 0.5 - 1, 1.8);
    windmill.add(arms);

    let tower = new THREE.Mesh(new THREE.CylinderGeometry(2, 4, towerHeight, 24, 1), towerMaterial);
    tower.castShadow = true;
    tower.receiveShadow = true;
    windmill.add(tower);

    return windmill;
}

function setupDatGui() {

    controls = new function() {

        this.rotate = toRotate;
        this.rotationSpeed = 0.01;
        this.armColor = armMaterial.color.getStyle();
        this.armVisible = armMaterial.visible;
        this.towerColor = towerMaterial.color.getStyle();
        this.towerVisible = towerMaterial.visible;
        this.enableSpotlight = function () { spotlight.visible = !spotlight.visible };
        this.armLength = 16
        this.towerHeight = 22;
        this.numberOfArms = 3;
        this.createObject = () => {
            let windmill = createWindmill(
                this.armLength,             //armLength
                this.towerHeight,            //tower Height
                this.numberOfArms);              //number of arms
            
            windmill.position.set(0, 11, 0);
            scene.add(windmill);


            let hovercraft = createHovercraft(
                this.armLength,             //armLength
                this.bodyLength,            //body length
                this.numberOfArms);              //number of arms
            hovercraft.position.set(0, 11, 0);
            scene.add(hovercraft);
        }
    }

    let gui = new dat.GUI();
    gui.add(controls, 'rotate').onChange((e) => toRotate = e);
    gui.add(controls, 'enableSpotlight');
    gui.addColor(controls, 'armColor').onChange(function (e) { armMaterial.color.setStyle(e) }).name('Arm color');
    gui.add(controls, 'armVisible').onChange(function (e) { armMaterial.visible = e; }).name('Arm visibility');
    gui.addColor(controls, 'towerColor').onChange(function (e) { towerMaterial.color.setStyle(e) }).name('Tower color');
    gui.add(controls, 'towerVisible').onChange(function (e) { towerMaterial.visible = e; }).name('Tower visibility');
    gui.add(controls, 'rotationSpeed', 0, 0.4);

    let folder = gui.addFolder('Windmill');

    folder.add(controls, 'armLength', 12, 18, 2).name('Arm Length');
    folder.add(controls, 'numberOfArms', 2, 10, 1).name('Number of Arms');
    folder.add(controls, 'towerHeight', 18, 27, 3).name('Tower height');
    folder.add(controls, 'createObject').name('Create');
}

function render() {

    orbitControls.update();
    if (toRotate)
        scene.rotation.y += controls.rotationSpeed;//rotates the scene  
    if (arms !== undefined)
        arms.rotation.z += controls.rotationSpeed;
    renderer.render(scene, camera);
    requestAnimationFrame(render);

}

window.onload = () => {

    init();
    setupCameraAndLight();
    createGeometry();
    createWindmillMaterials();
    setupDatGui();
    render();

}
