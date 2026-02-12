System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Sprite, Button, EventHandler, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, CardView;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Sprite = _cc.Sprite;
      Button = _cc.Button;
      EventHandler = _cc.EventHandler;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "dcc2bA3IxBOm5MiARSZejSO", "CardView", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Sprite', 'Button', 'EventHandler']);

      ({
        ccclass,
        property
      } = _decorator); // 卡牌数据类型定义

      _export("CardView", CardView = (_dec = ccclass('CardView'), _dec2 = property(Sprite), _dec(_class = (_class2 = class CardView extends Component {
        constructor() {
          super(...arguments);

          // 卡牌正面精灵（如果需要显示卡牌图片可使用）
          _initializerDefineProperty(this, "cardFrontSprite", _descriptor, this);

          // 卡牌数据
          this.cardData = null;
          // 点击回调函数
          this.onClickCallback = null;
        }

        /**
         * 初始化卡牌
         * @param data 卡牌数据
         * @param onClick 点击回调
         */
        init(data, onClick) {
          // 赋值数据和回调
          this.cardData = data;
          this.onClickCallback = onClick;
          this.cardData.isUsed = false; // 激活节点

          this.node.active = true; // 核心：绑定Button组件的点击事件

          this.bindButtonClick();
          console.log("🔧 卡牌", data.id, "初始化完成，已绑定点击事件");
        }
        /**
         * 绑定Button组件点击事件（方案一核心）
         */


        bindButtonClick() {
          // 获取节点上的Button组件
          var button = this.node.getComponent(Button);

          if (!button) {
            console.error("\u274C \u5361\u724C\u8282\u70B9 " + this.node.name + " \u672A\u627E\u5230Button\u7EC4\u4EF6\uFF01");
            return;
          } // 清空原有点击事件，避免重复绑定


          button.clickEvents.length = 0; // 创建新的点击事件处理器

          var eventHandler = new EventHandler();
          eventHandler.target = this.node; // 事件目标节点（当前卡牌）

          eventHandler.component = 'CardView'; // 目标组件名

          eventHandler.handler = 'onButtonClick'; // 回调函数名
          // 添加到Button的点击事件列表

          button.clickEvents.push(eventHandler);
        }
        /**
         * Button组件点击回调（实际触发逻辑）
         */


        onButtonClick() {
          var _this$cardData;

          console.log("🔥 卡牌", (_this$cardData = this.cardData) == null ? void 0 : _this$cardData.id, "被点击！"); // 防呆检查

          if (!this.cardData) {
            console.log("❌ 卡牌数据未初始化");
            return;
          }

          if (this.cardData.isUsed) {
            console.log("⚠️ 卡牌", this.cardData.id, "已使用，跳过点击");
            return;
          }

          if (!this.onClickCallback) {
            console.log("❌ 卡牌", this.cardData.id, "点击回调未绑定");
            return;
          } // 触发回调（调用GameManager的匹配/回退逻辑）


          this.onClickCallback(this.cardData);
        }
        /**
         * 标记卡牌为已使用（变灰）
         */


        markAsUsed() {
          this.cardData.isUsed = true;
          this.node.opacity = 100; // 透明度降低，视觉上变灰

          console.log("🎨 卡牌", this.cardData.id, "标记为已使用");
        }
        /**
         * 重置卡牌为正常状态
         */


        resetCard() {
          this.cardData.isUsed = false;
          this.node.opacity = 255; // 恢复透明度

          this.node.scale = 1.0; // 恢复缩放

          console.log("🔄 卡牌", this.cardData.id, "重置为正常状态");
        }
        /**
         * 卡牌高亮/取消高亮（选中效果）
         * @param isHighlight 是否高亮
         */


        highlight(isHighlight) {
          if (this.cardData.isUsed) return; // 已使用的卡牌不高亮

          this.node.scale = isHighlight ? 1.1 : 1.0; // 缩放变化实现高亮

          console.log("✨ 卡牌", this.cardData.id, isHighlight ? "高亮" : "取消高亮");
        }
        /**
         * 组件销毁时清理事件（防止内存泄漏）
         */


        onDestroy() {
          var button = this.node.getComponent(Button);

          if (button) {
            button.clickEvents.length = 0;
          }

          this.onClickCallback = null;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cardFrontSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=67dedd802c3a8c4d665ca201a3b8a7a1a4ae9d53.js.map