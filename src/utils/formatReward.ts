export const formatReward = (reward: string): string => {
    try {
        return parseInt(reward.replace(/,/g, ''), 10).toLocaleString('th-TH');
    } catch {
        return reward;
    }
};