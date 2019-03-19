const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls,
    speed = 0.01,
    toRotate = true,
    armLenght = 10, bodyLenght, numberOfArms, armInclination = 0.25;


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

    spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 100, 1000, 100 );

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    scene.add( spotLight );
}

function createGeometry() {

    scene.add(new THREE.AxesHelper(100));
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 60),
        new THREE.MeshLambertMaterial({ color: 0xeeeeee })
    );
    plane.receiveShadow = true;
    plane.position.y = -20;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    

}

function createWindmillMaterials(armLenght, bodyLenght, numberOfArms, armInclination) {

    var geometry = new THREE.CylinderGeometry( 5, 7, 20, 32 );
    var material = new THREE.MeshStandardMaterial( {color: 0xff0000} );
    var tower = new THREE.Mesh( geometry, material );
    tower.position.y = -10;
    tower.position.x = -7;
    scene.add( tower );

    var geo = new THREE.CylinderGeometry( 1, 1, 5, 32 );
    var mat = new THREE.MeshStandardMaterial( {color: 0xff0000} );
     axle = new THREE.Mesh( geo, mat );
   // axle.position.y = -1.5;
    axle.position.x = -1;
    axle.rotation.z =1.57;
    scene.add( axle );


    var geometry1 = new THREE.BoxGeometry( 10, 5, 1 );
    var material1 = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
    var arm1 = new THREE.Mesh( geometry1, material1 );
  //  arm1.position.x = 20;
    arm1.rotation.z = 1.57;
    arm1.rotation.y = 1.57;
    scene.add( arm1 );
    

    var arm2 = arm1.clone();
    arm2.rotation.x = 2.65;
    scene.add(arm2);

    var arm3 = arm1.clone();
    arm3.rotation.x = -2.65;
    scene.add(arm3);

   arm1.position.set(0,5,0);
   arm2.position.set(0,-4,-5);
   arm3.position.set(0,-4,5);

   arm = new THREE.Object3D();
   arm.add(axle);
   arm.add(arm1);
   arm.add(arm2);
   arm.add(arm3);
   arm.position.set(0,0,0);
   scene.add(arm);
   
    


}

function setupDatGui() {

    controls = new function() {

        this.rotate = toRotate;
        this.spotLight = true;
    }

    let gui = new dat.GUI();
    gui.add(controls, 'rotate').onChange((e) => toRotate = e);
    gui.add(controls, 'spotLight').listen().onChange((e) => {
        spotLight.visible = e;});
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

    arm.rotation.x += 0.02; 
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
