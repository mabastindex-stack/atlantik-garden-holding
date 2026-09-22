<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Factory;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductResource::collection(Product::with('factory')->orderBy('name')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $this->mapColumns($this->validated($request));
        $data['discount'] ??= 0;

        $product = Product::create($data);

        return new ProductResource($product->load('factory'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product->load('factory'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $data = $this->mapColumns($this->validated($request, $product));

        $product->update($data);

        return new ProductResource($product->load('factory'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request, ?Product $product = null): array
    {
        $slugRule = $product
            ? ['sometimes', 'string', 'alpha_dash', 'unique:products,slug,'.$product->id]
            : ['required', 'string', 'alpha_dash', 'unique:products,slug'];
        $required = $product ? 'sometimes' : 'required';

        return $request->validate([
            'slug' => $slugRule,
            'name' => [$required, 'string'],
            'category' => [$required, 'string'],
            'factoryId' => [$required, 'string', 'exists:factories,slug'],
            'price' => [$required, 'numeric', 'min:0'],
            'unit' => [$required, 'string'],
            'discount' => ['sometimes', 'integer', 'min:0', 'max:100'],
            'art' => ['nullable', 'string'],
            'tint' => ['nullable', 'string'],
            'image' => ['nullable', 'string'],
            'short' => [$required, 'string'],
            'description' => [$required, 'string'],
            'features' => [$required, 'array'],
            'packaging' => [$required, 'string'],
            'shelfLife' => [$required, 'string'],
            'moq' => [$required, 'string'],
            'season' => [$required, 'string'],
        ]);
    }

    private function mapColumns(array $data): array
    {
        if (isset($data['factoryId'])) {
            $data['factory_id'] = Factory::where('slug', $data['factoryId'])->firstOrFail()->id;
            unset($data['factoryId']);
        }
        if (isset($data['shelfLife'])) {
            $data['shelf_life'] = $data['shelfLife'];
            unset($data['shelfLife']);
        }

        return $data;
    }
}
