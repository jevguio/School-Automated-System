<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('personal_data', function (Blueprint $table) {
            $table->id(); 
            $table->string('school_id')->unique();
            $table->unsignedBigInteger('department_id'); 
            $table->string('fname');
            $table->string('mname');
            $table->string('lname');
            $table->string('current_address');
            $table->string('birth_address');
            $table->string('contact_no');
            $table->string('email_address');
            $table->date('birthday');
            $table->enum('type', ['old', 'new', 'transferee', 'returnee', 'teacher', 'dean']);
            $table->string('gender');
            $table->string('religion');
            $table->enum('civil_status', ['married', 'widow', 'single']); 
            $table->timestamps();

            
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
       
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('personal_data', function (Blueprint $table) {
        // Drop the foreign key constraint
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('personal_data');
    }
};
