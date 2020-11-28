<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class T_karyawan extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

	protected $primaryKey = 'iKaryawanId';

	protected $table = "t_karyawan";


    protected $fillable = [
        'vNamaKar', 'iDivisiId', 'iJabatanId', 'vAlamat'
    ];
}
