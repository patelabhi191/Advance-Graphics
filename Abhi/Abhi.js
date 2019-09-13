
Physijs.scripts.worker = '../libs/other/physijs/physijs_worker.js';
Physijs.scripts.ammo = './ammo.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new Physijs.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);
const clock = new THREE.Clock();

const __shader = Shaders.BasicShader3;

var orbitControls, controls, objects=[],
    speed = 0.01,
    toRotate = true;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    scene.setGravity(new THREE.Vector3(0, -50, 0));
    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {


  /*  
    var urls = ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'];
    var loader = new THREE.CubeTextureLoader().setPath('assets/textures/cubemap/colloseum/');
    loader.load(urls, function (texture) {
        var pmremGenerator = new THREE.PMREMGenerator(texture);
        pmremGenerator.update(renderer);
        var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
        pmremCubeUVPacker.update(renderer);
        
        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();
        scene.background = texture;
    });

*/

    camera.position.set(0, 10, 20);
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

    var amlight = new THREE.AmbientLight( 0x404040 ); // soft white light
    amlight.position.set(0,10,0);
    scene.add( amlight );
}

function createGeometry() {

    friction = 0.3, restitution = 0.7, mass = 10

    scene.add(new THREE.AxesHelper(100));

    __shader.uniforms.texture.value = new THREE.TextureLoader().load('assets/textures/lavatile.jpg');

    

    var texture1 = new THREE.TextureLoader().load( 'assets/textures/general/weave-bump.jpg' );
    var texture2 = new THREE.TextureLoader().load( 'assets/textures/general/weave.jpg' );
    var blockGeom = new THREE.BoxGeometry(80, 0.2, 40);
    let plane_material = new THREE.ShaderMaterial(
            {
                uniforms: __shader.uniforms,
                vertexShader: __shader.vertexShader,
                fragmentShader: __shader.fragmentShader});
    let plane = new Physijs.BoxMesh(blockGeom, plane_material, 0);
    plane.receiveShadow = true;
    plane.castShadow = true;
    scene.add(plane);


    let blockMat = Physijs.createMaterial(new THREE.MeshStandardMaterial({color: 0xffffff,map: texture1, bumpMap: texture2, roughness: 0.05, bumpScale:2.9}),
        0.3, 0.7);
    planev = new Physijs.BoxMesh(blockGeom, blockMat, 0);
    planev.rotation.x=1.57;
    planev.position.set(0,20,-20);
    scene.add(planev);

    let cube_material = Physijs.createMaterial(new THREE.MeshStandardMaterial({
        color: 0x000000, transparent: true, opacity: 0.9
    }), friction, restitution);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    cube = new Physijs.BoxMesh(geometry, cube_material, mass);
    cube.position.set(0,0.5,0);
    cube.castShadow=true;
    scene.add(cube);

    cube2 = cube.clone();
    cube2.position.set(0,1.5,0);
    cube2.rotation.y=0.5;
    cube2.castShadow=true;
    scene.add(cube2);

    cube3 = cube.clone();
    cube3.position.set(0,2.5,0);
    cube3.rotation.y=1;
    cube3.castShadow=true;
    scene.add(cube3);

    cube4 = cube.clone();
    cube4.position.set(0,3.5,0);
    cube4.rotation.y=1.5;
    cube4.castShadow=true;
    scene.add(cube4);

   


    var cgeometry = new THREE.CylinderGeometry( 0.3, 0.2, 1, 32 );
    cylinder = new Physijs.CylinderMesh( cgeometry, cube_material,mass );
    cylinder.position.set(3,0.5,0);
    cylinder.rotation.x=1.57;
    cylinder.rotation.z=-1.57;
    scene.add( cylinder );

    cylinder2 = cylinder.clone();
    cylinder2.position.set(-3,0.5,0);
    scene.add(cylinder2);

    cylinder3 = cylinder.clone();
    cylinder3.position.set(-2,0.5,1);
    cylinder3.rotation.z=0.5;
    scene.add(cylinder3);

    cylinder4 = cylinder.clone();
    cylinder4.position.set(2,0.5,1);
    cylinder4.rotation.z=-0.5;
    scene.add(cylinder4);

    cylinder5 = cylinder.clone();
    cylinder5.position.set(1,0.5,2);
    cylinder5.rotation.z=0;
    scene.add(cylinder5);

    cylinder6 = cylinder.clone();
    cylinder6.position.set(-1,0.5,2);
    cylinder6.rotation.z=0;
    scene.add(cylinder6);
    
    objects.push(cube);
    objects.push(cube2);
    objects.push(cube3);
    objects.push(cube4);
    objects.push(cylinder);
    objects.push(cylinder2);
    objects.push(cylinder3);
    objects.push(cylinder4);
    objects.push(cylinder5);
    objects.push(cylinder6);
    
    

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

function render() {

    orbitControls.update();
    if (toRotate)
      //  scene.rotation.y += speed;//rotates the scene  
      {}
      
      __shader.uniforms.time.value = clock.getElapsedTime();
     
      for (let i = 0; i < objects.length; i++)
      objects.__dirtyPosition = true;

    renderer.render(scene, camera);
    scene.simulate(undefined, 1);
    requestAnimationFrame(render);
}

window.onload = () => {

    init();
    setupCameraAndLight();
    createGeometry();
    setupDatGui();
    window.addEventListener('mousedown', mouseDownHandler, false);
    render();

}
