CREATE TABLE `media` (
    `id` int NOT NULL AUTO_INCREMENT,
    `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `url` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;