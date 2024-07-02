<?php 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fk_id')->nullable();//fk for account
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('profile_path');
            $table->enum('type', ['student','teacher', 'dean', 'admin']);
            
            $table->foreign('fk_id')->references('id')->on('personal_data')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
        Schema::table('users', function (Blueprint $table) {
        // Drop the foreign key constraint
            $table->dropForeign(['fk_id']);
        });
    }
}
