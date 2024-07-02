<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        return Booking::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'date' => 'required|date',
        ]);

        return Booking::create($request->all());
    }

    public function update(Request $request, Booking $booking)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'date' => 'required|date',
        ]);

        $booking->update($request->all());

        return $booking;
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();

        return response()->noContent();
    }
}
