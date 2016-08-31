// choose a random mod to be the starting one
const modctrl = (() => {
    let modnames = names();
    let modcount = _.size(modnames);
    let i        = Math.max(0, modnames.indexOf(location.hash.slice(1)));
    let curmod;
    let gfx;

    let display_title = $('#nowplaying #title');
    let display_author = $('#nowplaying #author');

    function next() {
        i += 1;
        i %= modcount;
        set(modnames[i]);
    }

    function set(modname) {
        i = _.indexOf(modnames, modname);
        curmod.destroy(gfx);
        gfx.reset();

        create(gfx);

        location.hash = modname;

        location.reload();
    }

    function names() {
        return _.keys(mods);
    }

    function get() {
        return curmod;
    }

    function update(_gfx) {
        curmod.update(gfx);

        //modnames = names();
        //modcount = _.size(modnames); // probably need this for DIY station mods
    }

    function create(_gfx, modname=modnames[i]) {

        console.log(`Activating mod: ${modname}`);

        if (_.includes(modnames, modname)) {
            gfx = _gfx;
            curmod = new mods[modname](gfx);
        }
        else {
            gfx = _gfx;
            curmod = new mods[modnames[i]](gfx);
            location.hash = modnames[i];
        }

        // display the title and author
        display_title.text(curmod.title);
        display_author.text(curmod.author);
    }

    return {
        next,
        get,
        set,
        names,
        update,
        create
    };
})();
