import np from 'nprogress';

let iid; // interval id
let tid; // tick id

export function start(minutes, tick, tick_cb, end_cb) {

    // stop everything, just in case start/stop calls accidentally overlap
    stop();

    // configure nprogress (the minimalistic progress bar)
    np.configure({
        minimum     : 0,
        showSpinner : false,
        trickle     : false,
        easing      : 'linear',
        speed       : minutes * 1000 * 60,
    });

    // now kick off the new stuff!
    np.start();

    // set the progress bar to done, but it doesn't fill immediately due to the linear easing lasting the same duration as our mod
    np.set(1.0); 

    iid = setInterval(end(minutes, tick, tick_cb, end_cb), minutes * 1000 * 60);

    tid = setInterval(tick_cb, tick * 1000 * 60);
}

function end(minutes, tick, tick_cb, end_cb) {
    return function end_fn() {
        stop();
        end_cb();
        start(minutes, tick, tick_cb, end_cb);
    };
}

export function stop() {
    clearInterval(iid);
    clearInterval(tid);
    np.remove();
}
