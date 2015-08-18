## Walkthrough

Welcome to Kimotion Hackathon!  Here you'll learn everything you need to get started with hacking on the Kimotion project.

See requirements/installation here: https://github.com/mwcz/Kimotion/README.md

First, use the 
`grunt mod $my_module_name` at the root of the Kimotion project to initialize a new module directory.  This module will allow you to create your own visualization for Kimotion.  You'll only need to add your code to the following file:

`src/mods/$my_module_name/$my_module_name.js`

*Note: the directory should be the same name as your mod file in that directory.*

### Module structure
You should notice that your mod file already has some code added to it:

  - constructor() - here you can add any setup for your mod.  A title and author field should be set for every mod so your work can be attributed correctly.  The constructor gets the gfx object passed in to interact with the ThreeJS renderer
    - add_effect() - 
  - update() - here you can change the gfx object for every rendering.  For example, if you wanted to move the ThreeJS camera to the right with every screen refresh, you could do `gfx.gl.camera.position.x++;`

The gfx object consists of the following that you can modify in order to make your mod:
  - gfx.conf - This stores the configuration for your mod.
  - gfx.depth
  - gfx.gl
    - gfx.gl.scene
    - gfx.gl.camera

