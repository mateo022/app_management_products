<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    
    protected $fillable = [
        "product_name",
        "product_reference",
        "product_size",
        "product_description",
        "product_image",
        "product_price",
        "product_quantity",
        "category_id",
    ];
  
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
