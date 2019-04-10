
export default class Ticket {

    name = '';
    value = null;

    /**
     * @param {string} name
     * @param {number|null} value
     */
    constructor(name, value = null) {
        this.name = name;
        this.value = value;
    }

    /**
     * @param {{name: string, value: number}} data
     * @returns {Ticket}
     */
    static fromObject(data) {
        return new Ticket(data.name, data.value);
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.name + ' @ ' + this.value;
    }
}
