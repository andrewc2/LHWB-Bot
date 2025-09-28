CREATE TABLE IF NOT EXISTS `version` (
    `id` int NOT NULL AUTO_INCREMENT,
    `versionNumber` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
    `releaseNotes` varchar(5000) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;