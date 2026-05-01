<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

// Save cart to database (optional)
// GET cart items with details
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $cart_items = json_decode($_GET['items'], true);
    
    $cart_details = [];
    foreach ($cart_items as $item) {
        $product_id = intval($item['id']);
        $query = "SELECT * FROM products WHERE id = $product_id";
        $result = $conn->query($query);
        
        if ($result && $row = $result->fetch_assoc()) {
            $cart_details[] = [
                'product' => $row,
                'quantity' => $item['quantity'],
                'size' => $item['size'] ?? null,
                'color' => $item['color'] ?? null
            ];
        }
    }
    
    echo json_encode($cart_details);
}

$conn->close();
?>