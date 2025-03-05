
import { CalendarDays, Clock, Package, ShoppingCart, Tag, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StatCard } from "../ui/StatCard";
import { useOrders } from "@/hooks/useOrders";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export function OrdersPanel() {
  const { orders, isLoading } = useOrders();
  
  // Transform the data for display
  const orderItems = orders.map(order => ({
    id: order.id,
    customer: order.customer_name,
    items: order.items.length,
    total: `$${order.total_amount.toFixed(2)}`,
    status: order.status,
    placed: order.created_at,
    updated: formatDistanceToNow(new Date(order.updated_at), { addSuffix: true })
  }));

  const columns = [
    { header: "Order ID", accessorKey: "id" },
    { header: "Customer", accessorKey: "customer", className: "hidden md:table-cell" },
    { 
      header: "Status", 
      accessorKey: "status",
      cell: (order: any) => <OrderStatusBadge status={order.status} />,
    },
    { header: "Total", accessorKey: "total" },
    { 
      header: "Updated", 
      accessorKey: "updated",
      cell: (order: any) => (
        <div className="flex items-center text-muted-foreground text-xs">
          <Clock className="mr-1 h-3 w-3" />
          {order.updated}
        </div>
      ),
    },
  ];

  function OrderStatusBadge({ status }: { status: string }) {
    return (
      <Badge 
        className={cn(
          "rounded-full px-2 py-0.5 text-xs font-medium",
          status === "processing" && "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
          status === "shipped" && "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
          status === "delivered" && "bg-green-50 text-green-600 border-green-200 hover:bg-green-100",
          status === "pending" && "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100",
          status === "cancelled" && "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
        )}
        variant="outline"
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  }

  const ordersByStatus = {
    pending: orders.filter(order => order.status === 'pending').length,
    processing: orders.filter(order => order.status === 'processing').length,
    shipped: orders.filter(order => order.status === 'shipped').length,
    delivered: orders.filter(order => order.status === 'delivered').length
  };

  const totalOrders = orders.length;
  
  // Calculate average order value
  const totalValue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalValue / totalOrders) : 0;
  
  // Count processed orders (shipped or delivered)
  const processedOrders = orders.filter(order => 
    order.status === 'shipped' || order.status === 'delivered'
  ).length;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-up">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[400px] md:col-span-2" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="New Orders" 
          value={totalOrders.toString()} 
          icon={ShoppingCart}
          trend={{ value: 12.3, positive: true }}
        />
        
        <StatCard 
          title="Average Order Value" 
          value={avgOrderValue.toString()} 
          valuePrefix="$"
          icon={Tag}
          trend={{ value: 3.7, positive: true }}
        />
        
        <StatCard 
          title="Orders Processed" 
          value={processedOrders.toString()} 
          icon={Package}
          trend={{ value: 8.1, positive: true }}
        />
        
        <StatCard 
          title="Delivery Rate" 
          value="98.2" 
          valueSuffix="%" 
          icon={Truck}
          trend={{ value: 1.2, positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <CardDescription>Latest orders across all channels</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={columns}
              data={orderItems}
              className="border-0"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Order Status</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription>Current distribution by status</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mr-2" />
                    <span>Pending</span>
                  </div>
                  <span className="font-medium">{ordersByStatus.pending}</span>
                </div>
                <div className="h-1.5 w-full bg-amber-100 rounded-full">
                  <div 
                    className="h-1.5 bg-amber-500 rounded-full" 
                    style={{ width: `${(ordersByStatus.pending / Math.max(1, totalOrders)) * 100}%` }} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
                    <span>Processing</span>
                  </div>
                  <span className="font-medium">{ordersByStatus.processing}</span>
                </div>
                <div className="h-1.5 w-full bg-blue-100 rounded-full">
                  <div 
                    className="h-1.5 bg-blue-500 rounded-full" 
                    style={{ width: `${(ordersByStatus.processing / Math.max(1, totalOrders)) * 100}%` }} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mr-2" />
                    <span>Shipped</span>
                  </div>
                  <span className="font-medium">{ordersByStatus.shipped}</span>
                </div>
                <div className="h-1.5 w-full bg-purple-100 rounded-full">
                  <div 
                    className="h-1.5 bg-purple-500 rounded-full" 
                    style={{ width: `${(ordersByStatus.shipped / Math.max(1, totalOrders)) * 100}%` }} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    <span>Delivered</span>
                  </div>
                  <span className="font-medium">{ordersByStatus.delivered}</span>
                </div>
                <div className="h-1.5 w-full bg-green-100 rounded-full">
                  <div 
                    className="h-1.5 bg-green-500 rounded-full" 
                    style={{ width: `${(ordersByStatus.delivered / Math.max(1, totalOrders)) * 100}%` }} 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
