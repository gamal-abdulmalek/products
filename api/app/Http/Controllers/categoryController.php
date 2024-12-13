<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class categoryController extends Controller
{
    public function index()
    {
        // Fetch all parent categories with their children
        $categories = Category::with('children.children')->whereNull('parent_id')->get();

        return response()->json($categories);
    }

    public function getProductsByCategory($categoryId)
    {
        $category = Category::with('products')->findOrFail($categoryId);

        return response()->json([
            'category' => $category->name,
            'products' => $category->products,
        ]);
    }

    
}
