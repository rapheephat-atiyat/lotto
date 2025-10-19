// components/PrizeChecker.tsx
import React, { useState } from 'react';
import type { Response } from '@/types/lotto';
import { checkLotteryPrizes } from '@/utils/checkPrize';

interface PrizeCheckerProps {
    lottoResponse: Response | null;
    isLoading: boolean;
}

interface CheckResult {
    status: 'idle' | 'won' | 'lost';
    message: string;
}

const PrizeChecker: React.FC<PrizeCheckerProps> = ({ lottoResponse, isLoading }) => {
    const [checkNumber, setCheckNumber] = useState<string>('');
    const [checkResult, setCheckResult] = useState<CheckResult>({ status: 'idle', message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const digits = value.replace(/\D/g, '').slice(0, 6);
        setCheckNumber(digits);
        setCheckResult({ status: 'idle', message: '' });
    };

    const handleCheckPrize = () => {
        if (checkNumber.length !== 6) {
            setCheckResult({ status: 'lost', message: 'กรุณากรอกเลข 6 หลักให้ถูกต้อง' });
            return;
        }

        if (!lottoResponse) {
            setCheckResult({ status: 'lost', message: 'ไม่สามารถโหลดข้อมูลรางวัลได้' });
            return;
        }

        const result = checkLotteryPrizes(checkNumber, lottoResponse);
        setCheckResult(result);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && checkNumber.length === 6) {
            handleCheckPrize();
        }
    };

    const getResultClasses = () => {
        const baseClasses = 'mt-4 rounded-lg p-4 text-center text-base font-semibold sm:text-lg';

        if (checkResult.status === 'won') {
            return `${baseClasses} bg-green-500/20 text-green-300`;
        }
        if (checkResult.status === 'lost') {
            return `${baseClasses} bg-red-500/20 text-red-300`;
        }
        return baseClasses;
    };

    return (
        <div className="my-6 rounded-2xl border border-white/10 bg-white/5 p-5 
                    shadow-xl backdrop-blur-md sm:p-6">
            <h3 className="text-center text-xl font-semibold text-white">
                ตรวจผลรางวัล
            </h3>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={checkNumber}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="กรอกเลข 6 หลัก"
                    className="flex-grow rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-center text-2xl font-bold tracking-[.2em] text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-3xl"
                />
                <button
                    onClick={handleCheckPrize}
                    className={`rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-500 active:scale-95 ${(checkNumber.length !== 6 || isLoading) ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={checkNumber.length !== 6 || isLoading}
                >
                    ตรวจรางวัล
                </button>
            </div>

            {checkResult.status !== 'idle' && (
                <div className={getResultClasses()}>
                    <div dangerouslySetInnerHTML={{ __html: checkResult.message }} />
                </div>
            )}
        </div>
    );
};

export default PrizeChecker;