System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, _dec, _class, _crd, ccclass, property, CardState, CardType, CardModel;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "365d11G9P9D6b2LXuFNPZm4", "CardModel", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator); // 纸牌状态：覆盖态（背面）/解锁态（正面）

      _export("CardState", CardState = /*#__PURE__*/function (CardState) {
        CardState["COVER"] = "cover";
        CardState["UNLOCK"] = "unlock";
        return CardState;
      }({})); // 纸牌类型：只保留数字牌


      _export("CardType", CardType = /*#__PURE__*/function (CardType) {
        CardType["NUMBER"] = "number";
        return CardType;
      }({})); // 纸牌数据模型（单张牌的核心数据）


      _export("CardModel", CardModel = (_dec = ccclass('CardModel'), _dec(_class = class CardModel {
        // 所属牌堆（main/bottom/reserve）
        // 构造函数：初始化单张牌
        constructor(id, type, value, state, cardPile) {
          // 基础属性
          this.id = 0;
          // 唯一ID
          this.type = CardType.NUMBER;
          // 仅数字牌
          this.value = 1;
          // 数字值
          this.state = CardState.COVER;
          // 初始覆盖态
          this.cardPile = "";
          this.id = id;
          this.type = type;
          this.value = value;
          this.state = state;
          this.cardPile = cardPile;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c64035c67517580d29456598ddd26c3097dd7d5d.js.map