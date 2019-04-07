
export default class Ticket {

    name = '';
    value = 0;

    /**
     * @param {string} name
     * @param {number} value
     */
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.name + ' @ ' + this.value;
    }
}
