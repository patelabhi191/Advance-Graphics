// import { Math } from "three";

// / <reference path="../libs/three.min.js" />
// / <reference path="../libs/dat.gui.min.js" />
// / <reference path="../libs/orbitcontrols.js" />

//author: Narendra Pershad Feb 8, 2019
//filename: 00-lab-base.js
//purpose: a useful base for threejs applications

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls,
    speed = 0.01,
    toRotate = false;


var spoke;
var axle = new THREE.Object3D();
var wheels = [];
var horizontalSupport, verticalSupport;
var basketSupport = [];

//  Custom GUI Controls
var outerRadius = 15;
var innerRadius = 14.5;
var rimWidth = 8;
var axleRadius = 1;
var spokeLength = 30;
var numberOfSpokes = 12;
var rotateWheel = true;
var futuristic = 0; //5

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
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshStandardMaterial({ color: 0xeeeeee })
    );
    plane.material.side = THREE.DoubleSide;
    plane.position.set(0, -1, 0);
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    let mesh = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshLambertMaterial({ color: 0x7777ff })
    );
    mesh.position.set(0, 10, 0);
    mesh.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    mesh.castShadow = true;
    // scene.add(mesh);

    //  ---------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------
    // var ring = new THREE.Shape( );
    // ring.moveTo(10 , 10);
    // ring.lineTo(10 , 40);
    // ring.bezierCurveTo( 15, 25, 25, 25, 30, 40 );
    // ring.quadraticCurveTo( 20, 15, 10, 10 );
    // ring.absellipse( 0, 0, 2, 3, 0, Math.PI * 2 );

    // var hole = new THREE.Path();
    // hole.absellipse( 16, 24, 2, 3, 0, Math.PI * 2, true );
    // ring.holes.push( hole );

    // var geom = new THREE.ExtrudeGeometry( ring, steps=0.001);
    // var mesh2 = new THREE.MeshStandardMaterial({color : 0x424242});
    // let test = new THREE.Mesh(geom,mesh2);
    //scene.add(test);

    createWheel(0, outerRadius, innerRadius, axleRadius);
    // createWheel(30,15,14,3);

    // createWheel(-20,15,14,3);
    // createWheel(-30,15,14,3);
}

function createWheel(position, outerRadius, InnerRadius, axleRadius) {

    return new function () {

        // Creating Axle
        this.axle = new THREE.Mesh(new THREE.CylinderGeometry(axleRadius, axleRadius, rimWidth, 30), new THREE.MeshLambertMaterial({ color: 0x808080 }));
        this.axle.position.set(position, outerRadius + 5, 0);
        this.axle.rotation.z = Math.PI * 0.5;
        this.axle.castShadow = true;
        scene.add(this.axle);

        //  Generating Spokes, Baskets, and Basket Supports
        this.angle = 0;
        for (let i = 0; i < numberOfSpokes; i++) {
            this.spoke = new THREE.Mesh(new THREE.CubeGeometry(spokeLength, 0.5, 0.5, 10), new THREE.MeshLambertMaterial({ color: 0xffffff }));
            this.spoke.position.set(0, -rimWidth / 2 + 1, 0);
            this.spoke.geometry.scale(1, 1, 1);
            this.spoke.rotation.x = Math.PI * 0.5;
            this.spoke.rotation.z = Math.PI * this.angle;
            // this.angle += 1 / 6;
            this.spoke.geometry.translate(0, futuristic, 0);
            this.spoke.castShadow = true;
            this.axle.add(this.spoke);

            this.spoke2 = new THREE.Mesh(new THREE.CubeGeometry(spokeLength, 0.5, 0.5, 10), new THREE.MeshLambertMaterial({ color: 0xffffff }));
            this.spoke2.position.set(0, rimWidth / 2 - 1, 0);
            this.spoke2.geometry.scale(1, 1, 1);
            this.spoke2.rotation.x = Math.PI * 0.5;
            this.spoke2.rotation.z = Math.PI * this.angle;
            this.angle += 1 / (numberOfSpokes / 2);
            this.spoke2.geometry.translate(0, futuristic, 0);
            this.spoke2.castShadow = true;
            this.axle.add(this.spoke2);

            //  Generating Basket Supports

            //  ---Horizontal Basket Support
            this.horizontalSupport = new THREE.Mesh(new THREE.CubeGeometry(0.25, 0.25, rimWidth / 2 + 2, 10),
                new THREE.MeshLambertMaterial({ color: 0xE3F3E1 }));
            // this.horizontalSupport.position.set(10 * Math.cos(Math.PI * this.angle), 1, 10 * Math.cos(Math.PI * this.angle));
            // this.horizontalSupport.position.set(10 * Math.sin(Math.PI * this.angle), 1, 10 * Math.sin(Math.PI * this.angle));
            this.horizontalSupport.position.set(10 * Math.cos(Math.PI * this.angle), 1, 10 * Math.sin(Math.PI * this.angle));
            this.horizontalSupport.rotation.x = Math.PI * 0.5;
            this.horizontalSupport.geometry.translate(0, 0, 1);
            this.horizontalSupport.castShadow = true;
            this.axle.add(this.horizontalSupport);
            basketSupport.push(this.horizontalSupport);

            //  ---Vertical Basket Support
            this.verticalSupport = new THREE.Mesh(new THREE.CubeGeometry(0.25, 0.25, 2, 10),
                new THREE.MeshLambertMaterial({ color: 0xE3F3E1 }));
            this.verticalSupport.position.set(0, 0, 0);
            this.verticalSupport.rotation.y = Math.PI * 0.5;
            this.verticalSupport.geometry.translate(0, 0, -1);
            this.verticalSupport.castShadow = true;
            this.horizontalSupport.add(this.verticalSupport);

            //  Generating Basket
            this.basket = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7),
                new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
            this.basket.geometry.translate(0, 2, 0);
            this.basket.rotation.z = Math.PI * 0.5;
            this.horizontalSupport.add(this.basket);
        }
        //  Create outer Ring    
        this.extrudeSettings = {
            steps: 2,
            depth: 1,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1,
            curveSegments: 32
        };

        this.ring = new THREE.Shape();
        // this.ring.moveTo(50, 10);
        this.ring.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
        this.hole = new THREE.Path();
        // this.hole.moveTo(20, 10);
        this.hole.absarc(0, 0, InnerRadius, 0, Math.PI * 2, true);
        this.ring.holes.push(this.hole);
        this.ring = new THREE.Mesh(new THREE.ExtrudeGeometry(this.ring, this.extrudeSettings), new THREE.MeshLambertMaterial({ color: 0x654321 }));
        this.ring.castShadow = true;
        this.ring.position.set(0, this.extrudeSettings.depth / 2, 0);
        this.ring.rotation.x = Math.PI * 0.5;
        this.axle.add(this.ring);
        
        // this.ring2 = new THREE.Shape();
        // // this.ring.moveTo(50, 10);
        // this.ring2.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
        // this.hole = new THREE.Path();
        // // this.hole.moveTo(20, 10);
        // this.hole.absarc(0, 0, InnerRadius, 0, Math.PI * 2, true);
        // this.ring2.holes.push(this.hole);
        // this.ring2 = new THREE.Mesh(new THREE.ExtrudeGeometry(this.ring, this.extrudeSettings), new THREE.MeshLambertMaterial({ color: 0x654321 }));
        // this.ring2.castShadow = true;
        // this.ring2.position.set(0, this.extrudeSettings.depth / 2, 0);
        // this.ring2.rotation.x = Math.PI * 0.5;
        // this.axle.add(this.ring2);

        wheels.push(this);
        // wheels = this;
        this.rotateAxle = function (rotationSpeed) {
            this.axle.rotation.x += rotationSpeed * Math.PI;
            basketSupport.forEach((support) => support.rotation.z -= rotationSpeed * Math.PI);
        }
    }
}

function setupDatGui() {

    controls = new function () {

        this.outerRadius = outerRadius;
        this.innerRadius = innerRadius;
        this.rimWidth = rimWidth;
        this.axleRadius = axleRadius;
        this.spokeLength = spokeLength;
        this.numberOfSpokes = numberOfSpokes;
        this.rotateWheel = rotateWheel;
        this.rotate = toRotate;
        this.refreshWheel = function () {
            scene.remove(wheels.axle);
            basketSupport = [];
            createWheel();
        }
    }

    let gui = new dat.GUI();
    gui.add(controls, 'outerRadius', 0, 25).onChange((c) => outerRadius = c);
    gui.add(controls, 'innerRadius', 0, 20).onChange((c) => innerRadius = c);
    gui.add(controls, 'rimWidth', 0, 20).onChange((c) => rimWidth = c);
    gui.add(controls, 'axleRadius', 0, 5).onChange((c) => axleRadius = c);
    gui.add(controls, 'spokeLength', 0, 45).onChange((c) => spokeLength = c);
    gui.add(controls, 'numberOfSpokes', 5, 20).step(2).onChange((c) => numberOfSpokes = c);
    gui.add(controls, 'rotateWheel').onChange((c) => rotateWheel = c);
    gui.add(controls, 'rotate').onChange((c) => toRotate = c);
    gui.add(controls, 'refreshWheel');
    //let upperFolder = gui.addFolder('Upper arm');
    //upperFolder.add(controls, 'upperRotationX', -Math.PI * 0.5, Math.PI * 0.5);
    //upperFolder.add(controls, 'upperRotationY', -Math.PI * 0.5, Math.PI * 0.5);
    //upperFolder.add(controls, 'upperRotationZ', -Math.PI * 0.5, Math.PI * 0.5);


    //gui.add(controls, 'stop').name('Stop rotation').onChange((stop) => speed = !stop ? 0.01 : 0);

}

function render() {

    orbitControls.update();
    // axle.rotation.x += 0.1;
    // rotateAxle(0.1);
    if(rotateWheel)
        wheels.forEach((wheel) => wheel.rotateAxle(0.01));
    // wheels.rotateAxle(0.01);

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
