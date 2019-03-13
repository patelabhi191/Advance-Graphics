
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
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    
    clock = new THREE.Clock();

    //Setup the dat-gui widget
    control = new function(){
        this.lightMenu = function(){
            lightMenu(this.ambientLight,this.ambientcolor,this.spotLight,this.spotcolor,
                this.pointLight,this.pointcolor,this.directionLight,this.directionalcolor,
                this.rectLight, this.rectColor , this.hemisLight, this.hemiColor);
        };
        this.ambientLight = true;
        this.ambientColor = 0x3c3c3;

        this.spotLight = true;
        this.spotColor = 0xfd2ea1;

        this.pointLight = true;
        this.pointColor = 0x6284ff;

        this.directionLight = true;
        this.directionalColor = 0x64dafa;

        this.rectLight = true;
        this.rectColor = 0x5577aa;

        this.hemisLight = true;
        this.hemiColor = 0xffffff;

        
    }
    // Black Gui box
    var gui = new dat.GUI();
    gui.add(control, 'lightMenu');
    gui.add(control, 'ambientLight').listen().onChange((e) => {
        ambient.visible = e;});
gui.addColor(control, 'ambientColor').name('Ambient Color').onChange((c) => {
        ambient.color = new THREE.Color(c);});

gui.add(control, 'spotLight').listen().onChange((e) => {
        spotLight.visible = e;});
gui.addColor(control, 'spotColor').onChange((c) => {
        spotLight.color = new THREE.Color(c);});

gui.add(control, 'pointLight').listen().onChange((e) => {
        pointLight.visible = e;});
gui.addColor(control, 'pointColor').onChange((c) => {
        pointLight.color = new THREE.Color(c);});

gui.add(control, 'directionLight').listen().onChange((e) => {
        directionLight.visible = e;});
gui.addColor(control, 'directionalColor').onChange((c) => {
        directionLight.color = new THREE.Color(c);});

        gui.add(control, 'rectLight').listen().onChange((e) => {
            rectLight.visible = e;});
gui.addColor(control, 'rectColor').name('Ambient Color').onChange((c) => {
            rectLight.color = new THREE.Color(c);});

gui.add(control, 'hemisLight').listen().onChange((e) => {
            hemiSpherLight.visible = e;});
gui.addColor(control, 'hemiColor').name('Ambient Color').onChange((c) => {
            hemiSpherLight.color = new THREE.Color(c);});

}

function setUpCameraAndLight(){
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);

        camera.position.x = 15;
        camera.position.y = 10;
        camera.position.z = 10;

        camera.lookAt(scene.position);
        ambient = new THREE.AmbientLight(0x3c3c3);
        ambient.castShadow = true;
        scene.add(ambient);

        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(20,0,0);
        spotLight.castShadow = true;
        scene.add(spotLight);

       
        pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(8,0,0);
        pointLight.castShadow = true;
        scene.add(pointLight);

        
        directionLight = new THREE.DirectionalLight(0xffffff);
        directionLight.castShadow = true;
        scene.add(directionLight);

        rectLight = new THREE.RectAreaLight( 0xffffff, 1,10,10 );
        rectLight.castShadow = true;
        scene.add(rectLight);

      
        hemiSpherLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        hemiSpherLight.castShadow = true;
        scene.add(hemiSpherLight);



     trackballControl = new THREE.TrackballControls(camera,renderer.domElement);
}

function createGeometry(){
    //Plane
    let geo = new THREE.PlaneGeometry(60,20,1,1);
    let mat =  new THREE.MeshPhongMaterial({color : 0xeeeeee});
    plane = new THREE.Mesh(geo, mat);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);

    //Cube
    let cube = new THREE.BoxGeometry(10,10,5,1);
    let matc =  new THREE.MeshStandardMaterial({ color: 0xeeeeee });
    cuboid = new THREE.Mesh(cube, matc);
    cuboid.receiveShadow = true;
    cuboid.rotation.x = 0.5 * Math.PI;
    cuboid.position.x = -5;
    cuboid.position.y = 10;
    cuboid.position.z = 0;
    cuboid.castShadow = true;
    cuboid.receiveShadow = true;
    scene.add(cuboid);

    //Sphere
    let sph = new THREE.SphereGeometry(4,64,64)
    let mats = new THREE.MeshPhongMaterial({color: 0x66aa66, specular: 0x0000ff});
    sphere = new THREE.Mesh(sph,mats);
    sphere.receiveShadow = true;
    sphere.rotation.x = 0.5 * Math.PI;
    sphere.position.x = 5;
    sphere.position.y = 5;
    sphere.position.z = 0;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);

}


function lightMenu(size,shapes,color){
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