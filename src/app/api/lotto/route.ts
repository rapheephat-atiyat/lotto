import { NextResponse } from 'next/server';
import type { LottoData } from '@/types/lotto';

export async function GET() {
    try {
        const response = await fetch('https://lotto.api.rayriffy.com/latest', {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch external API: ${response.statusText}`);
        }

        const data: LottoData = await response.json();

        if (data.status !== 'success') {
            // @ts-ignore
            throw new Error(data.message || 'External API did not return success');
        }
        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
            },
        });

    } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred';

        return NextResponse.json(
            { status: 'fail', message: message, response: null },
            { status: 500 }
        );
    }
}