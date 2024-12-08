<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    protected $fillable = ['name', 'description', 'photo','price','SKU','minQty','category_id'];
    public function category(){
        return $this->belongsTo(Category::class);
    }
}
