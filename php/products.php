<?php
include 'config.php';

// GET request
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    $price = isset($_GET['price']) ? $_GET['price'] : null;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 100;

    $query = "SELECT * FROM products WHERE 1=1";

    if ($id) {
        $query .= " AND id = $id";
    }

    if ($category) {
        $category = $conn->real_escape_string($category);
        $query .= " AND category = '$category'";
    }

    if ($price) {
        if ($price == '0-50') {
            $query .= " AND price BETWEEN 0 AND 50";
        } elseif ($price == '50-100') {
            $query .= " AND price BETWEEN 50 AND 100";
        } elseif ($price == '100-200') {
            $query .= " AND price BETWEEN 100 AND 200";
        } elseif ($price == '200+') {
            $query .= " AND price >= 200";
        }
    }

    $query .= " LIMIT $limit";

    $result = $conn->query($query);

    if (!$result) {
        echo json_encode(['error' => 'Query failed']);
        exit;
    }

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    if ($id && count($products) > 0) {
        echo json_encode($products[0]);
    } else {
        echo json_encode($products);
    }
}

$conn->close();
?>