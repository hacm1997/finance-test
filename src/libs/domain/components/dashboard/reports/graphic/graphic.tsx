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

export const Graphic = ({ transactions }: GraphicProps) => {
  const mergedData = Object.values(
    (transactions ?? []).reduce<
      Record<string, { concept: string; amount: number }>
    >((acc, { concept, amount }) => {
      if (!acc[concept]) {
        acc[concept] = { concept, amount: 0 };
      }
      acc[concept].amount += amount;
      return acc;
    }, {})
  );

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-[40%]">
      <BarChart accessibilityLayer data={mergedData}>
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
  );
};
