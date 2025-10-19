"use client"
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import type { Response, LottoData } from '@/types/lotto';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import HighlightPrize from '@/components/lotto/HighlightPrize';
import PrizeGrid from '@/components/lotto/PrizeGrid';
import PrizeChecker from '@/components/lotto/PrizeChecker';

export default function Home() {
    const [lottoResponse, setLottoResponse] = useState<Response | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLotto = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/lotto');
                if (!res.ok) {
                    throw new Error('ไม่สามารถดึงข้อมูลหวยได้');
                }
                const data: LottoData = await res.json();

                if (data.status === 'success' && data.response) {
                    setLottoResponse(data.response);
                } else {
                    // @ts-ignore
                    throw new Error(data.error || 'API ส่งข้อมูลมาไม่สำเร็จ');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่รู้จัก');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLotto();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex min-h-[60vh] items-center justify-center">
                    <Loader />
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex min-h-[60vh] items-center justify-center 
                        text-lg font-semibold text-red-500">
                    {error} ❌
                </div>
            );
        }

        if (!lottoResponse) {
            return (
                <div className="flex min-h-[60vh] items-center justify-center text-lg font-semibold text-yellow-500">
                    ไม่พบข้อมูล 🤷
                </div>
            );
        }

        const { date, prizes, runningNumbers } = lottoResponse;

        const prizeFirst = prizes.find((p) => p.id === 'prizeFirst');
        const prizeFirstNear = prizes.find((p) => p.id === 'prizeFirstNear');
        const runningBackTwo = runningNumbers.find((p) => p.id === 'runningNumberBackTwo');
        const runningFrontThree = runningNumbers.find((p) => p.id === 'runningNumberFrontThree');
        const runningBackThree = runningNumbers.find((p) => p.id === 'runningNumberBackThree');
        const otherPrizes = prizes.filter((p) =>
            !['prizeFirst', 'prizeFirstNear'].includes(p.id)
        );

        return (
            <>
                <header className="my-6 text-center sm:my-8">
                    <h1 className="text-3xl font-bold text-white sm:text-4xl">
                        ผลสลากกินแบ่งรัฐบาล
                    </h1>
                    <h2 className="mt-2 text-xl text-gray-300 sm:text-2xl">
                        งวดวันที่ {date}
                    </h2>
                </header>

                <PrizeChecker
                    lottoResponse={lottoResponse}
                    isLoading={isLoading}
                />

                <main className="flex flex-col gap-6">
                    {prizeFirst && <HighlightPrize prize={prizeFirst} isMainPrize={true} />}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {runningFrontThree && <HighlightPrize prize={runningFrontThree} />}
                        {runningBackThree && <HighlightPrize prize={runningBackThree} />}
                    </div>

                    {runningBackTwo && <HighlightPrize prize={runningBackTwo} />}

                    {prizeFirstNear && <PrizeGrid prize={prizeFirstNear} />}

                    {otherPrizes.map((prize) => (
                        <PrizeGrid key={prize.id} prize={prize} />
                    ))}
                </main>
            </>
        );
    };

    return (
        <>
            <Head>
                <title>ตรวจผลสลากกินแบ่งรัฐบาล</title>
                <meta name="description" content="ตรวจผลสลากกินแบ่งรัฐบาล งวดล่าสุด" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <div className="mx-auto max-w-4xl px-4">
                {renderContent()}
            </div>
            <Footer />
        </>
    );
}