CREATE TABLE `songUserHistory` (
    `id` int NOT NULL AUTO_INCREMENT,
    `songId` int NOT NULL,
    `userId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `songUserHistory_song_id_fk` (`songId`),
    CONSTRAINT `songUserHistory_song_id_fk` FOREIGN KEY (`songId`) REFERENCES `song` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=149016 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;