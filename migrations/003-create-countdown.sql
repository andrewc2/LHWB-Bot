CREATE TABLE `countdown` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
    `startDate` datetime NOT NULL,
    `endDate` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;