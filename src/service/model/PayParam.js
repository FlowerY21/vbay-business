export default class PayParam {
    constructor({merId, subMerId, termId, merName, payType, number, privateKey}) {
        this.merId = merId;
        this.subMerId = subMerId;
        this.termId = termId;
        this.merName = merName;
        this.payType = payType;
        this.odrAmt = number * 1000 / 10;
        this.privateKey = privateKey;
        this.odrTime = new Date().format("yyyyMMddHHmmss");
    }
}
