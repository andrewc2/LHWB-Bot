CREATE TABLE `trustedRole` (
    `id` int NOT NULL AUTO_INCREMENT,
    `guildId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `roleId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;