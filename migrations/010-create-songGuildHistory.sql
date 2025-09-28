CREATE TABLE `songGuildHistory` (
    `id` int NOT NULL AUTO_INCREMENT,
    `songId` int NOT NULL,
    `guildId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `queuedBy` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `SongGuildHistory_Song_Id_fk` (`songId`),
    CONSTRAINT `SongGuildHistory_Song_Id_fk` FOREIGN KEY (`songId`) REFERENCES `song` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=961828 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;