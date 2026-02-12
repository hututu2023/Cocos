import { _decorator, Component, Node, error, sys, Button, Label, Vec3 } from 'cc';
import { CardView, CardData } from './CardView';
const { ccclass, property } = _decorator;

declare const CC_EDITOR: boolean;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    mainCardRoot: Node = null!;
    @property(Node)
    bottomCardRoot: Node = null!;

    @property(Vec3)
    rightSinglePos = new Vec3(200, 0, 0);
    @property(Vec3)
    leftPilePos1 = new Vec3(-200, 0, 0);
    @property(Vec3)
    leftPilePos2 = new Vec3(-100, 0, 0);

    // 核心状态
    private selectedCard: CardData | null = null;
    private mainCards: CardView[] = [];
    private bottomCards: Node[] = [];
    private bottomPileQueue: number[] = [];
    private rightSingleIdx: number = 2;

    // 用于移除事件监听的函数引用
    private currentBottomRightListener: (...args: any[]) => void = null!;

    start() {
        console.log("🎮 游戏初始化...");
        this.initGame();
    }

    private initGame() {
        if (!this.mainCardRoot) { error("❌ 未绑定mainCardRoot！"); return; }
        if (!this.bottomCardRoot) { error("❌ 未绑定bottomCardRoot！"); return; }

        this.initMainCards();
        this.initBottomCards(); // 🔥 新增：初始化底牌数据

        this.bottomCards = this.bottomCardRoot.children.slice(0, 3);
        if (this.bottomCards.length < 3) {
            error("❌ BottomCardRoot下不足3个底牌节点！");
            return;
        }

        // 队列初始化：右侧为6（索引2），左侧为3、K（索引0,1）
        this.rightSingleIdx = 2;
        this.bottomPileQueue = [this.rightSingleIdx, 0, 1];

        this.currentBottomRightListener = this.onBottomSingleClick.bind(this);
        this.updateBottomVisual();
        console.log("✅ 初始化完成 | 右侧底牌：", this.getCardValueByIndex(this.rightSingleIdx));
    }

    // 🔥 新增：初始化底牌节点的 CardView 数据
    private initBottomCards() {
        const bottomDataList: CardData[] = [
            { id: 201, value: 3, suit: 'heart', isUsed: false },
            { id: 202, value: 13, suit: 'diamond', isUsed: false }, // K = 13
            { id: 203, value: 6, suit: 'spade', isUsed: false }
        ];

        this.bottomCardRoot.children.slice(0, 3).forEach((node, index) => {
            const cardView = node.getComponent(CardView);
            if (cardView) {
                cardView.init(bottomDataList[index], null); // 底牌不需要点击回调
            }
        });
    }

    private initMainCards() {
        const mainCardDataList: CardData[] = [
            { id: 101, value: 2, suit: 'spade', isUsed: false },
            { id: 102, value: 3, suit: 'heart', isUsed: false },
            { id: 103, value: 4, suit: 'club', isUsed: false },
            { id: 104, value: 5, suit: 'diamond', isUsed: false },
            { id: 105, value: 6, suit: 'spade', isUsed: false },
            { id: 106, value: 7, suit: 'heart', isUsed: false }
        ];

        this.mainCardRoot.children.forEach((node, index) => {
            node.active = true;
            const cardView = node.getComponent(CardView);
            if (!cardView) { error(`❌ 主牌${node.name}无CardView！`); return; }
            if (index >= mainCardDataList.length) { error(`❌ 主牌${node.name}无数据！`); return; }
            
            cardView.init(mainCardDataList[index], this.onMainCardClick.bind(this));
            this.mainCards.push(cardView);
        });
    }

    // ---------- 主牌点击逻辑（新增底牌匹配）----------
    private onMainCardClick(card: CardData) {
        console.log(`🖱️ 点击主牌：${card.value}`);
        if (card.isUsed) { console.log(`⚠️ 主牌${card.value}已使用！`); return; }

        // ========== 新增：与右侧底牌匹配 ==========
        const rightBottomNode = this.bottomCards[this.rightSingleIdx];
        const rightCardView = rightBottomNode.getComponent(CardView);
        if (rightCardView && !rightCardView.cardData.isUsed) {
            const bottomValue = rightCardView.cardData.value;
            if (Math.abs(card.value - bottomValue) <= 1) { // 相差 ≤1 即匹配
                console.log(`🎉 主牌与底牌匹配成功：${card.value} ↔ ${bottomValue}`);
                this.matchMainWithBottom(card, rightBottomNode, rightCardView);
                return; // 匹配完成后不再执行主牌间匹配
            }
        }
        // ========================================

        // 原有主牌间匹配逻辑（保持不变）
        if (!this.selectedCard) {
            this.selectedCard = card;
            this.getCardViewById(card.id)?.highlight(true);
            console.log(`✅ 选中主牌：${card.value}`);
            return;
        }

        if (this.selectedCard.id === card.id) {
            this.getCardViewById(card.id)?.highlight(false);
            this.selectedCard = null;
            console.log(`❌ 取消选中主牌：${card.value}`);
            return;
        }

        if (Math.abs(this.selectedCard.value - card.value) === 1) {
            this.getCardViewById(this.selectedCard.id)?.markAsUsed();
            this.getCardViewById(card.id)?.markAsUsed();
            console.log(`🎉 主牌间匹配成功：${this.selectedCard.value} + ${card.value}`);
        } else {
            console.log(`❌ 匹配失败：差值=${Math.abs(this.selectedCard.value - card.value)}`);
            this.getCardViewById(this.selectedCard.id)?.highlight(false);
        }
        this.selectedCard = null;
    }

    // 🔥 新增：主牌与底牌匹配成功后的处理
    private matchMainWithBottom(mainCardData: CardData, oldBottomNode: Node, oldBottomView: CardView) {
        // 1. 隐藏原底牌
        oldBottomNode.active = false;

        // 2. 获取主牌节点并移动到底牌区
        const mainNode = this.getCardViewById(mainCardData.id)?.node;
        if (!mainNode) { error("❌ 主牌节点不存在！"); return; }

        mainNode.setParent(this.bottomCardRoot);
        mainNode.setPosition(this.rightSinglePos);

        // 3. 替换底牌数组中的引用
        this.bottomCards[this.rightSingleIdx] = mainNode;

        // 4. 从主牌列表中移除该CardView（因为它已经变成了底牌）
        const mainCardView = this.mainCards.find(cv => cv.cardData.id === mainCardData.id);
        if (mainCardView) {
            const index = this.mainCards.indexOf(mainCardView);
            if (index > -1) this.mainCards.splice(index, 1);
        }

        // 5. 更新主牌节点的CardView数据（可选，但为了统一处理，可保持原有数据不变）
        //    注意：移动后的节点仍保有原来的CardView组件，其cardData.value仍是原主牌值，无需修改。

        // 6. 刷新底牌显示：这会重新激活右侧节点并绑定点击事件
        this.updateBottomVisual();

        // 7. 重置主牌选中状态（防止残留高亮）
        if (this.selectedCard && this.selectedCard.id === mainCardData.id) {
            this.selectedCard = null;
        }
    }

    // ---------- 底牌点击逻辑（队列切换）----------
    private onBottomSingleClick() {
        const rightCard = this.bottomCards[this.rightSingleIdx];
        const rightBtn = rightCard.getComponent(Button);
        if (rightBtn) rightBtn.interactable = false; // 立即防连点

        console.log(`🖱️ 点击右侧底牌：`, this.getCardValueByIndex(this.rightSingleIdx));

        // 队列移位
        this.bottomPileQueue.shift();
        this.bottomPileQueue.push(this.rightSingleIdx);
        this.rightSingleIdx = this.bottomPileQueue[0];

        this.scheduleOnce(() => {
            this.updateBottomVisual();
        }, 0);
    }

    private updateBottomVisual() {
        // 1. 隐藏所有底牌，移除旧监听
        this.bottomCards.forEach(card => {
            card.active = false;
            const btn = card.getComponent(Button);
            if (btn) {
                btn.clickEvents = [];
                btn.node.off(Button.EventType.CLICK, this.currentBottomRightListener, this);
                btn.interactable = false;
            }
        });

        // 2. 显示左侧两堆（固定不可点击）
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
        }

        // 3. 显示右侧单牌，绑定点击事件
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
    }

    // ---------- 工具方法 ----------
    private getCardViewById(cardId: number): CardView | null {
        const mainCard = this.mainCards.find(c => c.cardData.id === cardId);
        if (mainCard) return mainCard;

        for (let i = 0; i < this.bottomCards.length; i++) {
            const cardView = this.bottomCards[i].getComponent(CardView);
            if (cardView && cardView.cardData.id === cardId) return cardView;
        }
        error(`❌ 未找到卡牌ID：${cardId}`);
        return null;
    }

    private getCardValueByIndex(index: number): string {
        const cardView = this.bottomCards[index]?.getComponent(CardView);
        return cardView ? cardView.cardData.value.toString() : '?';
    }
}