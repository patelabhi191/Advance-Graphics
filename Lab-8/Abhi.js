/// <reference path="libs/three.min.js" />
/// <reference path="libs/dat.gui.min.js" />
/// <reference path="libs/OrbitControls.js" />


var container, stats;
var camera, scene, renderer;

init();
animate();
setupShaders();
//setupGUI();
function init() {
    container = document.createElement('div');

    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(0, 0, 5);

    scene = new THREE.Scene();
    var urls = ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'];
    var loader = new THREE.CubeTextureLoader().setPath('assets/textures/Park3Med/');
    loader.load(urls, function (texture) {
        var pmremGenerator = new THREE.PMREMGenerator(texture);
        pmremGenerator.update(renderer);
        var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
        pmremCubeUVPacker.update(renderer);
        var envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;
        // model
        var loader = new THREE.GLTFLoader().setPath('assets/model/DamagedHelmet/glTF/');
        loader.load('DamagedHelmet.gltf', function (gltf) {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.material.envMap = envMap;
                }
            });
            scene.add(gltf.scene);
        });
        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();
        scene.background = texture;
    });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
    // stats
    stats = new Stats();
    container.appendChild(stats.dom);

    // var controls = new THREE.OrbitControls( camera);
    //controls.target.set( 0, - 0.2, - 0.2 );
    //controls.update();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
//
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update();
}

function setupShaders() {
    //let __shader1 = Shaders.BrightnessContrastShader;

    Shaders.BrightnessContrastShader.uniforms.tDiffuse.value = new THREE.TextureLoader().load('Texture.jpg');

    Shaders.BrightnessContrastShader.uniforms.brightness.value = 1;

    var material = new THREE.ShaderMaterial({
        uniforms: Shaders.BrightnessContrastShader.uniforms,
        vertexShader: Shaders.BrightnessContrastShader.vertexShader,
        fragmentShader: Shaders.BrightnessContrastShader.fragmentShader
    });
console.log(material.fragmentShader);
console.log(material.vertexShader);

    var composer = new THREE.EffectComposer(renderer);

    //NOTE: this goes in your render loop
    composer.render();

    var renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    var shaderPass = new THREE.ShaderPass(material);
    composer.addPass(shaderPass);
}

function setupDatGui() {

    controls = new function () {
    }

    let gui = new dat.GUI();

}