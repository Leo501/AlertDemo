cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },

        alertPrefab: cc.Prefab,

        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
		console.log("test");

    },

    onBtnClicked() {
        let alert = cc.instantiate(this.alertPrefab).getComponent('Alert');
        alert.showAlert({
            content: 'hello',
            onOk: () => {
                console.log('ok');
            }
        })
    },

    // called every frame
    update: function (dt) {

    },
});
