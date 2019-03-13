
var  camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    plane;


function init(){
    scene       = new THREE.Scene();
    renderer    = new THREE.WebGLRenderer();
        
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xD3D3D3);
    document.body.appendChild(renderer.domElement);
    
    clock = new THREE.Clock();

    //Setup the dat-gui widget
    control = new function(){
        this.showVariables = function(){
            showVariables(this.size,this.shapes,this.color);
        };
        this.size = 5;
        this.shapes = 'cube';
        this.color = 0x23da23;
        this.AddCube = function(){
            createGeometry1(this.size, this.shapes, this.color);
        };
    }
    var gui = new dat.GUI();
    gui.add(control, 'showVariables');
    gui.add(control, 'size', 2, 6).step(1);     // Increment by 1
    gui.add(control, 'shapes',['cubes', 'sphere']);
    gui.addColor(control, 'color');
    gui.add(control,'AddCube');
}

function setUpCameraAndLight(){
    camera      = new THREE.PerspectiveCamera(50, 
        window.innerWidth/window.innerHeight, 0.1, 100);

        camera.position.x = 15;
        camera.position.y = 10;
        camera.position.z = 10;

        camera.lookAt(scene.position);
    let ambient = new THREE.AmbientLight(0x3c3c3);
    let spotLight = new THREE.SpotLight(0x454d);
    spotLight.position.set( 100, 1000, 100 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );
    scene.add(ambient);

     trackballControl = new THREE.TrackballControls(camera,renderer.domElement);
}

function createGeometry1(size, shapes, color){
   

   removeGeometry();
    if(shapes == 'cubes'){
        console.log("Generated Cube..");
        let geomCuber = new THREE.BoxGeometry(size,size,size);
        let mat =  new THREE.MeshLambertMaterial({color});
        let box = new THREE.Mesh(geomCuber, mat);
        box.castShadow =true;
        scene.add(box);
            
    }

    if(shapes == 'sphere'){
        console.log("Generated Sphere..");
        let geom = new THREE.SphereGeometry(size);
        let mat =  new THREE.MeshLambertMaterial({color});
        let sphere = new THREE.Mesh(geom, mat);
        sphere.castShadow =true;
        scene.add(sphere);
    }

    
}
function createGeometry(){
    let geo = new THREE.PlaneGeometry(60,20,1,1);
    let mat =  new THREE.MeshLambertMaterial({color : 0xA9A9A9});
    plane = new THREE.Mesh(geo, mat);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -3;
    plane.position.z = 0;
    scene.add(plane);
}

function showVariables(size,shapes,color){
    console.log("Size = " + size + "\nShapes = " +shapes + "\nColor = " + color );
}


function removeGeometry(){
            var allChildren = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh & lastObject != plane ) {
                scene.remove(lastObject);
            }

}

function render(){
    trackballControl.update(clock.getDelta());
    renderer.render(scene,camera);

    requestAnimationFrame(render);
}

window.onload = () => {
    init();
    setUpCameraAndLight();
    createGeometry();
    render();
}