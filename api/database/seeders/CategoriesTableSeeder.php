<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $electronics = Category::create(['name' => 'Electronics']);
        $fashion = Category::create(['name' => 'Fashion']);

        $mobiles = Category::create(['name' => 'Mobiles', 'parent_id' => $electronics->id]);
        $laptops = Category::create(['name' => 'Laptops', 'parent_id' => $electronics->id]);

        $mensWear = Category::create(['name' => 'Men\'s Wear', 'parent_id' => $fashion->id]);
        $womensWear = Category::create(['name' => 'Women\'s Wear', 'parent_id' => $fashion->id]);

        $smartphones = Category::create(['name' => 'Smartphones', 'parent_id' => $mobiles->id]);
        $gamingLaptops = Category::create(['name' => 'Gaming Laptops', 'parent_id' => $laptops->id]);

        $shirts = Category::create(['name' => 'Shirts', 'parent_id' => $mensWear->id]);
        $dresses = Category::create(['name' => 'Dresses', 'parent_id' => $womensWear->id]);

        Product::create(['name' => 'iPhone 14',"SKU"=>90,'description'=>"hellp",'minQty'=>6, 'price' => 999.99, 'category_id' => $smartphones->id]);
        Product::create(['name' => 'Asus ROG Laptop',"SKU"=>91,'description'=>"hellp",'minQty'=>6, 'price' => 1499.99, 'category_id' => $gamingLaptops->id]);

        Product::create(['name' => 'Formal Shirt',"SKU"=>98,'description'=>"hellp",'minQty'=>6, 'price' => 49.99, 'category_id' => $shirts->id]);
        Product::create(['name' => 'Evening Dress',"SKU"=>93,'description'=>"hellp", 'minQty'=>6,'price' => 79.99, 'category_id' => $dresses->id]);
    }
}
