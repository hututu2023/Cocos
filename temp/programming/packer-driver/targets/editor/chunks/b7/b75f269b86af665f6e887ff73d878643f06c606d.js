System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CardState, CardType, _dec, _class, _crd, ccclass, property, GameDataModel;

  function _reportPossibleCrUseOfCardState(extras) {
    _reporterNs.report("CardState", "./CardModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardType(extras) {
    _reporterNs.report("CardType", "./CardModel", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      CardState = _unresolved_2.CardState;
      CardType = _unresolved_2.CardType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6feb5SW7A5I5JUbsiXXJy5m", "GameDataModel", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator); // 简化的CardData类型（兼容视图层）
      // 匹配结果类型

      // 游戏数据模型（全局牌堆+规则管理）
      _export("GameDataModel", GameDataModel = (_dec = ccclass('GameDataModel'), _dec(_class = class GameDataModel {
        constructor() {
          // 三大牌堆
          this.mainCards = [];
          // 主牌堆（可消除的核心牌）
          this.bottomCards = [];
          // 底牌堆（匹配基准，仅1张）
          this.reserveCards = [];
          // 备用牌堆（匹配失败时抽牌）
          // 游戏状态
          this.isWin = false;
          this.isGameOver = false;
        }

        // 初始化游戏：生成所有牌堆
        initGame() {
          // 清空旧数据
          this.mainCards = [];
          this.bottomCards = [];
          this.reserveCards = []; // 1. 生成底牌（1张数字牌，解锁态）

          const bottomCard = this.createCard(0, (_crd && CardType === void 0 ? (_reportPossibleCrUseOfCardType({
            error: Error()
          }), CardType) : CardType).NUMBER, 5, (_crd && CardState === void 0 ? (_reportPossibleCrUseOfCardState({
            error: Error()
          }), CardState) : CardState).UNLOCK, "bottom");
          this.bottomCards.push(bottomCard); // 2. 生成主牌堆（7张数字牌，解锁态，都是5的±1相关）

          const mainValues = [4, 6, 3, 7, 8, 2, 1];
          mainValues.forEach((val, index) => {
            const card = this.createCard(index + 1, (_crd && CardType === void 0 ? (_reportPossibleCrUseOfCardType({
              error: Error()
            }), CardType) : CardType).NUMBER, val, (_crd && CardState === void 0 ? (_reportPossibleCrUseOfCardState({
              error: Error()
            }), CardState) : CardState).UNLOCK, "main");
            this.mainCards.push(card);
          }); // 3. 生成备用牌堆（5张数字牌，覆盖态）

          const reserveValues = [9, 10, 11, 12, 13];
          reserveValues.forEach((val, index) => {
            const card = this.createCard(index + 8, (_crd && CardType === void 0 ? (_reportPossibleCrUseOfCardType({
              error: Error()
            }), CardType) : CardType).NUMBER, val, (_crd && CardState === void 0 ? (_reportPossibleCrUseOfCardState({
              error: Error()
            }), CardState) : CardState).COVER, "reserve");
            this.reserveCards.push(card);
          });
          console.log("游戏初始化完成：主牌" + this.mainCards.length + "张，底牌1张，备用牌" + this.reserveCards.length + "张");
        } // 生成单张牌（封装逻辑）


        createCard(id, type, value, state, pile) {
          return {
            id: id,
            type: type,
            value: value,
            state: state,
            cardPile: pile
          };
        } // 核心匹配规则：数字牌需与底牌±1


        checkMatch(selectedCard) {
          if (this.isGameOver) return {
            isMatch: false,
            message: "游戏已结束"
          };
          const bottomCard = this.bottomCards[0]; // 仅数字牌匹配规则：±1

          if (selectedCard.type === (_crd && CardType === void 0 ? (_reportPossibleCrUseOfCardType({
            error: Error()
          }), CardType) : CardType).NUMBER && bottomCard.type === (_crd && CardType === void 0 ? (_reportPossibleCrUseOfCardType({
            error: Error()
          }), CardType) : CardType).NUMBER) {
            const diff = Math.abs(selectedCard.value - bottomCard.value);

            if (diff === 1) {
              this.updateBottomCard(selectedCard);
              this.removeMainCard(selectedCard);
              this.checkWinCondition();
              return {
                isMatch: true,
                message: "数字匹配成功！"
              };
            }
          }

          return {
            isMatch: false,
            message: "不匹配，抽备用牌！"
          };
        } // 更新底牌（匹配成功后）


        updateBottomCard(newCard) {
          this.bottomCards[0] = {
            id: newCard.id,
            type: newCard.type,
            value: newCard.value,
            state: (_crd && CardState === void 0 ? (_reportPossibleCrUseOfCardState({
              error: Error()
            }), CardState) : CardState).UNLOCK,
            cardPile: "bottom"
          };
        } // 移除主牌堆中的牌（匹配成功后）


        removeMainCard(card) {
          this.mainCards = this.mainCards.filter(c => c.id !== card.id);
        } // 检查游戏胜利条件（主牌堆为空）


        checkWinCondition() {
          if (this.mainCards.length === 0) {
            this.isWin = true;
            this.isGameOver = true;
          } else if (this.reserveCards.every(c => c.state === (_crd && CardState === void 0 ? (_reportPossibleCrUseOfCardState({
            error: Error()
          }), CardState) : CardState).UNLOCK)) {
            // 备用牌全解锁仍未消除主牌 → 游戏失败
            this.isWin = false;
            this.isGameOver = true;
          }
        } // 对外暴露游戏结束检查


        checkGameOver() {
          return this.isGameOver;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b75f269b86af665f6e887ff73d878643f06c606d.js.map