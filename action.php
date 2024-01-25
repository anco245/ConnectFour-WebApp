<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if "firstNum" exists in the $_POST array
    if (isset($_POST["firstNum"])) {
        $firstNum = $_POST["firstNum"];
        echo "First Number: $firstNum";
    } else {
        echo "Error: 'firstNum' not found in form data.";
    }
}
?>
