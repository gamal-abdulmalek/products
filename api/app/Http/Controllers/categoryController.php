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

    public function import(Request $request)
    {
        $categories = $request->input('categories');

        foreach ($categories as $mainCategory) {
            $mainCat = Category::create(['name' => $mainCategory['name']]);

            if (!empty($mainCategory['subcategories'])) {
                foreach ($mainCategory['subcategories'] as $subCategory) {
                    $subCat = Category::create([
                        'name' => $subCategory['name'],
                        'parent_id' => $mainCat->id,
                    ]);

                    if (!empty($subCategory['childCategories'])) {
                        foreach ($subCategory['childCategories'] as $childCategory) {
                            Category::create([
                                'name' => $childCategory['name'],
                                'parent_id' => $subCat->id,
                            ]);
                        }
                    }
                }
            }
        }

        return response()->json(['message' => 'Categories imported successfully'], 200);
    }
}
