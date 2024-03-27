<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Category::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $category = new Category();
        $category->name = $request->input('name');
        $category->description = $request->input('description');
        $category->status = $request->input('status');

        // Upload and store the image
        if ($request->hasFile('img')) {
            $imagePath = $request->file('img')->store('category_images', 'public');
            $category->img = $imagePath;
        }

        $category->save();

        return response()->json(['Category' => $category], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return response()->json(['Category' => $category], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $category->update($request->all());
        return response()->json(['Id' => $category->id, 'Message' => 'Category successfully updated'], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {

        $category->delete();
        return response()->json(['Id' => $category->id, 'Message' => 'Category successfully removed'], Response::HTTP_ACCEPTED);
    }
}
