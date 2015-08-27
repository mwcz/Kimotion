Walkthrough
===========


Welcome to Kimotion Hackathon!  Here you'll learn everything you need to get started with hacking on the Kimotion project.

See requirements/installation here: https://github.com/mwcz/Kimotion/README.md

**If you feel comfortable browsing the code and learning that way, see the example mod at src/mods/example/example.js.**

Module structure
----------------

You should notice that your mod file already has some code added to it:

  - constructor() - here you can add any setup for your mod.  A title and author field should be set for every mod so your work can be attributed correctly.  The constructor gets the gfx object passed in to interact with the ThreeJS renderer
    - add your name and a title to a mod by setting the author and title attributes
      `this.author = "Your name";
       this.name = "Your mod name";`
    - add_effect() - include a predefined effect from the effects library.  See src/effects.js for a list of available effects to test out. Effects are applied in the order they are specified
  - update() - here you can change the gfx object for every rendering.  For example, if you wanted to move the ThreeJS camera to the right with every screen refresh, you could do `gfx.gl.camera.position.x++;`

The gfx object consists of the following that you can modify in order to make your mod:
  - gfx.conf - This stores the configuration for your mod.  For example, the width of the kinect depth field value can be accessed via `gfx.conf.kinect.res.width`
  - gfx.depth - This is the depth field supplied by the Kinect.  This will be a 1D array with width x height elements (with the width and height defined in the conf object).
  - gfx.gl
    - gfx.gl.scene - Current three.js [scene](http://threejs.org/docs/#Reference/Scenes/Scene)
    - gfx.gl.camera - Current three.js [camera](http://threejs.org/docs/#Reference/Cameras/Camera)


Get Started
-----------

First, use the 
`grunt mod $my_module_name` at the root of the Kimotion project to initialize a new module directory.  This module will allow you to create your own visualization for Kimotion.  You'll only need to add your code to the following file:

`src/mods/$my_module_name/$my_module_name.js`

*Note: the directory should be the same name as your mod file in that directory.*

Let's have the mod do something, like render a cube.

in constructor()

`let geometry = new THREE.BoxGeometry( 1, 1, 1 );`

Here we're creating a 1x1x1 cube box using [three.js](http://threejs.org/docs/#Reference/Extras.Geometries/BoxGeometry)

`let material = new THREE.MeshBasicMaterial( { wireframe: true } );`

[This](http://threejs.org/docs/api/materials/MeshBasicMaterial.html) defines the surface area rendering of the object, or the 'coating' that goes on an object

`this.cube = new THREE.Mesh( geometry, material );`

Create the cube using the previously created geometry and material, using the [three.js Mesh object](http://threejs.org/docs/#Reference/Objects/Mesh)

`this.cube.position.z = -2;`

An example of moving the cube away from the current camera object

`gfx.gl.scene.add( this.cube );`
`gfx.gl.camera.lookAt( this.cube.position );`

Add the cube object to the three.js scene, and have the camera look at it.  Any visualizations that need to be rendering on screen need to be added to the scene, and the camera can be manipulated to move around the scene (though generally, a lot can be achieved with moving the camera).  Sometimes the camera may need to be moved slightly to see your visualizations correctly.

If you've added the constructor to your mod, you could render your mod now but may notice that the cube is there (go to http://localhost:9001).  However the cube won't do anything interesting until we update it:

`update(gfx) {
    this.cube.rotation.x += 0.001;
    this.cube.rotation.y += 0.01;
    this.cube.rotation.z += 0.0001;
    super.update(gfx);
}`

This will rotate the cube in the x, y, and z axis.  Navigating back to the cube rendering, you should see now that the cube is rotating.


Using the depth field
---------------------

This example doesn't make use of the depth field from the Kinect.  You can manipulate the visualizations within the update() function based on what is accessed via gfx.depth.
