import { _decorator, Component, Node } from 'cc';
import { CardModel, CardState, CardType } from './CardModel';
const { ccclass, property } = _decorator;

// 简化的CardData类型（兼容视图层）
export type CardData = {
    id: number;
    type: CardType;
    value: number;
    state: CardState;
    cardPile: string;
}

// 匹配结果类型
export type MatchResult = {
    isMatch: boolean;
    message: string;
}

// 游戏数据模型（全局牌堆+规则管理）
@ccclass('GameDataModel')
export class GameDataModel {
    // 三大牌堆
    mainCards: CardData[] = [];    // 主牌堆（可消除的核心牌）
    bottomCards: CardData[] = [];  // 底牌堆（匹配基准，仅1张）
    reserveCards: CardData[] = []; // 备用牌堆（匹配失败时抽牌）

    // 游戏状态
    isWin: boolean = false;
    isGameOver: boolean = false;

    // 初始化游戏：生成所有牌堆
    initGame() {
        // 清空旧数据
        this.mainCards = [];
        this.bottomCards = [];
        this.reserveCards = [];

        // 1. 生成底牌（1张数字牌，解锁态）
        const bottomCard = this.createCard(0, CardType.NUMBER, 5, CardState.UNLOCK, "bottom");
        this.bottomCards.push(bottomCard);

        // 2. 生成主牌堆（7张数字牌，解锁态，都是5的±1相关）
        const mainValues = [4, 6, 3, 7, 8, 2, 1]; 
        mainValues.forEach((val, index) => {
            const card = this.createCard(index + 1, CardType.NUMBER, val, CardState.UNLOCK, "main");
            this.mainCards.push(card);
        });

        // 3. 生成备用牌堆（5张数字牌，覆盖态）
        const reserveValues = [9, 10, 11, 12, 13];
        reserveValues.forEach((val, index) => {
            const card = this.createCard(index + 8, CardType.NUMBER, val, CardState.COVER, "reserve");
            this.reserveCards.push(card);
        });

        console.log("游戏初始化完成：主牌" + this.mainCards.length + "张，底牌1张，备用牌" + this.reserveCards.length + "张");
    }

    // 生成单张牌（封装逻辑）
    private createCard(id: number, type: CardType, value: number, state: CardState, pile: string): CardData {
        return {
            id: id,
            type: type,
            value: value,
            state: state,
            cardPile: pile
        };
    }

    // 核心匹配规则：数字牌需与底牌±1
    checkMatch(selectedCard: CardData): MatchResult {
        if (this.isGameOver) return { isMatch: false, message: "游戏已结束" };
        
        const bottomCard = this.bottomCards[0];
        // 仅数字牌匹配规则：±1
        if (selectedCard.type === CardType.NUMBER && bottomCard.type === CardType.NUMBER) {
            const diff = Math.abs(selectedCard.value - bottomCard.value);
            if (diff === 1) {
                this.updateBottomCard(selectedCard);
                this.removeMainCard(selectedCard);
                this.checkWinCondition();
                return { isMatch: true, message: "数字匹配成功！" };
            }
        }

        return { isMatch: false, message: "不匹配，抽备用牌！" };
    }

    // 更新底牌（匹配成功后）
    private updateBottomCard(newCard: CardData) {
        this.bottomCards[0] = {
            id: newCard.id,
            type: newCard.type,
            value: newCard.value,
            state: CardState.UNLOCK,
            cardPile: "bottom"
        };
    }

    // 移除主牌堆中的牌（匹配成功后）
    private removeMainCard(card: CardData) {
        this.mainCards = this.mainCards.filter(c => c.id !== card.id);
    }

    // 检查游戏胜利条件（主牌堆为空）
    checkWinCondition() {
        if (this.mainCards.length === 0) {
            this.isWin = true;
            this.isGameOver = true;
        } else if (this.reserveCards.every(c => c.state === CardState.UNLOCK)) {
            // 备用牌全解锁仍未消除主牌 → 游戏失败
            this.isWin = false;
            this.isGameOver = true;
        }
    }

    // 对外暴露游戏结束检查
    checkGameOver(): boolean {
        return this.isGameOver;
    }
}