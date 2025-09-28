CREATE TABLE `songName` (
    `id` int NOT NULL AUTO_INCREMENT,
    `songId` int NOT NULL,
    `name` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `songName_pk` (`name`),
    KEY `SongName_Song_Id_fk` (`songId`),
    CONSTRAINT `SongName_Song_Id_fk` FOREIGN KEY (`songId`) REFERENCES `song` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1341 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;