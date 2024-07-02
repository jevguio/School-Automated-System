<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Departments;
use App\Models\User;
use App\Models\Comment;
class Post extends Model
{
    use HasFactory;
    public function course()
    {
        return $this->belongsTo(Departments::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
