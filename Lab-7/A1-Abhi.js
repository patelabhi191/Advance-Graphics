
var  camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    plane,
    theta = 0;
    dTheta = 2 * Math.PI / 3000;
    planetSpeed = 1;
    moonSpeed = 1;

function init(){
    scene       = new THREE.Scene();
    renderer    = new THREE.WebGLRenderer();
        
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);//a0a0D3); //Black Background
    document.body.appendChild(renderer.domElement);
    clock = new THREE.Clock();
}

function setUpCameraAndLight(){
        
        camera= new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight, 0.1,800);

        camera.position.x = 200;
        camera.position.y = 200;
        camera.position.z = 0;

        camera.lookAt(scene.position);
   
    let ambient = new THREE.AmbientLight(0xffffff);
        scene.add(ambient);

    //Sunlight
    var light = new THREE.PointLight( 0xffff11,2,200);
    light.position.set(0,0,0);
    scene.add( light );

    trackballControl = new THREE.TrackballControls(camera,renderer.domElement);
}

function createGeometry(){
    
    //Reference Plane
    let geo = new THREE.PlaneGeometry(60,20,1,1);
    let mat =  new THREE.MeshLambertMaterial({color : 0x0a0aff});
    plane = new THREE.Mesh(geo, mat);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 10;
    plane.position.z = 0;
  //  scene.add(plane);

    //sun
    let sun_o = new THREE.SphereGeometry( 25, 32, 32);
    let sun_m = new THREE.MeshLambertMaterial( {color: 0xffdd00} );
    let Sun = new THREE.Mesh( sun_o, sun_m );
    scene.add(Sun);

    //Mercury
    let mercury_o = new THREE.SphereGeometry( 2,15,15);
    let mercury_m = new THREE.MeshLambertMaterial( {color: 0xfd4f4a0} );
    Mercury = new THREE.Mesh( mercury_o, mercury_m );
    Mercury.position.z = 40;
    scene.add(Mercury);

    //Venus
    var v_o = new THREE.SphereGeometry( 4, 32, 32);
    var v_m = new THREE.MeshLambertMaterial( {color: 0xffa500} );
    Venus = new THREE.Mesh( v_o, v_m );
    Venus.position.z=50;
    scene.add(Venus);

    //Earth
    var e_o = new THREE.SphereGeometry( 4, 32, 32);
    var e_m = new THREE.MeshLambertMaterial( {color: 0x008bff} );
    Earth = new THREE.Mesh( e_o, e_m );
    //scene.add(Earth);

    //Earth's Moon
    var em_o = new THREE.SphereGeometry( 1.7, 32, 32);
    var em_m = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    Earth_m = new THREE.Mesh( em_o, em_m );
    Earth_m.position.y =5;
   // scene.add(Earth_m);

    earthGroup = new THREE.Group();
    earthGroup.add(Earth);
    earthGroup.add(Earth_m);
    scene.add(earthGroup);

    //Mars
    var m_o = new THREE.SphereGeometry( 3, 32, 32);
    var m_m = new THREE.MeshLambertMaterial( {color: 0xff3500} );
    Mars = new THREE.Mesh( m_o, m_m );
    Mars.position.z=75;
    scene.add(Mars);

    //Jupiter
    var j_o = new THREE.SphereGeometry( 10, 32, 32);
    var j_m = new THREE.MeshLambertMaterial( {color: 0xa59186} );
    Jupiter = new THREE.Mesh( j_o, j_m );
    //scene.add(Jupiter);

    //Jupiter's Moon
    var jm1_o = new THREE.SphereGeometry( 2, 32, 32);
    var jm1_m = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    Jupiter_m1 = new THREE.Mesh( jm1_o, jm1_m );
    
    var jm2_o = new THREE.SphereGeometry( 2, 32, 32);
    var jm2_m = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    Jupiter_m2 = new THREE.Mesh( jm2_o, jm2_m );

    var jm3_o = new THREE.SphereGeometry( 2, 32, 32);
    var jm3_m = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    Jupiter_m3 = new THREE.Mesh( jm3_o, jm3_m );

    var jm4_o = new THREE.SphereGeometry( 1, 32, 32);
    var jm4_m = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    Jupiter_m4 = new THREE.Mesh( jm4_o, jm4_m );

    var jm5_o = new THREE.SphereGeometry( 1.5, 32, 32);
    var jm5_m = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    Jupiter_m5 = new THREE.Mesh( jm5_o, jm5_m );

    jupiterGroup = new THREE.Group();
    jupiterGroup.add(Jupiter);
    jupiterGroup.add(Jupiter_m1);
    jupiterGroup.add(Jupiter_m2);
    jupiterGroup.add(Jupiter_m3);
    jupiterGroup.add(Jupiter_m4);
    jupiterGroup.add(Jupiter_m5);
    scene.add(jupiterGroup);


    //Saturn
    var s_o = new THREE.SphereGeometry( 7, 32, 32);
    var s_m = new THREE.MeshLambertMaterial( {color: 0xc2b280} );
    Saturn = new THREE.Mesh( s_o, s_m );
    //scene.add(Saturn);
    
    var geometry = new THREE.RingGeometry(9,12,15,15);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x = 200;

    //saturn's moon
    var sm1_o = new THREE.SphereGeometry( 2, 32, 32);
    var sm1_m = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    Saturn_m1 = new THREE.Mesh( sm1_o, sm1_m );
    
    var sm2_o = new THREE.SphereGeometry( 2, 32, 32);
    var sm2_m = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    Saturn_m2 = new THREE.Mesh( sm2_o, sm2_m );

    var sm3_o = new THREE.SphereGeometry( 2, 32, 32);
    var sm3_m = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    Saturn_m3 = new THREE.Mesh( sm3_o, sm3_m );

    saturnGroup = new THREE.Group();
    saturnGroup.add(Saturn);
    saturnGroup.add(mesh);
    saturnGroup.add(Saturn_m1);
    saturnGroup.add(Saturn_m2);
    saturnGroup.add(Saturn_m3);
    scene.add(saturnGroup);

    //Uranus
    var u_o = new THREE.SphereGeometry( 5, 32, 32);
    var u_m = new THREE.MeshLambertMaterial( {color: 0x5501ff} );
    Uranus = new THREE.Mesh( u_o, u_m );
    Uranus.position.z=140;
    scene.add(Uranus);

    //Neptune
    var n_o = new THREE.SphereGeometry( 4.5, 32, 32);
    var n_m = new THREE.MeshLambertMaterial( {color: 0x0155ff} );
    Neptune = new THREE.Mesh( n_o, n_m );
    Neptune.position.z=155;
    scene.add(Neptune);

    //Pluto
    var p_o = new THREE.SphereGeometry( 3, 32, 32);
    var p_m = new THREE.MeshLambertMaterial( {color: 0xaaffaa} );
    Pluto = new THREE.Mesh( p_o, p_m );
    Pluto.position.z=170;
    scene.add(Pluto);

    //Orbit
    var r1 = new THREE.RingGeometry(39.8,40,50,50);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    var ring1 = new THREE.Mesh( r1, material );
    ring1.rotation.x = 300;
    scene.add( ring1 );
    var r2 = new THREE.RingGeometry(49.8,50,50,50);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    var ring2 = new THREE.Mesh( r2, material );
    ring2.rotation.x = 300;
    scene.add( ring2 );
    var r3 = new THREE.RingGeometry(61.8,62,50,50);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    var ring3 = new THREE.Mesh( r3, material );
    ring3.rotation.x = 300;
    scene.add( ring3 );
    var r4 = new THREE.RingGeometry(74.8,75,50,50);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    var ring4 = new THREE.Mesh( r4, material );
    ring4.rotation.x = 300;
    scene.add( ring4 );
    var r5 = new THREE.RingGeometry(93.8,94,50,50);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    var ring5 = new THREE.Mesh( r5, material );
    ring5.rotation.x = 300;
    scene.add( ring5 );
    var r6 = new THREE.RingGeometry(119.8,120,50,50);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    var ring6 = new THREE.Mesh( r6, material );
    ring6.rotation.x = 300;
    scene.add( ring6 );
    var r7 = new THREE.RingGeometry(139.8,140,50,50);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    var ring7 = new THREE.Mesh( r7, material );
    ring7.rotation.x = 300;
    scene.add( ring7 );
    var r8 = new THREE.RingGeometry(154.8,155,50,50);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    var ring8 = new THREE.Mesh( r8, material );
    ring8.rotation.x = 300;
    scene.add( ring8 );
    var r9 = new THREE.RingGeometry(169.8,170,50,50);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    var ring9 = new THREE.Mesh( r9, material );
    ring9.rotation.x = 300;
    scene.add( ring9 );
}

function loadGUI(){
    //Setup the dat-gui widget
    control = new function(){
        this.planetSpeed = 0.5;
        this.moonSpeed = 0.2;
        
    }

    // Gui box
    var gui = new dat.GUI();
    gui.add(control, 'planetSpeed',0.0,50.0).name('Planet Speed')
    .onChange((c) => {planetSpeed = c;});
    gui.add(control, 'moonSpeed',0.0,15.0).name('Moon Speed')
    .onChange((c) => {moonSpeed = c;});
   
}


function render(){
    trackballControl.update(clock.getDelta());

    theta += dTheta;
    Mercury.position.x = 40 * Math.cos(theta * planetSpeed*2);
    Mercury.position.z = 40 * Math.sin(theta * planetSpeed*2);

    Venus.position.x = 50 * Math.cos(1 + (theta * planetSpeed*1.5));
    Venus.position.z = 50 * Math.sin(1 + (theta * planetSpeed*1.5));

    earthGroup.position.x = 62 * Math.cos(2.87 + theta * planetSpeed);
    earthGroup.position.z = 62 * Math.sin(2.87 + theta * planetSpeed);
    Earth_m.position.x = 8 * Math.cos(theta * moonSpeed *8);
    Earth_m.position.y = 8 * Math.sin(theta * moonSpeed*8);

    Mars.position.x = 75 * Math.cos(8 + (theta * planetSpeed/1.25));
    Mars.position.z = 75 * Math.sin(8 + (theta * planetSpeed/1.25));

    jupiterGroup.position.x = 94 * Math.cos(4.1 + (theta * planetSpeed/2));
    jupiterGroup.position.z = 94 * Math.sin(4.1 + (theta * planetSpeed/2));
    Jupiter_m1.position.x = 15 * Math.cos(1 + (theta * moonSpeed*2.75));
    Jupiter_m1.position.z = 15 * Math.sin(1 + (theta * moonSpeed*2.75));
    Jupiter_m2.position.x = 15 * Math.cos(2 + (theta * moonSpeed*2.75));
    Jupiter_m2.position.z = 15 * Math.sin(2 + (theta * moonSpeed*2.75));
    Jupiter_m3.position.x = 17 * Math.cos(theta * moonSpeed*3.5);
    Jupiter_m3.position.y = 17 * Math.sin(theta * moonSpeed*3.5);
    Jupiter_m4.position.z = 19 * Math.cos(theta * moonSpeed*5);
    Jupiter_m4.position.y = 19 * Math.sin(theta * moonSpeed*5);
    Jupiter_m5.position.y = 17 * Math.cos(3 + theta * moonSpeed*3.5);
    Jupiter_m5.position.x = 17 * Math.sin(3 + theta * moonSpeed*3.5);

    saturnGroup.position.x = 120 * Math.cos(5.87 + (theta * planetSpeed/2.5));
    saturnGroup.position.z = 120 * Math.sin(5.87 + (theta * planetSpeed/2.5));
    Saturn_m2.position.x = 12 * Math.cos(2 + (theta * moonSpeed*2.75));
    Saturn_m2.position.z = 12 * Math.sin(2 + (theta * moonSpeed*2.75));
    Saturn_m3.position.x = 13 * Math.cos(theta * moonSpeed*3.5);
    Saturn_m3.position.y = 13 * Math.sin(theta * moonSpeed*3.5);
    Saturn_m1.position.z = 14 * Math.cos(theta * moonSpeed*5);
    Saturn_m1.position.y = 14 * Math.sin(theta * moonSpeed*5);

    Uranus.position.x = 140 * Math.cos(6 + (theta * planetSpeed/3.75));
    Uranus.position.z = 140 * Math.sin(6 + (theta * planetSpeed/3.75));

    Neptune.position.x = 155 * Math.cos(1 + (theta * planetSpeed/4.2));
    Neptune.position.z = 155 * Math.sin(1 + (theta * planetSpeed/4.2));

    Pluto.position.x = 170 * Math.cos(7.5 + (theta * planetSpeed/5));
    Pluto.position.z = 170 * Math.sin(7.5 + (theta * planetSpeed/5));

    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

window.onload = () => {
    init();
    loadGUI();
    setUpCameraAndLight();
    createGeometry();
    render();
}