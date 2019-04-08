import {merge} from 'lodash'

export default class Storage {

    constructor(key) {

        this.key = key;

        if (!window.localStorage) {
            console.error('localStorage not available');
        }
    }

    plugin = store => {

        store.replaceState(merge(
            store.state,
            this.load()
        ));

        this.save(store.state);

        store.subscribe((mutation, state) => {
            this.save(state);
        })
    };

    load() {
        return JSON.parse(window.localStorage.getItem(this.key) || '{}');
    }

    save(data) {
        window.localStorage.setItem(this.key, JSON.stringify(data));
    }
}
