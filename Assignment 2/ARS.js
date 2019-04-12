//
//
//author: Abhi Patel, Raj Patel, Sandeep Singh
//filename: ARS.js
//purpose: to get assignment marks.. :-)
//
//
//
//
//
//  We have created a bowling alley... 
//  A and D for Right & Left
//  Space for throring ball
//  If cuboids fall down, they disappear and you get points.



/// <reference path="libs/three.min.js" />
/// <reference path="libs/dat.gui.min.js" />
/// <reference path="libs/trackballcontrols.js" />
/// <reference path="libs/OrbitControls.js"/>
/// <reference path="libs/physi.js"/>
/// <reference path="libs/physijs_worker.js"/>

Physijs.scripts.worker = './libs/physijs_worker.js';
Physijs.scripts.ammo = './ammo.js';
const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new Physijs.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);
let sphere;

var orbitControls, controls, objects = [],
    speed = 0.01,
    toRotate = true,
    toRun = false;
count = 0;
counts = 0;
var state = "Playing";
var resetCount = 0;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
 //   orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    scene.setGravity(new THREE.Vector3(0, -10, 0));

}

function setupCameraAndLight() {
    camera.position.set(-25, 5, 0);
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

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-100, 75, 0);
    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 1000;
    spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);
}

function createGame(gameData) {

    friction = .7; restitution = 0.2;
    mass = 10;

  //  scene.add(new THREE.AxesHelper(100));

    let groundGeometry = new THREE.BoxGeometry(gameData.Positions.groundPosition[0],gameData.Positions.groundPosition[1],gameData.Positions.groundPosition[2]);
    let groundGeometry1 = new THREE.BoxGeometry(gameData.Positions.groundPosition[0],gameData.Positions.groundPosition[1],gameData.Positions.groundPosition[2]);
    let groundGeometry2 = new THREE.BoxGeometry(gameData.Positions.frontPosition[0],gameData.Positions.frontPosition[1],gameData.Positions.frontPosition[2]);
    groundGeometry.translate(0, -0.1, 0);
    let groundMaterial = new Physijs.createMaterial(new THREE.MeshStandardMaterial({
        color: 0xfcfbe3, transparent: true, opacity: 0.9
    }), friction, 0)

    let ground = new Physijs.BoxMesh(groundGeometry, groundMaterial, 0   // mass of the object (i.e. 0 so no force acting on it)
    )
    ground.castShadow = true;
    scene.add(ground);

    let groundt = ground.clone();
    groundt.position.y = 21;
    scene.add(groundt);

    let groundl = new Physijs.BoxMesh(groundGeometry1, groundMaterial, 0   // mass of the object (i.e. 0 so no force acting on it)
    )
    groundl.castShadow = true;
    groundl.rotation.x = 1.57;
    groundl.position.set(0, 10, 15);
    scene.add(groundl);

    let groundr = new Physijs.BoxMesh(groundGeometry1, groundMaterial, 0   // mass of the object (i.e. 0 so no force acting on it)
    )
    groundr.castShadow = true;
    groundr.rotation.x = 1.57;
    groundr.position.set(0, 10, -15);
    scene.add(groundr);

    let groundb = new Physijs.BoxMesh(groundGeometry2, groundMaterial, 0   // mass of the object (i.e. 0 so no force acting on it)
    )
    groundb.castShadow = true;
    groundb.rotation.z = 1.57;
    groundb.rotation.x = 1.57;
    groundb.position.set(25,10, 0);
    scene.add(groundb);

    let grounda = new Physijs.BoxMesh(groundGeometry2, groundMaterial, 0   // mass of the object (i.e. 0 so no force acting on it)
    )
    grounda.castShadow = true;
    grounda.rotation.z = 1.57;
    grounda.rotation.x = 1.57;
    grounda.position.set(-25, 10, 0);
    scene.add(grounda);

    //Red Lane
    let rGeometry = new THREE.BoxGeometry(50, 0, 0);
    let rmaterial = new THREE.MeshStandardMaterial({ color: 0x990011 })
    lane1 = new THREE.Mesh(rGeometry, rmaterial);
    lane1.position.y = -0.49;
    scene.add(lane1);

    lane2 = lane1.clone();
    lane2.position.z = 3;
    scene.add(lane2);

    lane3 = lane1.clone();
    lane3.position.z = -3;
    scene.add(lane3);

    //White lane to level with red lane
    let wGeometry = new THREE.BoxGeometry(50, 0, 2.2);
    let wmaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd })
    wlane = new THREE.Mesh(wGeometry, wmaterial);
    wlane.position.set(0, -0.499, 1.5);
    scene.add(wlane);

    wlane1 = wlane.clone();
    wlane1.position.z = -1.5;
    scene.add(wlane1);

    var sgeometry = new THREE.SphereGeometry(1, 32, 32);
    var smaterial = Physijs.createMaterial(new THREE.MeshStandardMaterial({ color: 0x686420,transparent:true, opacity:0.9 }), friction, .3);
    sphere = new Physijs.BoxMesh(sgeometry, smaterial, 100);
    sphere.position.set(-15, 1, 0);
    scene.add(sphere);

    createCube(gameData);


}

function createCube(gameData) {
    var geometry = new THREE.BoxGeometry(0.55, 1, .9);
    var material = Physijs.createMaterial(new THREE.MeshStandardMaterial({ color: Number(gameData.MaterialColors.CubeColors.row1Color), transparent: true, opacity: 0.7 }), friction, restitution);
    cube = new Physijs.BoxMesh(geometry, material, mass);
    cube.position.set(gameData.Positions.CubesPosition.Cube1[0], gameData.Positions.CubesPosition.Cube1[1], gameData.Positions.CubesPosition.Cube1[2]);
    scene.add(cube);

    cube2 = cube.clone();
    cube2.position.set(gameData.Positions.CubesPosition.Cube2[0], gameData.Positions.CubesPosition.Cube2[1], gameData.Positions.CubesPosition.Cube2[2]);
    scene.add(cube2);
    cube3 = cube.clone();
    cube3.position.set(gameData.Positions.CubesPosition.Cube3[0], gameData.Positions.CubesPosition.Cube3[1], gameData.Positions.CubesPosition.Cube3[2]);
    scene.add(cube3);
    cube4 = cube.clone();
    cube4.position.set(gameData.Positions.CubesPosition.Cube4[0], gameData.Positions.CubesPosition.Cube4[1], gameData.Positions.CubesPosition.Cube4[2]);
    scene.add(cube4);
    cube5 = cube.clone();
    cube5.position.set(gameData.Positions.CubesPosition.Cube5[0], gameData.Positions.CubesPosition.Cube5[1], gameData.Positions.CubesPosition.Cube5[2]);
    scene.add(cube5);

    var material2 = Physijs.createMaterial(new THREE.MeshStandardMaterial({ color: Number(gameData.MaterialColors.CubeColors.row2Color), transparent: true, opacity: 0.75 }), friction, restitution);
    cube11 = new Physijs.BoxMesh(geometry, material2, mass);
    cube11.position.set(gameData.Positions.CubesPosition.Cube11[0], gameData.Positions.CubesPosition.Cube11[1], gameData.Positions.CubesPosition.Cube11[2]);
    cube11.__dirtyPosition = true;
    scene.add(cube11);
    cube12 = cube11.clone();
    cube12.position.set(gameData.Positions.CubesPosition.Cube12[0], gameData.Positions.CubesPosition.Cube12[1], gameData.Positions.CubesPosition.Cube12[2]);
    cube12.__dirtyPosition = true;
    scene.add(cube12);
    cube13 = cube11.clone();
    cube13.position.set(gameData.Positions.CubesPosition.Cube13[0], gameData.Positions.CubesPosition.Cube13[1], gameData.Positions.CubesPosition.Cube13[2]);
    cube13.__dirtyPosition = true;
    scene.add(cube13);
    cube14 = cube11.clone();
    cube14.position.set(gameData.Positions.CubesPosition.Cube14[0], gameData.Positions.CubesPosition.Cube14[1], gameData.Positions.CubesPosition.Cube14[2]);
    cube14.__dirtyPosition = true;
    scene.add(cube14);

    var material3 = Physijs.createMaterial(new THREE.MeshStandardMaterial({ color: Number(gameData.MaterialColors.CubeColors.row3Color) , transparent: true, opacity: 0.81}), friction, restitution);
    cube21 = new Physijs.BoxMesh(geometry, material3, mass);
    cube21.position.set(gameData.Positions.CubesPosition.Cube21[0], gameData.Positions.CubesPosition.Cube21[1], gameData.Positions.CubesPosition.Cube21[2]);
    cube21.__dirtyPosition = true;
    scene.add(cube21);
    cube22 = cube21.clone();
    cube22.position.set(gameData.Positions.CubesPosition.Cube22[0], gameData.Positions.CubesPosition.Cube22[1], gameData.Positions.CubesPosition.Cube22[2]);
    cube22.__dirtyPosition = true;
    scene.add(cube22);
    cube23 = cube21.clone();
    cube23.position.set(gameData.Positions.CubesPosition.Cube23[0], gameData.Positions.CubesPosition.Cube23[1], gameData.Positions.CubesPosition.Cube23[2]);
    cube23.__dirtyPosition = true;
    scene.add(cube23);

    var material4 = Physijs.createMaterial(new THREE.MeshStandardMaterial({ color: Number(gameData.MaterialColors.CubeColors.row4Color), transparent: true, opacity: 0.86 }), friction, restitution);
    cube31 = new Physijs.BoxMesh(geometry, material4, mass);
    cube31.position.set(gameData.Positions.CubesPosition.Cube31[0], gameData.Positions.CubesPosition.Cube31[1], gameData.Positions.CubesPosition.Cube31[2]);
    scene.add(cube31);
    cube32 = cube31.clone();
    cube32.position.set(gameData.Positions.CubesPosition.Cube32[0], gameData.Positions.CubesPosition.Cube32[1], gameData.Positions.CubesPosition.Cube32[2]);
    scene.add(cube32);

    var material5 = Physijs.createMaterial(new THREE.MeshStandardMaterial({ color: Number(gameData.MaterialColors.CubeColors.row5Color), transparent: true, opacity: 0.9 }), friction, restitution);
    cube41 = new Physijs.BoxMesh(geometry, material5, mass);
    cube41.position.set(gameData.Positions.CubesPosition.Cube41[0], gameData.Positions.CubesPosition.Cube41[1], gameData.Positions.CubesPosition.Cube41[2]);
    scene.add(cube41);

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

 /*   var obj = new THREE.Group()
    for (let i = 0; i < objects.length; i++)
    obj.add(objects[i]);
    scene.add(obj);
*/
}

function setupDatGui() {

    const gameFiles = {
        'Level 1': 'ARS1',
        'Level 2': 'ARS2',
        'Level 3': 'ARS3',
        'Level 4': 'ARS4',
        'Level 5': 'ARS5'
    };
    const port = 5500;
    let filename= 'ARS1';
    

    controls = new function () {

        this.filename = filename;
        this.text = counts;
        this.status = "Playing";
        this.resetGame = () => {readFile(port,filename); clearAll();}
       
       
    };
    let gui = new dat.GUI();
    gui.add(controls, 'filename', gameFiles).name('Game Selection').onChange((e) => { filename = e; clearAll(); readFile(port, filename); });
    gui.add(controls, 'text').listen().name("Score");
    gui.add(controls, 'status');
    gui.add(controls, 'resetGame').name('Reset Game');
    //gui.add(controls, 'reset');
}

function clearAll(){
    for (let i = 0; i < objects.length; i++)
    scene.remove(objects[i]);
    scene.remove(sphere);

}

function readFile(port, filename) {
    let url = 'http://localhost:' +
        port + //port number from data.gui
        '/assets/games/' + //url path
        filename + //file name from dat.gui
        '.json'; //extension
    console.log(url); //debugging code
    let request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', url);
    //request.responseType = 'json'; //try text if this doesn’t work
    request.send();
    request.onload = () => {
        let data = request.responseText;
        gameData = JSON.parse(data);
        console.log(gameData.GroundGeometry);
        //debugging code
        createGame(gameData);
        //createGame(JSON.parse(data)); //convert text to json
    }
}
function render() {


 //   orbitControls.update();

    if (toRun && sphere) {
        sphere.position.x += 0.5;
        sphere.__dirtyPosition = true;
    }
    if (sphere) {
        if (sphere.position.x > 22) {
            resetCount++;
            toRun = false;
            scene.remove(sphere);
            sphere.position.set(-15, 1, 0);
            scene.add(sphere);
        }
    }

    for (let i = 0; i < objects.length; i++)
        objects.__dirtyPosition = true;

    count = 0;
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].position.y < 0.5 || objects[i].position.z < -4 || objects[i].position.z > 4) {
            count++;
            scene.remove(objects[i]);
           //       console.log(count + " Counts"); 
        }
        if(count > 15)
        count = 0;
         counts = 0;
         status = "Won";
             
         //  createCube(gameData);
    } 
    counts = count;
    controls.text = counts;
    
  //  console.log(counts + " - Maxed");

    renderer.render(scene, camera);
    requestAnimationFrame(render);
    scene.simulate();
}

function mouseDownHandler(event) {

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

    for (let i = 0; i < objects.length; i++)
        objects.__dirtyPosition = true;
}

function keyDownHandler(event) {


    var Speed = .5;

    sphere.__dirtyPosition = true;
    var keyCode = event.which;
    if (keyCode == 65) {
        sphere.position.z -= Speed;
    } else if (keyCode == 68) {
        sphere.position.z += Speed;
    } else if (keyCode == 32) {
        toRun = true;
    }
}

window.onload = () => {

    init();
    setupCameraAndLight();
    readFile(5500, 'ARS1');
    //  checkDrop();
    setupDatGui();
    window.addEventListener('mousedown', mouseDownHandler, false);
    window.addEventListener("keydown", keyDownHandler, false);
    render();
}
