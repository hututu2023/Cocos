import { _decorator, Component, Node, Sprite, Button, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

// 卡牌数据类型定义
export type CardData = {
    id: number;
    value: number;
    suit: string;
    isUsed: boolean;
}

@ccclass('CardView')
export class CardView extends Component {
    // 卡牌正面精灵（如果需要显示卡牌图片可使用）
    @property(Sprite)
    cardFrontSprite: Sprite = null!;

    // 卡牌数据
    public cardData: CardData = null!;
    // 点击回调函数
    private onClickCallback: ((card: CardData) => void) | null = null;

    /**
     * 初始化卡牌
     * @param data 卡牌数据
     * @param onClick 点击回调
     */
    init(data: CardData, onClick: (card: CardData) => void) {
        // 赋值数据和回调
        this.cardData = data;
        this.onClickCallback = onClick;
        this.cardData.isUsed = false;

        // 激活节点
        this.node.active = true;

        // 核心：绑定Button组件的点击事件
        this.bindButtonClick();

        console.log("🔧 卡牌", data.id, "初始化完成，已绑定点击事件");
    }

    /**
     * 绑定Button组件点击事件（方案一核心）
     */
    private bindButtonClick() {
        // 获取节点上的Button组件
        const button = this.node.getComponent(Button);
        if (!button) {
            console.error(`❌ 卡牌节点 ${this.node.name} 未找到Button组件！`);
            return;
        }

        // 清空原有点击事件，避免重复绑定
        button.clickEvents.length = 0;

        // 创建新的点击事件处理器
        const eventHandler = new EventHandler();
        eventHandler.target = this.node;       // 事件目标节点（当前卡牌）
        eventHandler.component = 'CardView';   // 目标组件名
        eventHandler.handler = 'onButtonClick';// 回调函数名

        // 添加到Button的点击事件列表
        button.clickEvents.push(eventHandler);
    }

    /**
     * Button组件点击回调（实际触发逻辑）
     */
    onButtonClick() {
        console.log("🔥 卡牌", this.cardData?.id, "被点击！");
        
        // 防呆检查
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
        }

        // 触发回调（调用GameManager的匹配/回退逻辑）
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
        this.node.scale = 1.0;   // 恢复缩放
        console.log("🔄 卡牌", this.cardData.id, "重置为正常状态");
    }

    /**
     * 卡牌高亮/取消高亮（选中效果）
     * @param isHighlight 是否高亮
     */
    highlight(isHighlight: boolean) {
        if (this.cardData.isUsed) return; // 已使用的卡牌不高亮
        this.node.scale = isHighlight ? 1.1 : 1.0; // 缩放变化实现高亮
        console.log("✨ 卡牌", this.cardData.id, isHighlight ? "高亮" : "取消高亮");
    }

    /**
     * 组件销毁时清理事件（防止内存泄漏）
     */
    onDestroy() {
        const button = this.node.getComponent(Button);
        if (button) {
            button.clickEvents.length = 0;
        }
        this.onClickCallback = null;
    }
}