import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/layouts/admin-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PieChart, Pie, Cell } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  LabelList,
  Line
} from "recharts";

type MonthlyPrice = {
  year: number;
  month: number;
  category: 'piglet' | 'fattening' | string;
  avg_price: number;
};

type VetRequestStats = {
  total: number;
  ranking: Array<{
    type: string;
    total: number;
    percentage: number;
  }>;
};

export default function ProductionData() {
  const { props }: any = usePage();
  const { stats, monthlyMortality, weightTrend, records, forecast, vetRequests } = props;

  const [dateFrom, setDateFrom] = useState(props.filters?.from || "");
  const [dateTo, setDateTo] = useState(props.filters?.to || "");
  const [ageFrom, setAgeFrom] = useState(props.filters?.age_from || 4);
  const [ageTo, setAgeTo] = useState(props.filters?.age_to || 6);
  const [showAgeFilter, setShowAgeFilter] = useState(false);
  const [offset, setOffset] = useState(props.offset || 0);
  const [csvYear, setCsvYear] = useState(new Date().getFullYear());
  
  const last6Years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);
  const monthlyPrice: MonthlyPrice[] = props.monthlyPrice;
  const { totalInventoryByFarmType } = props;

  const applyFilter = () => {
    router.get(
      route("swine.production"),
      { from: dateFrom, to: dateTo },
      { preserveScroll: true }
    );
  };

  const quickFilter = (days: number) => {
    setDateFrom("");
    setDateTo("");
    router.get(
      route("swine.production"),
      { duration: days },
      { preserveScroll: true }
    );
  };

  const applyAgeFilter = () => {
    router.get(route("swine.production"), {
      age_from: ageFrom,
      age_to: ageTo
    });
  };

  const barangayKeys = React.useMemo(() => {
    const set = new Set<string>();
    forecast.forEach((item: any) => {
      Object.keys(item.barangays || {}).forEach((b) => set.add(b));
    });
    return Array.from(set);
  }, [forecast]);

  const chartData = forecast.map((item: any) => {
    const total = Object.values(item.barangays || {}).reduce(
      (sum: number, v: any) => sum + Number(v),
      0
    );
    return {
      month: item.month,
      total,
      ...item.barangays,
    };
  });

  const barangayColors = React.useMemo(() => {
    const map: Record<string, string> = {};
    const baseSaturation = 70;
    const baseLightness = 55;
    const total = barangayKeys.length;

    barangayKeys.forEach((b, i) => {
      const hue = Math.round((360 / total) * i);
      map[b] = `hsl(${hue}, ${baseSaturation}%, ${baseLightness}%)`;
    });
    return map;
  }, [barangayKeys]);

  const renderTotalLabel = (props: any) => {
    const { x, y, width, value } = props;
    if (!value || value === 0) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 6}
        fill="#374151"
        textAnchor="middle"
        fontSize={11}
        fontWeight={600}
      >
        {value}
      </text>
    );
  };

  const downloadForecastCSVs = () => {
    const url = route("swine.production.export", {
      age_from: ageFrom,
      age_to: ageTo,
      from: dateFrom || undefined,
      to: dateTo || undefined,
    });
    window.open(url, "_blank");
  };

  const prev6Months = () => {
    const newOffset = offset - 6;
    setOffset(newOffset);
    router.get(route('swine.production'), { offset: newOffset }, { preserveScroll: true });
  };

  const next6Months = () => {
    const newOffset = offset + 6;
    setOffset(newOffset);
    router.get(route('swine.production'), { offset: newOffset }, { preserveScroll: true });
  };

  const downloadCSV = () => {
    window.open(route('swine.production.exportbreed', { year: csvYear }), '_blank');
  };

  const monthlyPriceForChart = (monthlyPrice as MonthlyPrice[])
    .sort((a, b) => a.month - b.month)
    .map((p) => ({
      ...p,
      monthLabel: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][p.month - 1],
    }));

  const priceChartSummary = React.useMemo(() => {
    if (!monthlyPriceForChart || monthlyPriceForChart.length === 0) 
      return "No data available for the selected period.";
    const years = Array.from(new Set(monthlyPriceForChart.map(p => p.year))).sort();
    const categories = Array.from(new Set(monthlyPriceForChart.map(p => p.category)));
    const months = Array.from(new Set(monthlyPriceForChart.map(p => p.monthLabel)));
    return `Displaying average price per unit (${categories.join(", ")}) for ${months.join(", ")} of ${years.join(", ")}. Prices are shown in ₱ per selected unit type.`;
  }, [monthlyPriceForChart]);

  const priceChartData = React.useMemo(() => {
    const map = new Map<string, any>();
    monthlyPrice.forEach(p => {
      const key = `${p.year}-${p.month}`;
      if (!map.has(key)) {
        map.set(key, {
          label: `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][p.month - 1]} ${p.year}`,
        });
      }
      map.get(key)[p.category] = Number(p.avg_price);
    });
    return Array.from(map.values());
  }, [monthlyPrice]);

  const inventoryChartData = (totalInventoryByFarmType || []).map((item: any) => ({
    name: item.farming_type,
    total: item.total,
  }));

  return (
    <AppLayout>
      <Head title="Swine Production Data" />

      {/* Header */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Swine Production Analytics</h1>
        <p className="text-sm text-muted-foreground">
          View statistics, trends, and swine production records.
        </p>
      </div>

      {/* ================== SWINE ANALYTICS SECTION (MOVED TO TOP) ================== */}
      <h1 className="font-bold text-3xl p-2 ml-4 mt-2">Swine Analytics</h1>
      
      {/* Filters */}
      <div className="p-4  bg-white dark:bg-gray-600/30  shadow-sm flex flex-col md:flex-row md:items-end md:flex-wrap gap-3 mb-6">
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm mb-1">From</label>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>

        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm mb-1">To</label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>

        <Button className="w-full sm:w-auto" onClick={applyFilter}>
          Apply
        </Button>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto ml-0 md:ml-auto">
          <Button variant="outline" onClick={() => quickFilter(7)}>
            Last 7 Days
          </Button>
          <Button variant="outline" onClick={() => quickFilter(30)}>
            30 Days
          </Button>
          <Button variant="outline" onClick={() => quickFilter(90)}>
            90 Days
          </Button>
          <Button variant="outline" onClick={() => quickFilter(365)}>
            This Year
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {[
          { label: "Total Swine", value: stats.total },
          { label: "Active", value: stats.active },
          { label: "Sold", value: stats.sold },
          { label: "Mortality", value: stats.dead }
        ].map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardTitle className="text-sm">{item.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-bold">{item.value}</CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* Weight Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Average Weight Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightTrend}>
                <XAxis dataKey="birthdate" hide />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Price Trend */}
        <Card> 
          <CardHeader>
            <CardTitle className="text-sm">Average Price per Unit Trend</CardTitle>
            <div className="flex gap-2 items-center">
              <label className="text-xs">Filter by Unit:</label>
              <select
                className="border rounded p-1 text-xs"
                onChange={(e) => {
                  router.get(
                    route('swine.production'),
                    { price_unit_type: e.target.value, from: dateFrom, to: dateTo },
                    { preserveState: true, preserveScroll: true }
                  );
                }}
                defaultValue=""
              >
                <option value="">All</option>
                <option value="per_kg">kg</option>
                <option value="per_head">head</option>
              </select>
            </div>
            <p className="text-[10px] text-gray-500 mt-1 leading-tight">
              {priceChartSummary}
            </p>
          </CardHeader>
          <CardContent className="h-[260px] m-0 p-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceChartData} margin={{ top: 20, right: 10, left: 10, bottom: 40 }}>
                <XAxis 
                  dataKey="label" 
                  interval={0} 
                  angle={-35} 
                  textAnchor="end" 
                  fontSize={12} 
                  height={50} 
                />
                <YAxis
                  tickFormatter={(v) => `₱${v.toFixed(2)}`}
                  width={60}
                  fontSize={10}
                />
                <Tooltip formatter={(v: number) => `₱${v.toFixed(2)}`} 
                         wrapperStyle={{ fontSize: '10px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="piglet"
                  name="Piglet"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="fattening"
                  name="Fattening"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inventory by Farm Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Total Swine Inventory by Farm Type
            </CardTitle>
            <p className="text-xs text-gray-500 mt-1">
              Counts active (live) swine grouped by Backyard and Commercial farms.
              Filters follow the selected date range or duration.
            </p>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryChartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6">
                  <LabelList dataKey="total" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Breed Production Table */}
        <Card className="p-2 sm:p-4 m-2 sm:m-4">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Swine Production by Breed (6-Month View)</CardTitle>
            <div className="flex gap-2 items-center">
              <Button size="sm" onClick={prev6Months}>Prev</Button>
              <Button size="sm" onClick={next6Months}>Next</Button>
              <Button size="sm" onClick={() => window.open('/cms/admin/create', '_blank')}>Create CMS</Button>
            </div>
          </CardHeader>
          <ScrollArea className="h-[200px]">
            <table className="w-full table-auto border-collapse border border-gray-300 text-xs">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="border p-2 bg-gray-500 text-left">Breed</th>
                  {props.breedColumns.map((col: string) => (
                    <th key={col} className="border bg-gray-500 p-2 text-center">{col}</th>
                  ))}
                  <th className="border  bg-gray-500 p-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {props.breedProduction.map((row: any) => (
                  <tr key={row.breed}>
                    <td className="border p-2 font-medium">{row.breed}</td>
                    {props.breedColumns.map((col: string) => (
                      <td key={col} className="border p-2 text-center">{row[col]}</td>
                    ))}
                    <td className="border p-2 text-center font-semibold">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
          <div className="flex gap-2 items-center mt-2">
            <select
              className="border px-2 py-1 text-sm rounded"
              value={csvYear}
              onChange={(e) => setCsvYear(Number(e.target.value))}
            >
              {last6Years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <Button size="sm" onClick={downloadCSV}>Download CSV</Button>
            <Button
              size="sm"
              onClick={() => window.open(route('swine.production.export6years'), '_blank')}
            >
              Download Last 6 Years CSV
            </Button>
          </div>
        </Card>
      </div>

      {/* Veterinary Request Statistics */}
      <Card className="col-span-1 lg:col-span-2 m-4">
        <CardHeader>
          <CardTitle className="text-sm">Veterinary Request Statistics</CardTitle>
          <p className="text-xs text-gray-500">
            Total requests: {vetRequests.total} • Filtered by selected date range
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart for Request Type Distribution */}
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vetRequests.ranking}
                    dataKey="total"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ payload }: any) => {
                      if (!payload) return null;
                      return `${payload.type}: ${payload.percentage}%`;
                    }}
                  >
                    {vetRequests.ranking.map((_: any, index: number) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={[
                          '#3b82f6', // Blue
                          '#10b981', // Green
                          '#f59e0b', // Yellow
                          '#ef4444', // Red
                          '#8b5cf6', // Purple
                        ][index % 5]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any, name: any, props: any) => [
                      `${value} requests (${props.payload.percentage}%)`,
                      props.payload.type
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Ranking Table */}
            <div className="h-[250px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-500">
                  <tr>
                    <th className="text-left p-2">Rank</th>
                    <th className="text-left p-2">Request Type</th>
                    <th className="text-left p-2">Count</th>
                    <th className="text-left p-2">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {vetRequests.ranking.map((item: any, index: number) => (
                    <tr key={item.type} className="border-t">
                      <td className="p-2">#{index + 1}</td>
                      <td className="p-2 font-medium">{item.type}</td>
                      <td className="p-2">{item.total}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <span>{item.percentage}%</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {vetRequests.ranking.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No veterinary requests found for the selected period
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <Card className="p-3">
              <div className="text-xs text-gray-500">Total Requests</div>
              <div className="text-xl font-bold">{vetRequests.total}</div>
            </Card>
            <Card className="p-3">
              <div className="text-xs text-gray-500">Most Common</div>
              <div className="text-lg font-semibold truncate">
                {vetRequests.ranking[0]?.type || 'N/A'}
              </div>
            </Card>
            <Card className="p-3">
              <div className="text-xs text-gray-500">Top 3 Types</div>
              <div className="text-lg font-semibold">
                {vetRequests.ranking.slice(0, 3).reduce((sum: number, item: any) => sum + item.total, 0)}
              </div>
            </Card>
            <Card className="p-3">
              <div className="text-xs text-gray-500">Unique Types</div>
              <div className="text-lg font-semibold">
                {vetRequests.ranking.length}
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* ================== FOOD SECURITY SECTION (MOVED TO BOTTOM) ================== */}
      <Card className="p-2 sm:p-4 m-2 sm:m-4 mt-8">
        <div className="flex justify-end mb-2">
          <Button
            size="sm"
            className="text-sm px-3 py-1"
            onClick={downloadForecastCSVs}
          >
            Download Forecast CSV
          </Button>
        </div>

        {/* Summary + Toggle Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="text-sm sm:text-base font-semibold">
            Food Security Forecast (Next 6 Months)
            <p className="text-xs text-gray-500 mt-1">
              Showing livestock ready for meat based on age{" "}
              <strong>{ageFrom}–{ageTo} months</strong>. Only{" "}
              <strong>active</strong> pigs with recorded <strong>birthdates</strong>{" "}
              <strong>status: active/available and all the type of purpose</strong> are included.
            </p>
          </div>

          {/* Toggle button to show filters */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Age range: {ageFrom}-{ageTo} months</span>
            <Button
              size="sm"
              className="text-sm px-3 py-1"
              onClick={() => setShowAgeFilter((prev) => !prev)}
            >
              {showAgeFilter ? "Hide Filter" : "Change"}
            </Button>
          </div>
        </div>

        {/* Minimal Age Filter (hidden by default) */}
        {showAgeFilter && (
          <div className="flex items-end gap-2 mb-1">
            <div className="flex flex-col">
              <label className="text-xs font-medium">Age From</label>
              <Input
                type="number"
                className="w-12 sm:w-14 text-sm"
                value={ageFrom}
                onChange={(e) => setAgeFrom(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium">Age To</label>
              <Input
                type="number"
                className="w-12 sm:w-14 text-sm"
                value={ageTo}
                onChange={(e) => setAgeTo(Number(e.target.value))}
              />
            </div>
            <Button className="text-sm px-3 py-1" onClick={applyAgeFilter}>
              Apply
            </Button>
          </div>
        )}

        {/* Full width chart */}
        <CardContent className="h-[350px] text-xs -mx-2 sm:-mx-4 pl-0 pb-6 relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 20, left: 0, bottom: 50 }}
            >
              <XAxis
                dataKey="month"
                interval={0}
                angle={window.innerWidth < 640 ? 0 : -45}
                textAnchor={window.innerWidth < 640 ? "middle" : "end"}
                tickFormatter={(value) =>
                  window.innerWidth < 640
                    ? value.split(" ")[0].slice(0, 3)
                    : value
                }
              />
              <YAxis />
              <Tooltip />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{
                  fontSize: "12px",
                  position: window.innerWidth < 640 ? "absolute" : "relative",
                  top: window.innerWidth < 640 ? 0 : undefined,
                  left: window.innerWidth < 640 ? "50%" : undefined,
                  transform: window.innerWidth < 640 ? "translateX(-50%)" : undefined,
                  backgroundColor: window.innerWidth < 640 ? "rgba(255,255,255,0.8)" : "transparent",
                  borderRadius: window.innerWidth < 640 ? "4px" : undefined,
                  padding: window.innerWidth < 640 ? "2px 4px" : undefined,
                  zIndex: 2,
                }}
              />
              {barangayKeys.map((barangay) => (
                <Bar
                  key={barangay}
                  dataKey={barangay}
                  stackId="a"
                  fill={barangayColors[barangay]}
                  name={barangay}
                >
                  {barangay === barangayKeys[barangayKeys.length - 1] && ( 
                    <LabelList dataKey="total" position="top" content={renderTotalLabel} />
                  )}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pork Consumption Forecast Statement and Image */}
      <div className="col-span-1 lg:col-span-2 mt-6 mb-10 mx-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Text Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Pork Consumption Forecast 2026
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                Pork consumption is forecast to increase 4 percent in 2026, 
                driven by a sustained increase in population and robust economic growth. 
                The Philippine government also continues to implement measures to keep 
                inflation within a target range, which will help consumers access affordable 
                meat products.
              </p>
              
              {/* Source Citation */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 italic">
                  Source: Livestock and Products Annual
                </p>
              </div>
              
              {/* Optional: Key Highlights */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  +4% Growth Forecast
                </span>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                  Population Growth
                </span>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                  Economic Factors
                </span>
              </div>
            </div>
            
            {/* Actual Image from public folder */}
            <div className="bg-gray-50 p-2 rounded-lg border min-h-[200px] flex items-center justify-center overflow-hidden">
              <img 
                src="/select.jpg" 
                alt="Pork Consumption Forecast Visualization"
                className="w-full h-auto max-h-[250px] object-contain rounded"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f3f4f6'/%3E%3Ctext x='200' y='125' font-family='Arial' font-size='14' text-anchor='middle' fill='%236b7280'%3EPork Consumption Chart%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <Card className="m-4">
        <CardHeader>
          <CardTitle className="text-sm">Swine Production Records</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[350px]">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Swine ID</th>
                <th className="p-2">Farmer</th>
                <th className="p-2">Action</th>
                <th className="p-2">Weight</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.data.map((r: any) => (
                <tr key={r.id} className="border-b">
                  <td className="p-2">{r.birthdate}</td>
                  <td className="p-2">{r.swine_id}</td>
                  <td className="p-2">{r.farmer?.name}</td>
                  <td className="p-2">{r.action}</td>
                  <td className="p-2">{r.weight || "-"}</td>
                  <td className="p-2">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </Card>

      {/* CSV Download Button */}
      <div className="p-4">
        <Button
          variant="outline"
          onClick={() => {
            const params = new URLSearchParams();
            if (dateFrom) params.append('from', dateFrom);
            if (dateTo) params.append('to', dateTo);
            if (props.filters?.duration) params.append('duration', props.filters.duration);
            if (props.filters?.price_unit_type) params.append('price_unit_type', props.filters.price_unit_type);
            window.open(route('swine.production.exportCSV') + '?' + params.toString(), '_blank');
          }}
        >
          Download Full Analytics CSV
        </Button>
      </div>
    </AppLayout>
  );
}