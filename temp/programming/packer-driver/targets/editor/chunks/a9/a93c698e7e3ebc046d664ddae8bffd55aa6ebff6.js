System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, error, Button, Vec3, CardView, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCardView(extras) {
    _reporterNs.report("CardView", "./CardView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardData(extras) {
    _reporterNs.report("CardData", "./CardView", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      error = _cc.error;
      Button = _cc.Button;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      CardView = _unresolved_2.CardView;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "90b23Nd73VF1K0ZmqcYuNGI", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'error', 'sys', 'Button', 'Label', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Vec3), _dec5 = property(Vec3), _dec6 = property(Vec3), _dec(_class = (_class2 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "mainCardRoot", _descriptor, this);

          _initializerDefineProperty(this, "bottomCardRoot", _descriptor2, this);

          _initializerDefineProperty(this, "rightSinglePos", _descriptor3, this);

          _initializerDefineProperty(this, "leftPilePos1", _descriptor4, this);

          _initializerDefineProperty(this, "leftPilePos2", _descriptor5, this);

          // 核心状态
          this.selectedCard = null;
          this.mainCards = [];
          this.bottomCards = [];
          this.bottomPileQueue = [];
          this.rightSingleIdx = 2;
          // 用于移除事件监听的函数引用
          this.currentBottomRightListener = null;
        }

        start() {
          console.log("🎮 游戏初始化...");
          this.initGame();
        }

        initGame() {
          if (!this.mainCardRoot) {
            error("❌ 未绑定mainCardRoot！");
            return;
          }

          if (!this.bottomCardRoot) {
            error("❌ 未绑定bottomCardRoot！");
            return;
          }

          this.initMainCards();
          this.initBottomCards(); // 🔥 新增：初始化底牌数据

          this.bottomCards = this.bottomCardRoot.children.slice(0, 3);

          if (this.bottomCards.length < 3) {
            error("❌ BottomCardRoot下不足3个底牌节点！");
            return;
          } // 队列初始化：右侧为6（索引2），左侧为3、K（索引0,1）


          this.rightSingleIdx = 2;
          this.bottomPileQueue = [this.rightSingleIdx, 0, 1];
          this.currentBottomRightListener = this.onBottomSingleClick.bind(this);
          this.updateBottomVisual();
          console.log("✅ 初始化完成 | 右侧底牌：", this.getCardValueByIndex(this.rightSingleIdx));
        } // 🔥 新增：初始化底牌节点的 CardView 数据


        initBottomCards() {
          const bottomDataList = [{
            id: 201,
            value: 3,
            suit: 'heart',
            isUsed: false
          }, {
            id: 202,
            value: 13,
            suit: 'diamond',
            isUsed: false
          }, // K = 13
          {
            id: 203,
            value: 6,
            suit: 'spade',
            isUsed: false
          }];
          this.bottomCardRoot.children.slice(0, 3).forEach((node, index) => {
            const cardView = node.getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
              error: Error()
            }), CardView) : CardView);

            if (cardView) {
              cardView.init(bottomDataList[index], null); // 底牌不需要点击回调
            }
          });
        }

        initMainCards() {
          const mainCardDataList = [{
            id: 101,
            value: 2,
            suit: 'spade',
            isUsed: false
          }, {
            id: 102,
            value: 3,
            suit: 'heart',
            isUsed: false
          }, {
            id: 103,
            value: 4,
            suit: 'club',
            isUsed: false
          }, {
            id: 104,
            value: 5,
            suit: 'diamond',
            isUsed: false
          }, {
            id: 105,
            value: 6,
            suit: 'spade',
            isUsed: false
          }, {
            id: 106,
            value: 7,
            suit: 'heart',
            isUsed: false
          }];
          this.mainCardRoot.children.forEach((node, index) => {
            node.active = true;
            const cardView = node.getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
              error: Error()
            }), CardView) : CardView);

            if (!cardView) {
              error(`❌ 主牌${node.name}无CardView！`);
              return;
            }

            if (index >= mainCardDataList.length) {
              error(`❌ 主牌${node.name}无数据！`);
              return;
            }

            cardView.init(mainCardDataList[index], this.onMainCardClick.bind(this));
            this.mainCards.push(cardView);
          });
        } // ---------- 主牌点击逻辑（新增底牌匹配）----------


        onMainCardClick(card) {
          console.log(`🖱️ 点击主牌：${card.value}`);

          if (card.isUsed) {
            console.log(`⚠️ 主牌${card.value}已使用！`);
            return;
          } // ========== 新增：与右侧底牌匹配 ==========


          const rightBottomNode = this.bottomCards[this.rightSingleIdx];
          const rightCardView = rightBottomNode.getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
            error: Error()
          }), CardView) : CardView);

          if (rightCardView && !rightCardView.cardData.isUsed) {
            const bottomValue = rightCardView.cardData.value;

            if (Math.abs(card.value - bottomValue) <= 1) {
              // 相差 ≤1 即匹配
              console.log(`🎉 主牌与底牌匹配成功：${card.value} ↔ ${bottomValue}`);
              this.matchMainWithBottom(card, rightBottomNode, rightCardView);
              return; // 匹配完成后不再执行主牌间匹配
            }
          } // ========================================
          // 原有主牌间匹配逻辑（保持不变）


          if (!this.selectedCard) {
            var _this$getCardViewById;

            this.selectedCard = card;
            (_this$getCardViewById = this.getCardViewById(card.id)) == null || _this$getCardViewById.highlight(true);
            console.log(`✅ 选中主牌：${card.value}`);
            return;
          }

          if (this.selectedCard.id === card.id) {
            var _this$getCardViewById2;

            (_this$getCardViewById2 = this.getCardViewById(card.id)) == null || _this$getCardViewById2.highlight(false);
            this.selectedCard = null;
            console.log(`❌ 取消选中主牌：${card.value}`);
            return;
          }

          if (Math.abs(this.selectedCard.value - card.value) === 1) {
            var _this$getCardViewById3, _this$getCardViewById4;

            (_this$getCardViewById3 = this.getCardViewById(this.selectedCard.id)) == null || _this$getCardViewById3.markAsUsed();
            (_this$getCardViewById4 = this.getCardViewById(card.id)) == null || _this$getCardViewById4.markAsUsed();
            console.log(`🎉 主牌间匹配成功：${this.selectedCard.value} + ${card.value}`);
          } else {
            var _this$getCardViewById5;

            console.log(`❌ 匹配失败：差值=${Math.abs(this.selectedCard.value - card.value)}`);
            (_this$getCardViewById5 = this.getCardViewById(this.selectedCard.id)) == null || _this$getCardViewById5.highlight(false);
          }

          this.selectedCard = null;
        } // 🔥 新增：主牌与底牌匹配成功后的处理


        matchMainWithBottom(mainCardData, oldBottomNode, oldBottomView) {
          var _this$getCardViewById6;

          // 1. 隐藏原底牌
          oldBottomNode.active = false; // 2. 获取主牌节点并移动到底牌区

          const mainNode = (_this$getCardViewById6 = this.getCardViewById(mainCardData.id)) == null ? void 0 : _this$getCardViewById6.node;

          if (!mainNode) {
            error("❌ 主牌节点不存在！");
            return;
          }

          mainNode.setParent(this.bottomCardRoot);
          mainNode.setPosition(this.rightSinglePos); // 3. 替换底牌数组中的引用

          this.bottomCards[this.rightSingleIdx] = mainNode; // 4. 从主牌列表中移除该CardView（因为它已经变成了底牌）

          const mainCardView = this.mainCards.find(cv => cv.cardData.id === mainCardData.id);

          if (mainCardView) {
            const index = this.mainCards.indexOf(mainCardView);
            if (index > -1) this.mainCards.splice(index, 1);
          } // 5. 更新主牌节点的CardView数据（可选，但为了统一处理，可保持原有数据不变）
          //    注意：移动后的节点仍保有原来的CardView组件，其cardData.value仍是原主牌值，无需修改。
          // 6. 刷新底牌显示：这会重新激活右侧节点并绑定点击事件


          this.updateBottomVisual(); // 7. 重置主牌选中状态（防止残留高亮）

          if (this.selectedCard && this.selectedCard.id === mainCardData.id) {
            this.selectedCard = null;
          }
        } // ---------- 底牌点击逻辑（队列切换）----------


        onBottomSingleClick() {
          const rightCard = this.bottomCards[this.rightSingleIdx];
          const rightBtn = rightCard.getComponent(Button);
          if (rightBtn) rightBtn.interactable = false; // 立即防连点

          console.log(`🖱️ 点击右侧底牌：`, this.getCardValueByIndex(this.rightSingleIdx)); // 队列移位

          this.bottomPileQueue.shift();
          this.bottomPileQueue.push(this.rightSingleIdx);
          this.rightSingleIdx = this.bottomPileQueue[0];
          this.scheduleOnce(() => {
            this.updateBottomVisual();
          }, 0);
        }

        updateBottomVisual() {
          // 1. 隐藏所有底牌，移除旧监听
          this.bottomCards.forEach(card => {
            card.active = false;
            const btn = card.getComponent(Button);

            if (btn) {
              btn.clickEvents = [];
              btn.node.off(Button.EventType.CLICK, this.currentBottomRightListener, this);
              btn.interactable = false;
            }
          }); // 2. 显示左侧两堆（固定不可点击）

          const leftPileIds = this.bottomPileQueue.slice(1);

          if (leftPileIds.length >= 1) {
            const card1 = this.bottomCards[leftPileIds[0]];
            card1.active = true;
            card1.setPosition(this.leftPilePos1);
            const btn1 = card1.getComponent(Button);

            if (btn1) {
              btn1.interactable = false;
              btn1.clickEvents = [];
            }
          }

          if (leftPileIds.length >= 2) {
            const card2 = this.bottomCards[leftPileIds[1]];
            card2.active = true;
            card2.setPosition(this.leftPilePos2);
            const btn2 = card2.getComponent(Button);

            if (btn2) {
              btn2.interactable = false;
              btn2.clickEvents = [];
            }
          } // 3. 显示右侧单牌，绑定点击事件


          const rightCard = this.bottomCards[this.rightSingleIdx];
          rightCard.active = true;
          rightCard.setPosition(this.rightSinglePos);
          const rightBtn = rightCard.getComponent(Button);

          if (rightBtn) {
            rightBtn.node.off(Button.EventType.CLICK, this.currentBottomRightListener, this);
            rightBtn.node.on(Button.EventType.CLICK, this.currentBottomRightListener, this);
            rightBtn.interactable = true;
            rightBtn.clickEvents = [];
          }
        } // ---------- 工具方法 ----------


        getCardViewById(cardId) {
          const mainCard = this.mainCards.find(c => c.cardData.id === cardId);
          if (mainCard) return mainCard;

          for (let i = 0; i < this.bottomCards.length; i++) {
            const cardView = this.bottomCards[i].getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
              error: Error()
            }), CardView) : CardView);
            if (cardView && cardView.cardData.id === cardId) return cardView;
          }

          error(`❌ 未找到卡牌ID：${cardId}`);
          return null;
        }

        getCardValueByIndex(index) {
          var _this$bottomCards$ind;

          const cardView = (_this$bottomCards$ind = this.bottomCards[index]) == null ? void 0 : _this$bottomCards$ind.getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
            error: Error()
          }), CardView) : CardView);
          return cardView ? cardView.cardData.value.toString() : '?';
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mainCardRoot", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bottomCardRoot", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rightSinglePos", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec3(200, 0, 0);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "leftPilePos1", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec3(-200, 0, 0);
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "leftPilePos2", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec3(-100, 0, 0);
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a93c698e7e3ebc046d664ddae8bffd55aa6ebff6.js.map