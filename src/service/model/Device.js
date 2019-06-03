export default class Device {
    constructor({id, type, isPos}) {
        this.id = id || "";
        this.type = type || "WEB";
        this.isPos = isPos || false;
    }
}
