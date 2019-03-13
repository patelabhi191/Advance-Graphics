

//author: Narendra Pershad Feb 8, 2019
//filename: 00-lab-base.js
//purpose: a useful base for threejs applications

const renderer = new THREE.WebGLRenderer({ antialias: true });
 scene = new THREE.Scene();
const angle = 22/7;
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls,
    speed = 0.01,
    theta = 0;
    dTheta = 0.02,
    toRotate = false,
    gap = 6;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000f0f);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {
    camera.position.set(200, 50, 50);
    camera.lookAt(scene.position);
    
    scene.add(new THREE.AmbientLight(0x666666));AbortController

    var spotLight = new THREE.SpotLight( 0xffffff ,1.5);
    spotLight.position.set( 30, 100, 0 );

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 500;
    spotLight.shadow.mapSize.height = 500;

    spotLight.shadow.camera.near = 70;
    spotLight.shadow.camera.far = 500;
    spotLight.shadow.camera.fov = 20;

    scene.add( spotLight );

    
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
}

function createGeometry() {

    scene.add(new THREE.AxesHelper(100));
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(150, 80),
        new THREE.MeshStandardMaterial({ color: 0xeeeeee })
    );
    plane.receiveShadow = true;
    plane.castShadow = true;
    plane.position.y = -40;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    var shape = new THREE.Shape();
    shape.absellipse(0, 0, 20,20, 0, Math.PI * 2, true);

    var hole = new THREE.Path();
    hole.absellipse(0, 0, 19, 19, 0, Math.PI * 2);
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
    var material = new THREE.MeshStandardMaterial( { color: 0x0044dd } );
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -0.5);
    scene.add(mesh);
    mesh.castShadow = true;

    //inner-spikes
    var geometry = new THREE.CylinderGeometry( 1, 1, 55, 32 );
    var material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
    var spikes = new THREE.Mesh( geometry, material );
    spikes.position.set(0,0,0);
    scene.add( spikes );
    spikes.rotation.z = .14;
    spikes.castShadow = true;
    var spikes1 = spikes.clone();
    spikes1.rotation.z=.66;
    scene.add(spikes1);
    var spikes2 = spikes.clone();
    spikes2.rotation.z=1.17;
    scene.add(spikes2);
    var spikes3 = spikes.clone();
    spikes3.rotation.z=1.68;
    scene.add(spikes3);
    var spikes4 = spikes.clone();
    spikes4.rotation.z=2.19;
    scene.add(spikes4);
    var spikes5 = spikes.clone();
    spikes5.rotation.z=2.7;
    scene.add(spikes5);

    var geo = new THREE.CylinderGeometry( 4, 4, 20, 32 );
    var mat = new THREE.MeshStandardMaterial( {color: 0x0044dd} );
    var inner_spikes = new THREE.Mesh( geo, mat );
    inner_spikes.position.set(0,0,0);
    inner_spikes.rotation.x = 1.57;
    scene.add( inner_spikes );

    //connecting outer 2 spikes
    var geon = new THREE.CylinderGeometry( 1, 1, 15, 32 );
    var mate = new THREE.MeshStandardMaterial( {color: 0x008c8c} );
    side_cylinder = new THREE.Mesh( geon, mate );
    side_cylinder.position.set(27,0,0);
    side_cylinder.rotation.x = 1.57;
    scene.add( side_cylinder ); 
   
    var side_cylinder1 = side_cylinder.clone();
    side_cylinder1.position.set(-27,0,0);
    side_cylinder1.rotation.y = 3.14;
    scene.add(side_cylinder1);

    //Standing connection with outer spikes
    var geom = new THREE.CylinderGeometry( 1, 1, 8, 32 );
    var matee = new THREE.MeshStandardMaterial( {color: 0x008c8c} );
    stand_cylinder = new THREE.Mesh( geom, matee );
    stand_cylinder.position.set(0,0,4);
    stand_cylinder.rotation.x = 1.57
    scene.add( stand_cylinder );   
    
    var geome = new THREE.SphereGeometry( 4, 32, 32, 0, Math.PI * 2, 3*Math.PI/2, Math.PI);
    var mater = new THREE.MeshBasicMaterial( {color: 0x8ccc8c} );
    cup = new THREE.Mesh( geome, mater );
    cup.position.set(0,0,4.5);
    cup.rotation.x = 1.57;
    scene.add( cup );
 
    

    
    

 /*   temp = new THREE.Group();
    temp.add(stand_cylinder);
    temp.add(cup);
 //   temp.rotation.z=0.65;
  //  temp.position.set(2,-4,0);
    scene.add(temp);
  */
    //Side container
    side = new THREE.Group();
    side.add(side_cylinder);
    side.add(side_cylinder1);
   // side.add(temp);
    scene.add(side);
    side.rotation.z = 0.15;


   

    //cloning sides
    side1 = side.clone();
    side1.rotation.z = 0.65;
    scene.add(side1); 
    side2 = side.clone();
    side2.rotation.z = 1.165;
    scene.add(side2); 
    side3 = side.clone();
    side3.rotation.z = 1.75;
    scene.add(side3); 
    side4 = side.clone();
    side4.rotation.z = 2.265;
    scene.add(side4); 
    side5 = side.clone();
    side5.rotation.z = 2.77;
    scene.add(side5); 

     
    //containers
    sides = new THREE.Group();
    sides.add(side);
    sides.add(side1);
    sides.add(side3);
    sides.add(side2);
    sides.add(side4);
    sides.add(side5);
    scene.add(sides);

    //whole wheel with mesh n spikes
    wheel = new THREE.Group();
    wheel.add(mesh);
    wheel.add(spikes);
    wheel.add(spikes1);
    wheel.add(spikes3);
    wheel.add(spikes2);
    wheel.add(spikes4);
    wheel.add(spikes5);
    scene.add(wheel);

    wheel1 = wheel.clone();
  
    scene.add(wheel1);

    this.side_cylinder.add(this.stand_cylinder);
    this.side_cylinder.add(this.cup);
    

}

function setupDatGui() {

    controls = new function() {
        this.rotate = toRotate;
        this.gap = 6
        this.speed = 0.01
    }

    let gui = new dat.GUI();
    gui.add(controls, 'rotate').onChange((e) => toRotate = e);
    gui.add(controls, 'gap',2.0,10.0).name('Wheel gap').onChange((c) => {gap = c;});
    gui.add(controls, 'speed',0.01,0.10).name('Rotation Speed').onChange((c) => {speed = c;});
}

function render() {

  //  theta += dTheta;
    orbitControls.update();
    if (toRotate)
        scene.rotation.y += speed;//rotates the scene  
    
        wheel.position.set(0,0,-gap);
        wheel1.position.set(0,0,gap);

    wheel.rotation.z -= speed;
    wheel1.rotation.z -= speed;
    sides.rotation.z -= speed;
    side_cylinder.rotation.y += speed;
 //   stand_cylinder.rotation.z += speed;
 //   cup.rotation.z += speed; 
  //  temp.rotation.z -= speed;
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