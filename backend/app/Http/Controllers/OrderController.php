<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('user', 'products')->get();
        return response()->json(['orders' => $orders], 200);
    }

    public function show($id)
    {
        $order = Order::with('user', 'products')->findOrFail($id);
        return response()->json(['order' => $order], 200);
    }

    public function store(Request $request)
    {
        // Create a new order
        $order = Order::create([
            'user_id' => $request->input('user_id'),
            'total_price' => $request->input('total_price'),
        ]);
        return response()->json(['order' => $order], 201);
    }

    public function update(Request $request, $id)
    {
        // Find the order
        $order = Order::findOrFail($id);

        // Update order data
        $order->update([
            'user_id' => $request->input('user_id', $order->user_id),
            'total_price' => $request->input('total_price', $order->total_price),
        ]);

        return response()->json(['order' => $order], 200);
    }

    public function destroy($id)
    {
        // Find the order
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully'], 200);
    }
}