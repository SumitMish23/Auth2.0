function Utility() {
    this.getIDOfTheInputElement = function (id) {
        return document.getElementById(id);
    };
    this.setAttributes = function () { };
}
const utility = new Utility();
export default utility;
