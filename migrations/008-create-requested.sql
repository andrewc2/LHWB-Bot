CREATE TABLE `requested` (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
    `request` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
    `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;