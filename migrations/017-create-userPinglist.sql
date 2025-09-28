CREATE TABLE IF NOT EXISTS `userPinglist` (
    `pinglistId` int NOT NULL,
    `userId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    KEY `userPinglist_pinglist_id_fk` (`pinglistId`),
    KEY `userPinglist_user_userId_fk` (`userId`),
    CONSTRAINT `userPinglist_pinglist_id_fk` FOREIGN KEY (`pinglistId`) REFERENCES `pinglist` (`id`) ON DELETE CASCADE,
    CONSTRAINT `userPinglist_user_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;