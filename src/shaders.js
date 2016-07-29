const shaders = (() => {

    /**
     * From a `fetch` API response, get the text.
     */
    function get_fetch_text(response) {
        if (response.ok) {
            return response.text();
        }
        else {
            console.log(`Failed to fetch ${response}`);
        }
    }

    /**
     * Return a function which will inject text into an element.
     */
    function mk_script_injector(element) {
        return function script_injector(text) {
            element.innerHTML = text;
        };
    }

    /**
     * Given a script element, fetch its `src` and inject the response into the element.
     */
    function fetch_inject(el) {
        return fetch( el.src ).then( get_fetch_text ).then( mk_script_injector(el) );
    }

    /**
     * Fetch GLSL shaders, then init
     */
    function fetch_shaders() {
        var shader_elements = document.querySelectorAll('script[type^=x-shader]');
        var needs_fetching = _.every(shader_elements, {'innerHTML': ''});

        if (needs_fetching) {
            return Promise.all( _.map(shader_elements, fetch_inject) );
        }
        else {
            return Promise.resolve('scripts already loaded');
        }
    }

    function get_shader(name, type) {
        return document.getElementById(`${name}-${type}-shader`).textContent;
    }

    function get_vert(name) {
        return get_shader(name, 'vert');
    }

    function get_frag(name) {
        return get_shader(name, 'frag');
    }

    return {
        fetch: fetch_shaders,
        get_vert,
        get_frag,
    };
})();
