import * as renderer from 'renderer';
import * as state from 'state';
import * as input from 'input';
import * as transforms from 'contrib/transforms/all';
import * as conf_panel from 'conf-panel';
import conf from 'conf';

// The default transform function is merely an identity function.  It returns
// exactly what's passed in.

let transform = transforms.identity;

function set_transform(func) {
    state.clear();
    transform = typeof func === 'string' ? transforms[func] : func;
}

function create() {
    conf_panel.init(conf);
    // init whatever renderer we're using
    renderer.create( input.read() );
    update();
}

function update() {

    requestAnimationFrame(update);

    // TODO consider moving this input-gathering code outside of RAF
    // because it doesn't *necessarily* need to be updated every frame.
    // gathering input a couple times per second might be better than 60 times
    // per second.
    var newinput = input.read();

    var newdata = transform({
        input  : newinput,
        state  : state.current(),
    });
    // end of consider moving...

    renderer.update(newdata);
}

function teardown() {
    state.clear();
}

setTimeout(create, 2000);

export { set_transform };
