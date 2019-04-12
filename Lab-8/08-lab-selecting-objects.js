
const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);
let green = new THREE.Color(0x00ff00);
let blue = new THREE.Color(0x0000ff);

var orbitControls, controls, objects = [],

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
}

function createGeometry() {

    scene.add(new THREE.AxesHelper(100));
    let planeWidth = 40, planeHeight = 60;
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(planeWidth, planeHeight),
        new THREE.MeshLambertMaterial({ color: 0xeeeeee })
    );
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    for(let i = 0;i < 10;i++){
        let mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshLambertMaterial({ color:  Math.random() * 0xffffff })
        );
        mesh.position.set((Math.random() - 0.5) * planeWidth , 1, (Math.random() - 0.5) * planeHeight);
        mesh.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
        mesh.castShadow = true;
        objects.push(mesh);
        scene.add(mesh);
    }
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
 
    renderer.render(scene, camera);
    requestAnimationFrame(render);
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
