<?php

namespace App\Http\Controllers\controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:70',
            'description' => 'required|string',
            'photo' => 'required|string|max:70',
            'price' => 'required|numeric',
            'SKU' => 'required|numeric',
            'minQty' => 'required|numeric',
            'category_id' => 'required|numeric'
        ]);

        $product = Product::create($validated);
        return response()->json($product,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        if(!$product){
            return response()->json(['message'=>"product not found"],404);
        }
        return response()->json($product,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if(!$product){
            return response()->json(['message'=>"product not found"],404);
        }
        $product->delete();
        return response()->json(['message'=>"product was deleted successfully"],200);
    }
}
