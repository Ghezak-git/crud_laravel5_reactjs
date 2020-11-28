<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\T_karyawan;
use DB;

class KaryawanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $karyawan = DB::table('t_karyawan')
        ->select('t_karyawan.iKaryawanId','t_karyawan.vNamaKar','t_divisi.vNamaDiv','t_jabatan.vNamaJab','t_karyawan.vAlamat')
        ->join('t_divisi','t_divisi.iDivisiId','=','t_karyawan.iDivisiId')
        ->join('t_jabatan','t_jabatan.iJabatanId','=','t_karyawan.iJabatanId')
        ->get();

        return response()->json($karyawan);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function getDiv()
    {   
        $divisi = DB::table('t_divisi')->get();
        return response()->json($divisi);
    }

    public function getJab(){
        $jabatan = DB::table('t_jabatan')->get();
        return response()->json($jabatan);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $karyawan = DB::table('t_karyawan')->insert([
          'iDivisiId' => $request->get('iDivisiId'),
          'iJabatanId' => $request->get('iJabatanId'),
          'vNamaKar' => $request->get('vNamaKar'),
          'vAlamat' => $request->get('vAlamat'),
          'tCreated' => NOW()
        ]);
        // $karyawan->save();

        return response()->json('Karyawan Added Successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $karyawan = T_karyawan::where('iKaryawanId',$id)
        ->join('t_jabatan', 't_karyawan.iJabatanId' ,'=' , 't_jabatan.iJabatanId')
        ->join('t_divisi', 't_karyawan.iDivisiId' ,'=' , 't_divisi.iDivisiId')
        ->select('t_karyawan.iKaryawanId', 't_karyawan.iDivisiId' , 't_karyawan.iJabatanId' , 't_divisi.vNamaDiv' , 't_jabatan.vNamaJab' , 't_karyawan.vNamaKar', 't_karyawan.vAlamat' )->first();
        return response()->json($karyawan);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $result = DB::table('t_karyawan')
        ->where('iKaryawanId', $id)
        ->update([
            'iDivisiId' => $request->get('iDivisiId'),
            'iJabatanId' => $request->get('iJabatanId'),
            'vNamaKar' => $request->get('vNamaKar'),
            'vAlamat' => $request->get('vAlamat'),
            'tUpdate' => NOW()
        ]);

        return response()->json('Product Updated Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $karyawan = DB::table('t_karyawan')->where('iKaryawanId', $id);
        $karyawan->delete();

        return response()->json('Karyawan Deleted Successfully.');
    }
}
