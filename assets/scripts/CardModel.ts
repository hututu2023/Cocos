import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

// 纸牌状态：覆盖态（背面）/解锁态（正面）
export enum CardState {
    COVER = "cover",   // 覆盖态，不可点击
    UNLOCK = "unlock"  // 解锁态，可点击
}

// 纸牌类型：只保留数字牌
export enum CardType {
    NUMBER = "number" // 数字牌（1-8）
}

// 纸牌数据模型（单张牌的核心数据）
@ccclass('CardModel')
export class CardModel {
    // 基础属性
    id: number = 0;          // 唯一ID
    type: CardType = CardType.NUMBER; // 仅数字牌
    value: number = 1;       // 数字值
    state: CardState = CardState.COVER; // 初始覆盖态
    cardPile: string = "";   // 所属牌堆（main/bottom/reserve）

    // 构造函数：初始化单张牌
    constructor(id: number, type: CardType, value: number, state: CardState, cardPile: string) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.state = state;
        this.cardPile = cardPile;
    }
}