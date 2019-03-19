const renderer = new THREE.WebGLRenderer({antialias:true});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 1.0, 200);
const clock = new THREE.Clock();

var ambientLight, ambientColor = 0x333333,
  spotLight, spotColor = 0xcc6666,
  pointLight, pointColor = 0x6666ff,
  directionalLight, directionalColor = 0x77ff77,
  rectAreaLight, rectAreaColor = 0xff0000,
  hemiSphereLight, hemiSkyColor = 0x0000ff,  hemiGroundColor= 0x00ff00,
  trackballControls,
  step = 0,
  pathRadius = 10;


function init(){
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x226622);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  document.body.appendChild(renderer.domElement);
  trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
}

function setupCameraAndLight(){
  camera.position.set(-40, 50, 40);
  camera.lookAt(scene.position);

  ambientLight = new THREE.AmbientLight(ambientColor);
  scene.add(ambientLight);

  let planeMaterial = new THREE.MeshStandardMaterial({color: 0xeeeeee});
  //let planeMaterial = new THREE.MeshPhongMaterial({color: 0xeeeeee});
  let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.material.side = THREE.DoubleSide;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, 0, 0);
  scene.add(plane);

  pointLight = new THREE.PointLight(pointColor, 0.5, 100);
  pointLight.position.set(20, 30, 20);
  pointLight.decay = 0.2;
  pointLight.lookAt(plane);
  pointLight.castShadow = true;
  scene.add(pointLight);

  spotLight = new THREE.SpotLight(spotColor);
  spotLight.position.set(-20, 20, -10);
  spotLight.target = plane;
  spotLight.distance = 0;
  spotLight.angle = 0.4;
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 100;
  spotLight.shadow.camera.fov = 120;


  scene.add(spotLight);
  scene.add(new THREE.SpotLightHelper(spotLight));//for debugging

  rectAreaLight =  new THREE.RectAreaLight(rectAreaColor, 1, 60, 100);
  rectAreaLight.position.set(-5, 12, -5);
  rectAreaLight.lookAt(plane);
  scene.add(rectAreaLight);
  rectAreaLight.add(new THREE.RectAreaLightHelper(rectAreaLight));//does not work

  directionalLight = new THREE.DirectionalLight(directionalColor);
  directionalLight.position.set(20, 60, 10);
  directionalLight.castShadow = true;
  directionalLight.target = plane;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 200;
  directionalLight.shadow.camera.left = -50;
  directionalLight.shadow.camera.right = 50;
  directionalLight.shadow.camera.top = 50;
  directionalLight.shadow.camera.bottom = -50;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  helper = new THREE.DirectionalLightHelper(directionalLight);
  scene.add(helper);
  scene.add(directionalLight);


  hemiSphereLight = new THREE.HemisphereLight(hemiSkyColor, hemiGroundColor, 0.6);//skycolor, groundcolor, intensity
  hemiSphereLight.position.set(0, 500, 0);
  scene.add(hemiSphereLight);
}

function createGeometry(){

  //scene.add(new THREE.AxesHelper(100));
  let box = new THREE.Mesh(
    new THREE.BoxGeometry(12, 4, 8), 
    new THREE.MeshStandardMaterial({color: 0xeeeeee}));
  box.position.set(0, 12, 0);
  box.castShadow = true;
  scene.add(box); 

  let ball = new THREE.Mesh(
     new THREE.SphereGeometry(4, 24, 24),
     new THREE.MeshStandardMaterial({color: 0x66aa66, specular: 0x0000ff})
  );
  ball.position.set(-20, 6, 10);
  ball.castShadow=true;
  scene.add(ball);
}

function setupDatGui(){
  let controls = new function(){
    this.ambientL = ambientLight.visible;
    this.ambientColor = ambientColor;
    this.spotL = spotLight.visible;
    this.spotColor = spotColor;
    this.pointL = pointLight.visible;
    this.pointColor = pointColor;
    this.directionL = directionalLight.visible;
    this.directionC = directionalColor;
    this.rectL = rectAreaLight.visible;
    this.rectColor = rectAreaColor;
    this.hemiL = hemiSphereLight.visible;
    this.hemiGround = hemiGroundColor;
    this.hemiSky = hemiSkyColor;
  }
  let gui = new dat.GUI();
  gui.add(controls, 'ambientL').name('Ambient Light').onChange( (e) => { ambientLight.visible = e});
  gui.addColor(controls, 'ambientColor').name('Ambient Color').onChange((c) => {
    ambientLight.color = new THREE.Color(c);
  });

  gui.add(controls, 'spotL').name('Spot Light').onChange( (e) => { spotLight.visible = e});
  gui.addColor(controls, 'spotColor').name('Spot Color').onChange((c) => {
    spotLight.color = new THREE.Color(c);
  });

  gui.add(controls, 'pointL').name('Point Light').onChange( (e) => { pointLight.visible = e});
   gui.addColor(controls, 'pointColor').name('Point Color').onChange((c) => {
    pointLight.color = new THREE.Color(c);
  });
  
  gui.add(controls, 'directionL').name('Directional Light').onChange( (e) => { directionalLight.visible = e});
  gui.addColor(controls, 'directionC').name('Directional Color').onChange((c) => {
    directionalLight.color = new THREE.Color(c);
  });
  
  gui.add(controls, 'rectL').name('Rect Area Light').onChange( (e) => { rectAreaLight.visible = e});
  gui.addColor(controls, 'rectColor').name('Area Color').onChange((c) => {
    rectAreaLight.color = new THREE.Color(c);
  });
  gui.add(controls, 'hemiL').name('Hemisphere Light').onChange( (e) => { hemiSphereLight.visible = e});
  gui.addColor(controls, 'hemiSky').name('Sky Color').onChange((c) => {
    hemiSphereLight.color = new THREE.Color(c);
  });
  gui.addColor(controls, 'hemiGround').name('Ground Color').onChange((c) => {
    hemiSphereLight.groundColor = new THREE.Color(c);
  });
}

function render(){
  trackballControls.update(clock.getDelta());
  //scene.rotation.y += 0.01;//rotates the scene
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

window.onload = () =>{
    init();
    setupCameraAndLight();
    createGeometry();
    setupDatGui();
    render();

}
