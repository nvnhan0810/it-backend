<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Series;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeriesController extends Controller
{
    public function index()
    {
        $series = Series::paginate(50);

        return Inertia::render('private/series/ListPage', [
            'series' => $series,
        ]);
    }

    public function create()
    {
        return Inertia::render('private/series/CreatePage');
    }

    public function store(Request $request)
    {
        $series = Series::create($request->all());

        return redirect()->route('admin.series.index');
    }
}
