
import { StatCard } from "@/components/ui/StatCard";
import { DataTable } from "@/components/ui/DataTable";
import { Package, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useInventory } from "@/hooks/useInventory";
import { Skeleton } from "@/components/ui/skeleton";

export function InventoryOverview() {
  const { inventory, isLoading } = useInventory();
  
  // Transform the data for display
  const inventoryItems = inventory.map(item => ({
    id: item.id,
    name: item.product.name,
    sku: item.product.sku,
    stock: item.quantity,
    capacity: item.max_stock_level,
    status: getStockStatus(item.quantity, item.min_stock_level),
    category: item.product.category || 'Uncategorized',
    location: item.location
  }));

  function getStockStatus(quantity: number, minStock: number) {
    if (quantity <= minStock * 0.3) return "Critical";
    if (quantity <= minStock) return "Low Stock";
    return "In Stock";
  }

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
    { 
      header: "Location", 
      accessorKey: "location",
      className: "hidden md:table-cell",
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

  const lowStockCount = inventoryItems.filter(item => item.status === "Low Stock").length;
  const outOfStockCount = inventoryItems.filter(item => item.status === "Critical").length;
  const totalItems = inventory.length;
  const stockUtilization = Math.round(
    inventory.reduce((acc, item) => acc + (item.quantity / item.max_stock_level * 100), 0) / 
    (inventory.length || 1)
  );

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-up">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Inventory Items" 
          value={totalItems.toString()} 
          icon={Package}
          trend={{ value: 3.2, positive: true }}
        />
        
        <StatCard 
          title="Stock Utilization" 
          value={stockUtilization.toString()} 
          valueSuffix="%" 
          icon={TrendingUp}
          trend={{ value: 1.8, positive: true }}
        />
        
        <StatCard 
          title="Low Stock Items" 
          value={lowStockCount.toString()} 
          icon={TrendingDown}
          trend={{ value: 5.1, positive: false }}
          className="border-amber-200 bg-amber-50/50"
        />
        
        <StatCard 
          title="Out of Stock" 
          value={outOfStockCount.toString()} 
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
