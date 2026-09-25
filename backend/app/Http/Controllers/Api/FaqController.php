<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FaqController extends Controller
{
    public function index()
    {
        return FaqResource::collection(Faq::orderBy('id')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'question' => ['required', 'string', 'max:500'],
            'answer' => ['required', 'string'],
        ]);

        $faq = Faq::create([
            'slug' => $this->uniqueSlug($data['question']),
            'question' => $data['question'],
            'answer' => $data['answer'],
        ]);

        return new FaqResource($faq);
    }

    public function update(Request $request, Faq $faq)
    {
        $data = $request->validate([
            'question' => ['required', 'string', 'max:500'],
            'answer' => ['required', 'string'],
        ]);

        $faq->update([
            'question' => $data['question'],
            'answer' => $data['answer'],
        ]);

        return new FaqResource($faq);
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function uniqueSlug(string $question): string
    {
        $base = Str::slug($question) ?: 'question';
        $slug = $base;
        $i = 2;
        while (Faq::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }
}
