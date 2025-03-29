import React from 'react';
import { GraphicProps } from './graphic.model';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartConfig = {
  amount: {
    label: 'Total',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export const Graphic = ({ reportConcept }: GraphicProps) => {

  return (
    <div className='flex flex-col gap-8'>
      <ChartContainer
        config={chartConfig}
        className="min-h-[300px] bg-gray-50 rounded-2xl"
        style={{ boxShadow: '0px 4px 10px #00000029' }}
      >
        <BarChart accessibilityLayer data={reportConcept}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="concept"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 16)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
