

//author: Narendra Pershad Feb 8, 2019
//filename: 00-lab-base.js
//purpose: a useful base for threejs applications

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls,
    speed = 0.01,
    toRotate = true;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000f0f);
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
  //  scene.add(hemiSphereLight);

    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
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

    var shape = new THREE.Shape();
    shape.absellipse(0, 0, 10, 10, 0, Math.PI * 2, true);

    var hole = new THREE.Path();
    hole.absellipse(0, 0, 8, 8, 0, Math.PI * 2);
    shape.holes.push(hole);

    var extrudeSettings = {
        steps: 1,
        depth: 1,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1,
        curveSegments: 20
    };

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var material = new THREE.MeshPhongMaterial( { color: 0x0044dd } );
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 10, -0.5);
    scene.add(mesh);

    var geometry = new THREE.CylinderGeometry( 1, 1, 20, 32 );
    var material = new THREE.MeshPhongMaterial( {color: 0xffffff} );
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.set(0,10,0);
    scene.add( cylinder );

    var cylinder1 = cylinder.clone();
    cylinder1.rotation.z=.51;
    scene.add(cylinder1);
    var cylinder2 = cylinder.clone();
    cylinder2.rotation.z=1.02;
    scene.add(cylinder2);
    var cylinder3 = cylinder.clone();
    cylinder3.rotation.z=1.53;
    scene.add(cylinder3);
    var cylinder4 = cylinder.clone();
    cylinder4.rotation.z=2.04;
    scene.add(cylinder4);
    var cylinder5 = cylinder.clone();
    cylinder5.rotation.z=2.55   ;
    scene.add(cylinder5);

    var geo = new THREE.CylinderGeometry( 2, 2, 3, 32 );
    var mat = new THREE.MeshPhongMaterial( {color: 0x0044dd} );
    var inner_cylinder = new THREE.Mesh( geo, mat );
    inner_cylinder.position.set(0,10,0);
    inner_cylinder.rotation.x = 1.57;
    scene.add( inner_cylinder );

    var wheel = new THREE.Group();
    wheel.add(mesh);
    wheel.add(cylinder);
    wheel.add(cylinder1);
    wheel.add(cylinder3);
    wheel.add(cylinder2);
    wheel.add(cylinder4);
    wheel.add(cylinder5);
    wheel.add(inner_cylinder);
    scene.add(wheel);

    var wheel1 = wheel.clone();
    wheel1.position.set(0,0,-4);
    scene.add(wheel1);

    var wheel2 = wheel.clone();
    wheel2.position.set(0,0,8);
    scene.add(wheel2);

    var wheel3 = wheel.clone();
    wheel3.position.set(0,0,12);
    scene.add(wheel3);

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
