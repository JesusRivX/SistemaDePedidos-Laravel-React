<?php

namespace App\Http\Controllers;

use App\Http\Resources\PedidoCollection;
use Carbon\Carbon;
use App\Models\Pedido;
use Illuminate\Http\Request;
use App\Models\PedidoProducto;
use Illuminate\Support\Facades\Auth;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return new PedidoCollection(Pedido::with(['user', 'productos'])->where('estado', '0')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Almacenar pedidos realizados por los usuarios
        $pedido = Pedido::create([
            'total' => $request->total,
            'user_id' => Auth::id(),
        ]);

        $pedido_producto = collect($request->productos)->map(function ($producto) use ($pedido) {
            return [
                'pedido_id' => $pedido->id,
                'producto_id' => $producto['id'],
                'cantidad' => $producto['cantidad'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        PedidoProducto::insert($pedido_producto);

        return [
            'message' => 'Pedido realizado, espere su confirmación ...',
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedido $pedido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pedido $pedido)
    {
        //
        $pedido->estado = 1;
        $pedido->save();

        return [
            'message' => 'Pedido completado correctamente',
            'pedido' => $pedido,
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        //
    }
}
