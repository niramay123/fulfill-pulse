
import { StatCard } from "@/components/ui/StatCard";
import { DataTable } from "@/components/ui/DataTable";
import { Package, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function InventoryOverview() {
  // Sample inventory data
  const inventoryItems = [
    { id: 1, name: "Wireless Headphones", sku: "WH-101", stock: 124, capacity: 150, status: "In Stock", category: "Electronics" },
    { id: 2, name: "Organic Coffee Beans", sku: "CB-202", stock: 37, capacity: 100, status: "Low Stock", category: "Food & Beverage" },
    { id: 3, name: "Yoga Mat", sku: "YM-303", stock: 64, capacity: 80, status: "In Stock", category: "Fitness" },
    { id: 4, name: "Smartphone Case", sku: "SC-404", stock: 9, capacity: 60, status: "Critical", category: "Accessories" },
    { id: 5, name: "Smart Watch", sku: "SW-505", stock: 26, capacity: 40, status: "In Stock", category: "Electronics" },
  ];

  const columns = [
    { header: "Product", accessorKey: "name" },
    { header: "SKU", accessorKey: "sku", className: "hidden md:table-cell" },
    { header: "Category", accessorKey: "category", className: "hidden lg:table-cell" },
    { 
      header: "Stock Level", 
      accessorKey: "stock",
      cell: (item: any) => (
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">{item.stock}/{item.capacity}</span>
            <StockBadge status={item.status} />
          </div>
          <Progress 
            value={(item.stock / item.capacity) * 100} 
            className={cn(
              "h-1.5 w-full",
              item.status === "Critical" ? "bg-red-100" : 
              item.status === "Low Stock" ? "bg-amber-100" : 
              "bg-green-100"
            )}
            indicatorClassName={
              item.status === "Critical" ? "bg-red-500" : 
              item.status === "Low Stock" ? "bg-amber-500" : 
              "bg-green-500"
            }
          />
        </div>
      ),
    },
  ];

  function StockBadge({ status }: { status: string }) {
    if (status === "In Stock") {
      return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs">In Stock</Badge>;
    } else if (status === "Low Stock") {
      return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 text-xs">Low Stock</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">Critical</Badge>;
    }
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Inventory Items" 
          value="1,243" 
          icon={Package}
          trend={{ value: 3.2, positive: true }}
        />
        
        <StatCard 
          title="Stock Utilization" 
          value="76" 
          valueSuffix="%" 
          icon={TrendingUp}
          trend={{ value: 1.8, positive: true }}
        />
        
        <StatCard 
          title="Low Stock Items" 
          value="17" 
          icon={TrendingDown}
          trend={{ value: 5.1, positive: false }}
          className="border-amber-200 bg-amber-50/50"
        />
        
        <StatCard 
          title="Out of Stock" 
          value="3" 
          icon={AlertTriangle}
          trend={{ value: 2.3, positive: false }}
          className="border-red-200 bg-red-50/50"
        />
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Inventory Status</h3>
          <Badge variant="outline" className="bg-primary/5 text-primary">View All</Badge>
        </div>
        <DataTable 
          columns={columns} 
          data={inventoryItems} 
        />
      </div>
    </div>
  );
}
