//author: Narendra Pershad Feb 8, 2019
//filename: 00-lab-base.js
//purpose: a useful base for threejs applications

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new Physijs.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls, objects = [],
    speed = 0.01,
    toRotate = true;

	Physijs.scripts.worker = 'libs/physijs_worker.js';
	Physijs.scripts.ammo = 'libs/ammo.js';


function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    scene.setGravity(new THREE.Vector3(0,-50,0));

}

function setupCameraAndLight() {
    camera.position.set(-15, 5, 0);
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

    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -100, 75, 0 );
    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 1000;
    spotLight.shadow.camera.fov = 30;

    scene.add( spotLight );
}

function createGeometry() {

    
    scene.add(new THREE.AxesHelper(100));
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 30),
        new THREE.MeshLambertMaterial({ color: 0xd3d3d3 })
    );
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    friction = 0.3; restitution = 0.7; 
    mass = 100;

    var blockGeom = new THREE.BoxGeometry(1, 1, 1);
    let blockMat = Physijs.createMaterial(new THREE.MeshStandardMaterial({
        color: 0x7777ff, transparent: true, opacity: 0.9
    }), friction, restitution);
    let block = new Physijs.BoxMesh(blockGeom, blockMat, mass);
    block.position.set(2,.5,0);
    block.castShadow = true;
    block.receiveShadow = true;
    //scene.add(block);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = Physijs.createMaterial(new THREE.MeshStandardMaterial({color: 0x00ff00}), friction, restitution);
    var cube =  new Physijs.BoxMesh( geometry, material, mass );
    cube.position.set(0,.5,0);
    scene.add( cube );
    
    cube2 = cube.clone();
    cube2.position.set(0,0.5,1.25);
    scene.add(cube2);
    cube3 = cube.clone();
    cube3.position.set(0,0.5,2.5);
    scene.add(cube3);
    cube4 = cube.clone();
    cube4.position.set(0,0.5,-1.25);
    scene.add(cube4);
    cube5 = cube.clone();
    cube5.position.set(0,0.5,-2.5);
    scene.add(cube5);

    var material2 = Physijs.createMaterial(new THREE.MeshStandardMaterial({color: 0x00aaaa}), friction, restitution);
    cube11 =  new Physijs.BoxMesh(geometry,material2, mass);
    cube11.position.set(0,1.5,-1.87);
    cube11.__dirtyPosition = true;
    scene.add(cube11);
    cube12 =  cube11.clone();
    cube12.position.set(0,1.5,-0.625);
    cube12.__dirtyPosition = true;
    scene.add(cube12);
    cube13 =  cube11.clone();
    cube13.position.set(0,1.5,.625);
    cube13.__dirtyPosition = true;
    scene.add(cube13);
    cube14 =  cube11.clone();
    cube14.position.set(0,1.5,1.87);
    cube14.__dirtyPosition = true;
    scene.add(cube14);

    var material3 = Physijs.createMaterial(new THREE.MeshStandardMaterial({color: 0xaaaa00}), friction, restitution); 
    cube21 =  new Physijs.BoxMesh(geometry,material3, mass);
    cube21.position.set(0,2.5,-1.25);
    cube21.__dirtyPosition = true;
    scene.add(cube21);
    cube22 =  cube21.clone();
    cube22.position.set(0,2.5,0);
    cube22.__dirtyPosition = true;
    scene.add(cube22);
    cube23 =  cube21.clone();
    cube23.position.set(0,2.5,1.25);
    cube23.__dirtyPosition = true;
    scene.add(cube23);

    var material4 = Physijs.createMaterial(new THREE.MeshStandardMaterial({color: 0xffa500}), friction, restitution);
    cube31 =  new Physijs.BoxMesh(geometry,material4, mass);
    cube31.position.set(0,3.5,.625);
    scene.add(cube31);
    cube32 =  cube31.clone();
    cube32.position.set(0,3.5,0-.625);
    scene.add(cube32);
    
    var material5 = Physijs.createMaterial(new THREE.MeshStandardMaterial({color: 0xaa0000}), friction, restitution); 
    cube41 =  new Physijs.BoxMesh(geometry,material5, mass);
    cube41.position.set(0,4.5,0);
    scene.add(cube41);
    cubetemp = cube41.clone();
    cubetemp.position.set(0,3,5);
    cubetemp.__dirtyPosition = true;
    scene.add(cubetemp);



    objects.push(cube);
    objects.push(cube2);
    objects.push(cube3);
    objects.push(cube4);
    objects.push(cube5);
    objects.push(cube5);
    objects.push(cube11);
    objects.push(cube12);
    objects.push(cube13);
    objects.push(cube14);
    objects.push(cube21);
    objects.push(cube22);
    objects.push(cube23);
    objects.push(cube31);
    objects.push(cube32);
    objects.push(cube41);
    
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
    toRotate=false;
    if (toRotate)
        scene.rotation.y += speed;//rotates the scene  
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    scene.simulate();
}

function mouseDownHandler(event){

    let pos = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
    );
    console.log(pos);
    let vector = pos.unproject(camera);
    let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    let intersects = raycaster.intersectObjects(objects);
    intersects.forEach((obj) => scene.remove(obj.object));
    

}

window.onload = () => {

    init();
    setupCameraAndLight();
    createGeometry();
    setupDatGui();
    window.addEventListener('mousedown', mouseDownHandler,false);
    render();


}
