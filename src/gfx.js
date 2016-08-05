const gfx = (() => {
    const VALID_TYPES = ['2d', '3d'];

    let type = '2d'; // assume 2d at beginning, mods can update this

    let scene;
    let camera;
    let renderer;
    let depth = new Uint16Array(conf.kinect.res.width * conf.kinect.res.height);

    let render = _.noop;

    let controls;

    const clock = new THREE.Clock();

    function set(mod, newtype) {

        // remove any pre-existing canvases
        _.invoke(document.querySelectorAll('canvas'), 'remove');

        // set the mode to either 2d or 3d based on the current mod
        if (_.includes(VALID_TYPES, newtype)) {
            type = newtype;
            if (type === '2d') {

                delete this.gl;

                // create a skeleton p5 sketch; the current mod will draw into the
                // canvas created by this sketch
                let sketch = function mod_sketch( p ) {
                    p.setup = function mod_sketch_setup() {
                        p.createCanvas(window.innerWidth, window.innerHeight);
                    };
                    p.draw = _.noop; //mod.update.bind(mod);
                };

                // unlike threejs, p5 conrols its own render loop, so set our
                // render function to noop
                render = _.noop;

                this.p5 = new p5(sketch, document.body);

                // since this p5 object inherits all the drawing functions, we must
                // bind them all to the p5 so THIS instance owns them, then assign
                // them to window to greatly simplify the invokation of p5
                // drawing functions.
                //
                // ie, rect() instead of gfx.p5.rect();

                _.bindAll(this.p5, _.functionsIn(this.p5));
                _.assignIn(window, this.p5);

            }
            else if (type === '3d') {
                delete this.p5;
                scene  = new THREE.Scene();
                camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 8000 );
                camera.position.x = 0;
                camera.position.y = 0;
                camera.position.z = 1100;
                renderer = new THREE.WebGLRenderer();
                renderer.setClearColor( 0x000000, 1 );
                renderer.setSize( window.innerWidth, window.innerHeight );
                document.body.appendChild( renderer.domElement );

                controls = new THREE.OrbitControls( camera, renderer.domElement );

                render = function render3d() {
                    renderer.render(scene, camera);
                };

                this.gl = { scene, camera, renderer };
            }
        }
        else {
            throw new Error('Invalid type for gfx.set().  Must be "2d" or "3d"');
        }

        this.update();
    }

    function reset() {

    }

    function update(data) {
        this.data = input.read();
        this.frame_time = clock.getDelta();
        this.run_time = clock.getElapsedTime();
        render();
    }

    let gfx = {
        conf,
        set,
        reset,
        depth,
        update
    };

    gfx.reset();

    return gfx;
})();
