
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  TooltipProps, 
  XAxis, 
  YAxis 
} from "recharts";
import { Circle, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const data = [
  { name: "Mon", orders: 24, shipments: 18, returns: 2 },
  { name: "Tue", orders: 32, shipments: 23, returns: 3 },
  { name: "Wed", orders: 38, shipments: 31, returns: 4 },
  { name: "Thu", orders: 30, shipments: 28, returns: 5 },
  { name: "Fri", orders: 42, shipments: 35, returns: 6 },
  { name: "Sat", orders: 36, shipments: 32, returns: 3 },
  { name: "Sun", orders: 22, shipments: 18, returns: 2 },
];

const staffData = [
  { name: "Morning", picking: 65, packing: 42, shipping: 38 },
  { name: "Afternoon", picking: 83, packing: 55, shipping: 47 },
  { name: "Evening", picking: 42, packing: 36, shipping: 31 },
];

export function AnalyticsCard() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Weekly Performance</CardTitle>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                Last 7 days
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[240px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorShipments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#3b82f6" 
                    fillOpacity={1}
                    fill="url(#colorOrders)"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="shipments" 
                    stroke="#10b981" 
                    fillOpacity={1}
                    fill="url(#colorShipments)"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center">
                <Circle className="h-3 w-3 mr-1 text-blue-500 fill-blue-500" />
                <span className="text-xs font-medium">Orders</span>
              </div>
              <div className="flex items-center">
                <Circle className="h-3 w-3 mr-1 text-green-500 fill-green-500" />
                <span className="text-xs font-medium">Shipments</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Staff Productivity</CardTitle>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3" />
                By shift
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[240px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={staffData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="picking" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="packing" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="shipping" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center">
                <div className="h-3 w-3 mr-1 bg-blue-500 rounded-sm" />
                <span className="text-xs font-medium">Picking</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 mr-1 bg-purple-500 rounded-sm" />
                <span className="text-xs font-medium">Packing</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 mr-1 bg-green-500 rounded-sm" />
                <span className="text-xs font-medium">Shipping</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded-md shadow-md text-xs">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="h-2 w-2 mr-1 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
