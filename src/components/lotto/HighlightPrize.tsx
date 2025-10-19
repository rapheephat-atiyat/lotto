import React from 'react';
import type { Prizes, RunningNumbers } from '@/types/lotto';
import { formatReward } from '@/utils/formatReward';

interface HighlightPrizeProps {
    prize: Prizes | RunningNumbers;
    isMainPrize?: boolean;
}

const HighlightPrize: React.FC<HighlightPrizeProps> = ({
    prize,
    isMainPrize = false,
}) => {
    const getCardClasses = () => {
        const baseClasses = 'rounded-2xl border bg-white/5 p-6 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl';

        if (isMainPrize) {
            return `${baseClasses} border-blue-500/50 bg-blue-500/10 shadow-blue-500/20`;
        }
        return `${baseClasses} border-white/10`;
    };

    const getNumberClasses = () => {
        const baseClasses = 'my-4 text-5xl font-bold tracking-wider sm:text-6xl';

        if (isMainPrize) {
            return `${baseClasses} text-blue-400`;
        }
        return `${baseClasses} text-white`;
    };

    return (
        <div className={getCardClasses()}>
            <h2 className="text-lg font-semibold text-white sm:text-xl">{prize.name}</h2>
            <div className={getNumberClasses()}>{prize.number.join('   ')}</div>
            <p className="text-base text-gray-300">
                รางวัลละ {formatReward(prize.reward)} บาท
            </p>
        </div>
    );
};

export default HighlightPrize;