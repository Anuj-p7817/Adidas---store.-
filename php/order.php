<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
        exit;
    }

    // Insert order
    $customer_name = $conn->real_escape_string($data['customer_name']);
    $customer_email = $conn->real_escape_string($data['customer_email']);
    $address = $conn->real_escape_string($data['address']);
    $city = $conn->real_escape_string($data['city']);
    $zip_code = $conn->real_escape_string($data['zip_code']);
    $order_date = date('Y-m-d H:i:s');
    $status = 'pending';

    $order_query = "INSERT INTO orders (customer_name, customer_email, address, city, zip_code, order_date, status) 
                    VALUES ('$customer_name', '$customer_email', '$address', '$city', '$zip_code', '$order_date', '$status')";

    if ($conn->query($order_query)) {
        $order_id = $conn->insert_id;

        // Insert order items
        foreach ($data['items'] as $item) {
            $product_id = intval($item['id']);
            $quantity = intval($item['quantity']);
            $size = isset($item['size']) ? $conn->real_escape_string($item['size']) : '';
            $color = isset($item['color']) ? $conn->real_escape_string($item['color']) : '';

            // Get product price
            $price_query = "SELECT price FROM products WHERE id = $product_id";
            $price_result = $conn->query($price_query);
            $price_row = $price_result->fetch_assoc();
            $price = $price_row['price'];

            $item_query = "INSERT INTO order_items (order_id, product_id, quantity, price, size, color) 
                          VALUES ($order_id, $product_id, $quantity, $price, '$size', '$color')";
            $conn->query($item_query);
        }

        echo json_encode(['success' => true, 'order_id' => $order_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Order creation failed']);
    }
}

$conn->close();
?>