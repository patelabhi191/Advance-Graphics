
var  camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    plane,
    torusMaterial;



function init(){
    scene       = new THREE.Scene();
    renderer    = new THREE.WebGLRenderer();
        
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xD3D3D3);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    
    clock = new THREE.Clock();
}
    function loadGUI(){
    //Setup the dat-gui widget
    control = new function(){
        this.clearCoatLevel = 0.5;
        this.clearCoatRoughness = 0.2;
        this.reflectivity = 0.5;
        this.metalness= 0.5;
        this.bumpScale=0.5;
        this.emissiveIntensity = 0.9;
        this.wireframe = false;
        this.roughness = 0.5;
        this.transparent = false;
        this.opacity= 0.9;
        this.visible = true;
        this.depthTest = true;
        this.aoMapIntensity =0.2;
        this.morphTargets = false;
        this.morphNormals = false;
        this.emissive= 0xffffff;    
        this.aoMap = 0xffffff;
    }

    // Gui box
    var gui = new dat.GUI();
    gui.add(control, 'clearCoatLevel',0.0,1.0).name('Coat Level')
    .onChange((c) => {torusMaterial.clearCoat = c;});
    gui.add(control, 'clearCoatRoughness',0.0,1.0).name('Coat Roughness')
    .onChange((c) => {torusMaterial.clearCoatRoughness = c;});
    gui.add(control, 'reflectivity',0.0,1.0).name('Reflectivity')
    .onChange((c) => {torusMaterial.reflectivity = c;});
    gui.add(control, 'metalness',0.0,1.0).name('Metalness')
    .onChange((c) => {torusMaterial.metalness = c;});
    gui.add(control, 'aoMapIntensity',0.0,1.0).name('AO Map Intensity')
    .onChange((c) => {torusMaterial.aoMapIntensity = c;});
    gui.add(control, 'emissiveIntensity',0.0,1.0).name('Emissive Intensity')
    .onChange((c) => {torusMaterial.emissiveIntensity = c;});
    gui.add(control, 'opacity',0.0,1.0).name('opacity')
    .onChange((c) => {torusMaterial.opacity = c;});
     gui.add(control, 'roughness',0.0,1.0).name('Roughness')
    .onChange((c) => {torusMaterial.roughness = c;});
    gui.add(control, 'transparent').name('Transperancy').onChange((c) => {torusMaterial.transparent = c;});;
    gui.add(control, 'visible').name('Visibility').onChange((c) => {torusMaterial.visible = c;});;
    gui.add(control, 'depthTest').name('Depth test').onChange((c) => {torusMaterial.depthTest = c;});;
    gui.add(control, 'wireframe').name('Wire Farme').onChange((c) => {torusMaterial.wireframe = c;});;
    gui.add(control, 'morphTargets').onChange((c) => {torusMaterial.morphTargets = c;});
    gui.add(control, 'morphNormals').onChange((c) => {torusMaterial.morphNormals = c;});
    gui.addColor(control, 'emissive').name('Emissive')
    .onChange((c) => {torusMaterial.emissive=new THREE.Color(c);});
    gui.addColor(control, 'aoMap').name('aoMap')
    .onChange((c) => {torusMaterial.emissive=new THREE.Color(c);});

}



function setUpCameraAndLight(){
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);

        camera.position.x = 35;
        camera.position.y = 20;
        camera.position.z = 10;

        camera.lookAt(scene.position);
        
        ambient = new THREE.AmbientLight(0x3c3c3);
        ambient.castShadow = true;
        scene.add(ambient);

        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0,50,0);
        spotLight.castShadow = true;
        scene.add(spotLight);

       
    trackballControl = new THREE.TrackballControls(camera,renderer.domElement);
}

function createGeometry(){
    //Plane
    let geo = new THREE.PlaneGeometry(70,30,1,1);
    let mat =  new THREE.MeshStandardMaterial({color : 0xeeeeee});
    let plane = new THREE.Mesh(geo, mat);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);

   
    //ring
    var geometry = new THREE.TorusGeometry( 5, 2, 10, 20 );
    torusMaterial = new THREE.MeshPhysicalMaterial( { color: 0x008d8d } );
    torus = new THREE.Mesh( geometry, torusMaterial );
    torus.receiveShadow = true;
    torus.position.x = -5;
    torus.position.y = 10;
    torus.position.z = 0;
    torus.castShadow = true;
    torus.receiveShadow = true;
    scene.add( torus );
    

}

function render(){
    trackballControl.update(clock.getDelta());
    torus.rotation.y += 0.02;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}



window.onload = () => {
    loadGUI();
    init();
    setUpCameraAndLight();
    createGeometry();
    render();
}