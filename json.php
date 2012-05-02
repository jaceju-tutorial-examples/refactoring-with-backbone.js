<?php

$data = include('data.php');

$id = isset($_GET['id']) ? (int) $_GET['id'] : null;

$result = isset($data[$id]) ? $data[$id] : $data;

header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);