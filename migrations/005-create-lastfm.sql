CREATE TABLE `lastfm` (
    `id` int NOT NULL AUTO_INCREMENT,
    `userId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `lastfm_pk_2` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5969 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;