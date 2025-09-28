CREATE TABLE `userAward` (
    `id` int NOT NULL AUTO_INCREMENT,
    `userId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `guildId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
    `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;