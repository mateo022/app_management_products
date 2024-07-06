<?php
namespace App\shared;

class ErrorHandler
{
    protected $errors = [];

    public function addError($message)
    {
        $this->errors[] = $message;
    }

    public function getErrors()
    {
        return $this->errors;
    }

    public function hasErrors()
    {
        return !empty($this->errors);
    }

    public function clearErrors()
    {
        $this->errors = [];
    }
}
?>