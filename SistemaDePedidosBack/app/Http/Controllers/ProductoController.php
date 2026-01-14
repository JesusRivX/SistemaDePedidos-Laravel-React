<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use App\Http\Resources\ProductoCollection;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->boolean('all')) {
            $productos = Producto::orderBy('id', 'ASC')->paginate(6);
            return new ProductoCollection($productos);
        }

        return new ProductoCollection(Producto::where('disponible', 1)->orderby('id', 'ASC')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        //
        $producto->disponible = !$producto->disponible;
        $producto->save();

        return [
            'message' => 'Disponibilidad actualizada correctamente',
            'producto' => $producto,
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        //
    }
}
