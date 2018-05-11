
cc.Class({
    extends: cc.Component,

    properties: {
        bgNode: cc.Node,
        okNode: cc.Node,
        contentLabel: cc.Label,
        cancelNode: cc.Node,

        _onOkEvent: null,
        _content: {
            set: function (value) {
                if (this.contentLabel) this.contentLabel.string = value;
            }
        }
    },

    showAlert(option) {
        let content = option['content'] || '';
        let onOkEvent = option['onOk'];
        let needCancel = option['needCancel'] || false;
        //获取运行场景的可见大小。
        let visiSize = cc.director.getVisibleSize();
        let scene = cc.director.getScene();
        this.node.parent = scene;
        // 弹进动画
        this.enterEffect(this.node);
        this._content = content;
        this.node.setPosition(visiSize.width / 2, visiSize.height / 2);

        this.bgNode.width = visiSize.width;
        this.bgNode.height = visiSize.height;

        if (!needCancel) {
            this.cancelNode.active = false;
            this.okNode.setPositionX(0);
        }
        this.onOkEvent = onOkEvent;
    },

    onBtnClicked(event) {
        // 确定按钮调用回调函数，取消按钮直接关闭对话框
        if (event.target.name == "ok") {
            if (this.onOkEvent) {
                this.onOkEvent();
            }
        }
        // 弹出动画接回调，干掉弹出层
        this.exitEffect(this.node, () => {
            this.node.removeFromParent();
        });
    },

    enterEffect(node) {
        node.active = true;
        let scale = node.getScale();
        node.scale = 0;
        node.runAction(cc.sequence(cc.scaleTo(0.2, scale + 0.3), cc.scaleTo(0.15, scale)));
    },

    exitEffect(node, callback) {
        node.active = true;
        let scale = node.getScale();
        node.runAction(cc.spawn(cc.fadeOut(0.3), cc.sequence(cc.scaleTo(0.3, scale * 1.5), cc.callFunc((event) => {
            if (callback) callback();
        }))));
    }

    // update (dt) {},
});
