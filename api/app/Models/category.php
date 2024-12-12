<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'parent_id'];

    // Self-referencing relationship for parent category
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // Self-referencing relationship for child categories
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function product(){
        return $this->hasMany(Product::class);
    }
}
