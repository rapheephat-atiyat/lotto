import React from 'react';
import type { Prizes } from '@/types/lotto';
import { formatReward } from '@/utils/formatReward';

interface PrizeGridProps {
    prize: Prizes;
}

const PrizeGrid: React.FC<PrizeGridProps> = ({ prize }) => {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">
            <h3 className="text-lg font-semibold text-white sm:text-xl">
                {prize.name}
            </h3>
            <p className="mb-4 text-sm text-gray-400">
                รางวัลละ {formatReward(prize.reward)} บาท (จำนวน {prize.amount} รางวัล)
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
                {prize.number.map((num) => (
                    <span key={num} className="rounded-md border border-white/10 bg-black/20 p-2 text-center font-mono text-sm text-gray-200">
                        {num}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PrizeGrid;