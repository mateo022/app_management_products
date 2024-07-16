<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Valor por defecto: 10
        return Product::paginate($perPage);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $product = new Product();
        $product->product_name = $request->input('product_name');
        $product->product_reference = $request->input('product_reference');
        $product->product_size = $request->input('product_size');
        $product->product_description = $request->input('product_description');
        $product->product_price = $request->input('product_price');
        $product->product_quantity = $request->input('product_quantity');
        $product->category_id = $request->input('category_id');

        // Upload and store the image
        if ($request->hasFile('product_image')) {
            $imagePath = $request->file('product_image')->store('product_images', 'public');
            $product->product_image = $imagePath;
        }

        $product->save();

        return response()->json(['Product' => $product], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json(['product' => $product], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $product->update($request->all());
        return response()->json(['Id' => $product->id, 'Message' => 'Product successfully updated'], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['Id' => $product->id, 'Message' => 'Product successfully removed'], Response::HTTP_ACCEPTED);
    }
}
