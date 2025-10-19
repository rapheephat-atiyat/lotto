import type { Response } from '@/types/lotto';

interface CheckResult {
    status: 'idle' | 'won' | 'lost';
    message: string;
}

const parseReward = (reward: string): number => {
    return parseInt(reward.replace(/,/g, ''), 10);
};

export const checkLotteryPrizes = (
    checkNumber: string,
    lottoResponse: Response
): CheckResult => {
    const { prizes, runningNumbers } = lottoResponse;
    let totalReward = 0;
    const messages: string[] = [];

    const prizeFirst = prizes.find((p) => p.id === 'prizeFirst');
    if (prizeFirst && prizeFirst.number[0] === checkNumber) {
        messages.push(`🎉 **ยินดีด้วย! คุณถูกรางวัลที่ 1**`);
        totalReward += parseReward(prizeFirst.reward);
    }

    const prizeFirstNear = prizes.find((p) => p.id === 'prizeFirstNear');
    if (prizeFirst && prizeFirstNear) {
        const firstNum = parseInt(prizeFirst.number[0]);
        const checkNumInt = parseInt(checkNumber);
        if (checkNumInt === firstNum - 1 || checkNumInt === firstNum + 1) {
            messages.push(`คุณถูกรางวัลข้างเคียงรางวัลที่ 1`);
            totalReward += parseReward(prizeFirstNear.reward);
        }
    }

    const otherPrizeIds = ['prizeSecond', 'prizeThird', 'prizeForth', 'prizeFifth'];
    const otherPrizes = prizes.filter((p) => otherPrizeIds.includes(p.id));

    for (const prize of otherPrizes) {
        if (prize.number.includes(checkNumber)) {
            messages.push(`คุณถูก${prize.name}`);
            totalReward += parseReward(prize.reward);
        }
    }

    const runningBackTwo = runningNumbers.find((p) => p.id === 'runningNumberBackTwo');
    if (runningBackTwo && runningBackTwo.number.some((num) => checkNumber.endsWith(num))) {
        messages.push(`คุณถูกเลขท้าย 2 ตัว`);
        totalReward += parseReward(runningBackTwo.reward);
    }

    const runningFrontThree = runningNumbers.find((p) => p.id === 'runningNumberFrontThree');
    if (runningFrontThree && runningFrontThree.number.some((num) => checkNumber.startsWith(num))) {
        messages.push(`คุณถูกเลขหน้า 3 ตัว`);
        totalReward += parseReward(runningFrontThree.reward);
    }

    const runningBackThree = runningNumbers.find((p) => p.id === 'runningNumberBackThree');
    if (runningBackThree && runningBackThree.number.some((num) => checkNumber.endsWith(num))) {
        messages.push(`คุณถูกเลขท้าย 3 ตัว`);
        totalReward += parseReward(runningBackThree.reward);
    }

    if (messages.length > 0) {
        const totalRewardStr = totalReward.toLocaleString('th-TH');
        messages.push(`<strong>รวมเป็นเงินรางวัล ${totalRewardStr} บาท</strong>`);
        return {
            status: 'won',
            message: messages.join('<br />'),
        };
    } else {
        return {
            status: 'lost',
            message: 'เสียใจด้วย... คุณไม่ถูกรางวัล 😭',
        };
    }
};