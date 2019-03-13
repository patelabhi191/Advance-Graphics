/// <reference path="../libs/three.min.js" />
/// <reference path="../libs/dat.gui.min.js" />
/// <reference path="../libs/trackballcontrols.js" />

//author: Narendra Pershad jan 2, 2014
//filename: 01-basic-skeleton.js

//declare recurrent global variables
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const clock = new THREE.Clock();


//declare global variables
var trackballControl,
    controls,
    plane;

//function definitions
function init() {

    renderer.setClearColor(new THREE.Color(0xaaffaa));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    trackballControl = new THREE.TrackballControls(camera, renderer.domElement);


}

function createCameraAndLights() {

    camera.position.x = 10;
    camera.position.y = 50;
    camera.position.z = 80;
    camera.lookAt(scene.position);

    // add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0x292929);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(-20, 40, 60);
    scene.add(directionalLight);

}

function createGeometry() {

    scene.add(new THREE.AxesHelper(50));
    // create the ground plane
    var planeGeometry = new THREE.PlaneBufferGeometry(60, 20);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    // add the plane to the scene
    scene.add(plane);

    //add a cube to the scene
    let mesh = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({
            color: 0xaaaaff
        })
    );
    mesh.position.y = 1;
    scene.add(mesh);
}

function createDatGui() {

    controls = new function(){
        this.size = 2;
        this.color = '#353535';
        this.shapes = [];
        this.showVar = function () {
            console.log(`Size: ${this.size} Color: ${this.color} Shape: ${this.shapes}`);
        };
        this.addCube = function() {
            if(this.shapes ===  'cube'){
                geom = new THREE.BoxGeometry(this.size, this.size, this.size); 
                mat = new THREE.MeshLambertMaterial({color: this.color});
                mesh = new THREE.Mesh(geom, mat);
                let x =  plane.geometry.parameters.width * (1 - Math.random());
                let y =  plane.geometry.parameters.height * (1 - Math.random());
                mesh.position.set(y, this.size * 0.5, y);
                scene.add(mesh);//to add a cube   
                console.log(this.shapes);    
            }else{
                geom = new THREE.SphereGeometry(this.size, 24, 24); 
                mat = new THREE.MeshLambertMaterial({color: this.color});
                mesh = new THREE.Mesh(geom, mat);
                let x =  plane.geometry.parameters.width * (1 - Math.random());
                let y =  plane.geometry.parameters.height * (1 - Math.random());
                mesh.position.set(y, this.size * 0.5, y);
                scene.add(mesh);//to add a cube   
                console.log(this.shapes);    
            }                  
            
        };
    };

    var gui = new dat.GUI();
    gui.add(controls, 'showVar').name('Show variables');
    gui.add(controls, 'size', 2, 6, 1);
    gui.add(controls, 'shapes', [ 'cube', 'sphere' ]);
    gui.addColor(controls, 'color');
    gui.add(controls, 'addCube').name('Add Geometry');

}


function render() {

    // update the stats and the controls
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);

    //the last statement calls the animate function
    requestAnimationFrame(render);

}

//javascript function to drive your scene
window.onload = function () {

    init();
    createCameraAndLights();
    createGeometry();
    createDatGui();
    render();

}
