
import { CalendarDays, Clock, Package, ShoppingCart, Tag, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StatCard } from "../ui/StatCard";

export function OrdersPanel() {
  // Sample orders data
  const orders = [
    { 
      id: "ORD-7329", 
      customer: "Alex Johnson", 
      items: 3, 
      total: "$128.45", 
      status: "Processing", 
      placed: "2023-06-14T09:24:00", 
      updated: "10 min ago" 
    },
    { 
      id: "ORD-7328", 
      customer: "Maria Garcia", 
      items: 1, 
      total: "$59.99", 
      status: "Shipped", 
      placed: "2023-06-14T08:11:00", 
      updated: "32 min ago" 
    },
    { 
      id: "ORD-7327", 
      customer: "James Wilson", 
      items: 5, 
      total: "$243.15", 
      status: "Delivered", 
      placed: "2023-06-13T17:42:00", 
      updated: "3 hours ago" 
    },
    { 
      id: "ORD-7326", 
      customer: "Emma Brown", 
      items: 2, 
      total: "$87.50", 
      status: "Processing", 
      placed: "2023-06-13T15:10:00", 
      updated: "5 hours ago" 
    },
    { 
      id: "ORD-7325", 
      customer: "Michael Davis", 
      items: 4, 
      total: "$176.80", 
      status: "Pending", 
      placed: "2023-06-13T14:05:00", 
      updated: "6 hours ago" 
    },
  ];

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
          status === "Processing" && "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
          status === "Shipped" && "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
          status === "Delivered" && "bg-green-50 text-green-600 border-green-200 hover:bg-green-100",
          status === "Pending" && "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
        )}
        variant="outline"
      >
        {status}
      </Badge>
    );
  }

  const ordersByStatus = {
    pending: 12,
    processing: 28,
    shipped: 47,
    delivered: 156
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="New Orders" 
          value="64" 
          icon={ShoppingCart}
          trend={{ value: 12.3, positive: true }}
        />
        
        <StatCard 
          title="Average Order Value" 
          value="127" 
          valuePrefix="$"
          icon={Tag}
          trend={{ value: 3.7, positive: true }}
        />
        
        <StatCard 
          title="Orders Processed" 
          value="243" 
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
              data={orders}
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
                    style={{ width: `${(ordersByStatus.pending / (ordersByStatus.pending + ordersByStatus.processing + ordersByStatus.shipped + ordersByStatus.delivered)) * 100}%` }} 
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
                    style={{ width: `${(ordersByStatus.processing / (ordersByStatus.pending + ordersByStatus.processing + ordersByStatus.shipped + ordersByStatus.delivered)) * 100}%` }} 
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
                    style={{ width: `${(ordersByStatus.shipped / (ordersByStatus.pending + ordersByStatus.processing + ordersByStatus.shipped + ordersByStatus.delivered)) * 100}%` }} 
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
                    style={{ width: `${(ordersByStatus.delivered / (ordersByStatus.pending + ordersByStatus.processing + ordersByStatus.shipped + ordersByStatus.delivered)) * 100}%` }} 
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
