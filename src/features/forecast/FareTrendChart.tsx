import type { ForecastPoint } from '../../data/types';
import { addMinutes, formatClock, formatMoney, formatMoneyRange } from '../../lib';

interface FareTrendChartProps {
  currentFare: number;
  forecast: ForecastPoint[];
  bookedAt: string;
}

export function FareTrendChart({ currentFare, forecast, bookedAt }: FareTrendChartProps) {
  const in15 = forecast.find((f) => f.horizonMinutes === 15) ?? {
    horizonMinutes: 15 as const,
    low: currentFare,
    high: currentFare,
    confidence: 'Medium' as const,
  };
  const in30 = forecast.find((f) => f.horizonMinutes === 30) ?? {
    horizonMinutes: 30 as const,
    low: currentFare,
    high: currentFare,
    confidence: 'Low' as const,
  };

  const time0 = formatClock(bookedAt);
  const time15 = formatClock(addMinutes(bookedAt, 15));
  const time30 = formatClock(addMinutes(bookedAt, 30));

  // Determine Y-scale domain
  const allValues = [currentFare, in15.low, in15.high, in30.low, in30.high];
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);

  const paddingY = 4;
  const yMin = Math.max(0, Math.floor(minVal - paddingY));
  const yMax = Math.ceil(maxVal + paddingY);
  const ySpan = Math.max(1, yMax - yMin);

  // SVG dimensions
  const svgWidth = 320;
  const svgHeight = 145;
  const topPad = 26;
  const bottomPad = 38;
  const plotHeight = svgHeight - topPad - bottomPad;

  const getY = (val: number) => {
    return topPad + (1 - (val - yMin) / ySpan) * plotHeight;
  };

  const x0 = 42;
  const x1 = 160;
  const x2 = 278;

  const y0 = getY(currentFare);
  const y1Low = getY(in15.low);
  const y1High = getY(in15.high);
  const y1Mid = (y1Low + y1High) / 2;
  const y2Low = getY(in30.low);
  const y2High = getY(in30.high);
  const y2Mid = (y2Low + y2High) / 2;

  // Confidence envelope polygon: Now -> 15 High -> 30 High -> 30 Low -> 15 Low -> Now
  const envelopePath = `M ${x0} ${y0} L ${x1} ${y1High} L ${x2} ${y2High} L ${x2} ${y2Low} L ${x1} ${y1Low} Z`;
  const trendLine = `M ${x0} ${y0} Q ${(x0 + x1) / 2} ${(y0 + y1Mid) / 2} ${x1} ${y1Mid} T ${x2} ${y2Mid}`;

  // Calculate drop savings
  const potentialSavings = Math.max(0, Math.round(currentFare - in30.low));

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-line bg-fill/30 p-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-ink">Fare trend forecast</span>
        {potentialSavings > 0 ? (
          <span className="font-mono text-peak">▾ Drop up to S${potentialSavings}</span>
        ) : (
          <span className="text-muted">Expected to stay steady</span>
        )}
      </div>

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full overflow-visible"
        role="img"
        aria-label={`Fare trend chart: current fare ${formatMoney(currentFare)}, in 15 min ${formatMoneyRange(
          in15.low,
          in15.high,
        )}, in 30 min ${formatMoneyRange(in30.low, in30.high)}`}
      >
        <defs>
          <linearGradient id="envelopeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1F5FBF" stopOpacity="0.10" />
            <stop offset="50%" stopColor="#1F5FBF" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#1F5FBF" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        {/* Horizontal gridlines */}
        <line
          x1={x0 - 10}
          y1={getY(maxVal)}
          x2={x2 + 10}
          y2={getY(maxVal)}
          stroke="#e2e2e2"
          strokeDasharray="2,2"
        />
        <line
          x1={x0 - 10}
          y1={getY(minVal)}
          x2={x2 + 10}
          y2={getY(minVal)}
          stroke="#e2e2e2"
          strokeDasharray="2,2"
        />

        {/* Shaded confidence envelope */}
        <path d={envelopePath} fill="url(#envelopeGrad)" />

        {/* Vertical range brackets */}
        {/* 15 min bracket */}
        <line
          x1={x1}
          y1={y1High}
          x2={x1}
          y2={y1Low}
          stroke="#1F5FBF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
        />
        <line
          x1={x1 - 4}
          y1={y1High}
          x2={x1 + 4}
          y2={y1High}
          stroke="#1F5FBF"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <line
          x1={x1 - 4}
          y1={y1Low}
          x2={x1 + 4}
          y2={y1Low}
          stroke="#1F5FBF"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* 30 min bracket */}
        <line
          x1={x2}
          y1={y2High}
          x2={x2}
          y2={y2Low}
          stroke="#1F5FBF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
        />
        <line
          x1={x2 - 4}
          y1={y2High}
          x2={x2 + 4}
          y2={y2High}
          stroke="#1F5FBF"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <line
          x1={x2 - 4}
          y1={y2Low}
          x2={x2 + 4}
          y2={y2Low}
          stroke="#1F5FBF"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Center trend line */}
        <path d={trendLine} fill="none" stroke="#1F5FBF" strokeWidth="2.5" strokeLinecap="round" />

        {/* Data points */}
        <circle cx={x0} cy={y0} r="5" fill="#1F5FBF" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx={x1} cy={y1Mid} r="3.5" fill="#1F5FBF" />
        <circle cx={x2} cy={y2Mid} r="3.5" fill="#1F5FBF" />

        {/* Price labels */}
        <text x={x0} y={y0 - 10} textAnchor="middle" className="fill-ink text-[12px] font-semibold">
          {formatMoney(currentFare)}
        </text>

        <text
          x={x1}
          y={Math.min(y1High - 8, y1Mid - 8)}
          textAnchor="middle"
          className="fill-peak font-mono text-[11px] font-bold"
        >
          {formatMoneyRange(in15.low, in15.high)}
        </text>

        <text
          x={x2}
          y={Math.min(y2High - 8, y2Mid - 8)}
          textAnchor="middle"
          className="fill-peak font-mono text-[11px] font-bold"
        >
          {formatMoneyRange(in30.low, in30.high)}
        </text>

        {/* X-axis time labels */}
        <text
          x={x0}
          y={svgHeight - 18}
          textAnchor="middle"
          className="fill-ink text-[11px] font-semibold"
        >
          Now
        </text>
        <text
          x={x0}
          y={svgHeight - 6}
          textAnchor="middle"
          className="fill-muted font-mono text-[10px]"
        >
          {time0}
        </text>

        <text
          x={x1}
          y={svgHeight - 18}
          textAnchor="middle"
          className="fill-ink text-[11px] font-semibold"
        >
          In 15m
        </text>
        <text
          x={x1}
          y={svgHeight - 6}
          textAnchor="middle"
          className="fill-muted font-mono text-[10px]"
        >
          {time15}
        </text>

        <text
          x={x2}
          y={svgHeight - 18}
          textAnchor="middle"
          className="fill-ink text-[11px] font-semibold"
        >
          In 30m
        </text>
        <text
          x={x2}
          y={svgHeight - 6}
          textAnchor="middle"
          className="fill-muted font-mono text-[10px]"
        >
          {time30}
        </text>
      </svg>
    </div>
  );
}
