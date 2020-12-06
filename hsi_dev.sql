/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : hsi_dev

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 03/04/2020 18:04:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `headmasterId` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `classId`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, '1000班', '0012', '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `class` VALUES (2, '1001班', '0013', '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `class` VALUES (3, '1002班', '0014', '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `class` VALUES (4, '1003班', '0015', '2020-03-25 15:17:24', '2020-03-25 15:17:24');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `courseId`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, '班主任', '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `course` VALUES (2, '语文', '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `course` VALUES (3, '数学', '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `course` VALUES (4, '英语', '2020-03-25 15:17:24', '2020-03-25 15:17:24');

-- ----------------------------
-- Table structure for courseinfo
-- ----------------------------
DROP TABLE IF EXISTS `courseinfo`;
CREATE TABLE `courseinfo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `termId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `teacherId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `termId`(`termId`) USING BTREE,
  INDEX `classId`(`classId`) USING BTREE,
  INDEX `courseId`(`courseId`) USING BTREE,
  INDEX `teacherId`(`teacherId`) USING BTREE,
  CONSTRAINT `courseinfo_ibfk_1` FOREIGN KEY (`termId`) REFERENCES `term` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `courseinfo_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `class` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `courseinfo_ibfk_3` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `courseinfo_ibfk_4` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courseinfo
-- ----------------------------
INSERT INTO `courseinfo` VALUES (1, 2, 1, 1, '0012', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (2, 2, 1, 2, '0012', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (3, 2, 1, 3, '0013', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (4, 2, 1, 4, '0014', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (5, 2, 2, 1, '0013', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (6, 2, 2, 2, '0012', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (7, 2, 2, 3, '0013', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (8, 2, 2, 4, '0014', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (9, 2, 3, 1, '0014', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (10, 2, 3, 1, '0013', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (11, 2, 3, 2, '0015', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (12, 2, 3, 3, '0016', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (13, 2, 3, 4, '0017', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (14, 2, 4, 1, '0015', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (15, 2, 4, 2, '0015', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (16, 2, 4, 3, '0016', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (17, 2, 4, 4, '0017', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `courseinfo` VALUES (18, 2, 1, 1, '0012', '2020-03-25 15:17:25', '2020-03-25 15:17:25');

-- ----------------------------
-- Table structure for family
-- ----------------------------
DROP TABLE IF EXISTS `family`;
CREATE TABLE `family`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parentId` int(11) NOT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `studentId`(`studentId`) USING BTREE,
  INDEX `parentId`(`parentId`) USING BTREE,
  CONSTRAINT `family_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `family_ibfk_2` FOREIGN KEY (`parentId`) REFERENCES `parent` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of family
-- ----------------------------
INSERT INTO `family` VALUES (1, '1001', 1, '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `family` VALUES (2, '1001', 2, '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `family` VALUES (3, '1002', 1, '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `family` VALUES (4, '1002', 2, '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `family` VALUES (5, '1004', 3, '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `family` VALUES (6, '1004', 4, '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `family` VALUES (40, '1001', 41, '2020-04-03 17:40:17', '2020-04-03 17:40:17');
INSERT INTO `family` VALUES (41, '1002', 41, '2020-04-03 17:40:17', '2020-04-03 17:40:17');

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parentId` int(11) NOT NULL,
  `teacherId` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT 2,
  `type` int(11) NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `feedbackId`(`id`) USING BTREE,
  INDEX `parentId`(`parentId`) USING BTREE,
  INDEX `teacherId`(`teacherId`) USING BTREE,
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `parent` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of feedback
-- ----------------------------
INSERT INTO `feedback` VALUES (1, '标题标题', 1, '0012', 0, 0, '内容内容内容', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `feedback` VALUES (2, '标题标题', 1, '0012', 1, 1, '内容内容内容', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `feedback` VALUES (4, '标题标题', 1, '0012', 2, 3, '内容内容内容', '2020-03-25 15:17:25', '2020-03-25 15:17:25');
INSERT INTO `feedback` VALUES (6, '测试反馈', 41, '0012', 1, 0, '反馈内同', '2020-04-03 17:41:50', '2020-04-03 17:41:50');

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `termId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `score` int(11) NOT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `gradeId`(`id`) USING BTREE,
  INDEX `studentId`(`studentId`) USING BTREE,
  INDEX `termId`(`termId`) USING BTREE,
  INDEX `courseId`(`courseId`) USING BTREE,
  INDEX `classId`(`classId`) USING BTREE,
  CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`termId`) REFERENCES `term` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `grade_ibfk_3` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `grade_ibfk_4` FOREIGN KEY (`classId`) REFERENCES `class` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 169 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES (121, '1001', 2, 2, 1, '入学测试', 93, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (122, '1001', 2, 3, 1, '入学测试', 97, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (123, '1001', 2, 4, 1, '入学测试', 95, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (124, '1001', 2, 2, 1, '期中测试', 93, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (125, '1001', 2, 3, 1, '期中测试', 69, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (126, '1001', 2, 4, 1, '期中测试', 86, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (127, '1001', 2, 2, 1, '摸底测试', 81, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (128, '1001', 2, 3, 1, '摸底测试', 64, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (129, '1001', 2, 4, 1, '摸底测试', 61, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (130, '1001', 2, 2, 1, '期末测试', 61, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (131, '1001', 2, 3, 1, '期末测试', 92, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (132, '1001', 2, 4, 1, '期末测试', 85, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (133, '1002', 2, 2, 1, '入学测试', 93, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (134, '1002', 2, 3, 1, '入学测试', 97, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (135, '1002', 2, 4, 1, '入学测试', 95, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (136, '1002', 2, 2, 1, '期中测试', 93, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (137, '1002', 2, 3, 1, '期中测试', 69, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (138, '1002', 2, 4, 1, '期中测试', 86, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (139, '1002', 2, 2, 1, '摸底测试', 81, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (140, '1002', 2, 3, 1, '摸底测试', 64, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (141, '1002', 2, 4, 1, '摸底测试', 61, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (142, '1002', 2, 2, 1, '期末测试', 61, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (143, '1002', 2, 3, 1, '期末测试', 92, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (144, '1002', 2, 4, 1, '期末测试', 85, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (145, '1003', 2, 2, 2, '入学测试', 87, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (146, '1003', 2, 3, 2, '入学测试', 94, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (147, '1003', 2, 4, 2, '入学测试', 90, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (148, '1003', 2, 2, 2, '期中测试', 100, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (149, '1003', 2, 3, 2, '期中测试', 98, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (150, '1003', 2, 4, 2, '期中测试', 86, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (151, '1003', 2, 2, 2, '摸底测试', 93, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (152, '1003', 2, 3, 2, '摸底测试', 76, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (153, '1003', 2, 4, 2, '摸底测试', 84, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (154, '1003', 2, 2, 2, '期末测试', 84, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (155, '1003', 2, 3, 2, '期末测试', 84, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (156, '1003', 2, 4, 2, '期末测试', 81, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (157, '1004', 2, 2, 2, '入学测试', 71, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (158, '1004', 2, 3, 2, '入学测试', 89, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (159, '1004', 2, 4, 2, '入学测试', 100, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (160, '1004', 2, 2, 2, '期中测试', 71, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (161, '1004', 2, 3, 2, '期中测试', 72, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (162, '1004', 2, 4, 2, '期中测试', 85, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (163, '1004', 2, 2, 2, '摸底测试', 90, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (164, '1004', 2, 3, 2, '摸底测试', 75, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (165, '1004', 2, 4, 2, '摸底测试', 65, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (166, '1004', 2, 2, 2, '期末测试', 68, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (167, '1004', 2, 3, 2, '期末测试', 73, '2020-04-03 17:46:28', '2020-04-03 17:46:28');
INSERT INTO `grade` VALUES (168, '1004', 2, 4, 2, '期末测试', 77, '2020-04-03 17:46:28', '2020-04-03 17:46:28');

-- ----------------------------
-- Table structure for parent
-- ----------------------------
DROP TABLE IF EXISTS `parent`;
CREATE TABLE `parent`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `openid` varchar(28) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avatarUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT 0,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `parentId`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of parent
-- ----------------------------
INSERT INTO `parent` VALUES (1, '陈元化', NULL, NULL, '13675296121', 0, '2020-03-25 15:17:23', '2020-04-02 18:00:01');
INSERT INTO `parent` VALUES (2, '李晓兰', NULL, NULL, '13497233421', 0, '2020-03-25 15:17:23', '2020-03-25 15:17:23');
INSERT INTO `parent` VALUES (3, '赵曾琪', NULL, NULL, '17797233421', 0, '2020-03-25 15:17:23', '2020-03-25 15:17:23');
INSERT INTO `parent` VALUES (4, '王雨燕', NULL, NULL, '18727233421', 0, '2020-03-25 15:17:23', '2020-03-25 15:17:23');
INSERT INTO `parent` VALUES (41, '陈垚樨', 'oEmYbwH9uVd4RKJk7ZZg6SzL6tTo', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epPXFBvtTVbEYaOKiaVNp8dwu9dUx3oSl2Sjpn9W7ajWB4DGXd7GNNvIBvwq24Appkk5IlcJjzyVkw/132', '13452665836', 1, '2020-04-03 17:39:42', '2020-04-03 17:40:37');

-- ----------------------------
-- Table structure for release
-- ----------------------------
DROP TABLE IF EXISTS `release`;
CREATE TABLE `release`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `classId` int(11) NOT NULL,
  `teacherId` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `courseId` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT 0,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `releaseId`(`id`) USING BTREE,
  INDEX `classId`(`classId`) USING BTREE,
  INDEX `teacherId`(`teacherId`) USING BTREE,
  INDEX `courseId`(`courseId`) USING BTREE,
  CONSTRAINT `release_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `class` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `release_ibfk_2` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `release_ibfk_3` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of release
-- ----------------------------
INSERT INTO `release` VALUES (1, '关于寒假的通知', 1, '0013', 1, 0, '关于寒假放假时间的通知，以及寒假开学的公布', '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `release` VALUES (2, '关于寒假语文作业的通知', 2, '0012', 2, 1, '关于寒假放假语文作业通知，以及家长对作业的辅导建议', '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `release` VALUES (3, '关于寒假语文作业完成度的统计', 2, '0012', 2, 2, '关于寒假语文作业完成度的统计，家长对学生作业的完成进度，通过反馈老师进行统计', '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `release` VALUES (15, '关于测试的公告', 2, '0012', 2, 0, '测试测试', '2020-03-25 18:29:03', '2020-03-25 18:29:03');
INSERT INTO `release` VALUES (16, '测试测试', 1, '0012', 1, 0, '233', '2020-04-01 00:03:09', '2020-04-01 00:03:09');
INSERT INTO `release` VALUES (17, '测试测试', 1, '0012', 2, 1, '233', '2020-04-01 00:03:42', '2020-04-01 00:03:42');
INSERT INTO `release` VALUES (18, '测试哈哈', 2, '0012', 1, 0, '发送到发', '2020-04-01 00:59:29', '2020-04-01 00:59:29');
INSERT INTO `release` VALUES (19, '测试', 1, '0012', 1, 0, '测试', '2020-04-02 17:47:18', '2020-04-02 17:47:18');
INSERT INTO `release` VALUES (20, '测试', 1, '0012', 2, 1, '测试', '2020-04-02 17:48:42', '2020-04-02 17:48:42');
INSERT INTO `release` VALUES (22, '测试作业', 1, '0012', 2, 1, '测试', '2020-04-03 17:38:37', '2020-04-03 17:38:37');

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20200228042656-create-term.js');
INSERT INTO `sequelizemeta` VALUES ('20200228180540-create-parent.js');
INSERT INTO `sequelizemeta` VALUES ('20200228181757-create-teacher.js');
INSERT INTO `sequelizemeta` VALUES ('20200228182955-create-class.js');
INSERT INTO `sequelizemeta` VALUES ('20200228183413-create-students.js');
INSERT INTO `sequelizemeta` VALUES ('20200228183756-create-course.js');
INSERT INTO `sequelizemeta` VALUES ('20200228183928-create-grade.js');
INSERT INTO `sequelizemeta` VALUES ('20200228184719-create-release.js');
INSERT INTO `sequelizemeta` VALUES ('20200228185332-create-feedback.js');
INSERT INTO `sequelizemeta` VALUES ('20200320150426-create-family.js');
INSERT INTO `sequelizemeta` VALUES ('20200320150523-create-course-info.js');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `headmasterId` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `classId` int(11) NOT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `studentId`(`id`) USING BTREE,
  INDEX `classId`(`classId`) USING BTREE,
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `class` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1001', '陈芳洁', '0012', 1, '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `student` VALUES ('1002', '陈祺然', '0012', 1, '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `student` VALUES ('1003', '李滢滢', '0013', 2, '2020-03-25 15:17:24', '2020-03-25 15:17:24');
INSERT INTO `student` VALUES ('1004', '赵芬芬', '0013', 2, '2020-03-25 15:17:24', '2020-03-25 15:17:24');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `openid` varchar(28) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'e10adc3949ba59abbe56e057f20f883e',
  `avatarUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT 0,
  `status` int(11) NULL DEFAULT 0,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `teacherId`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('0012', '问沛容', 'oEmYbwH9uVd4RKJk7ZZg6SzL6tTo', 'e10adc3949ba59abbe56e057f20f883e', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epPXFBvtTVbEYaOKiaVNp8dwu9dUx3oSl2Sjpn9W7ajWB4DGXd7GNNvIBvwq24Appkk5IlcJjzyVkw/132', '13452665836', 2, 1, '2020-03-25 15:17:23', '2020-04-03 17:36:26');
INSERT INTO `teacher` VALUES ('0013', '范甘', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, 1, 0, '2020-03-25 15:17:23', '2020-03-25 15:17:23');
INSERT INTO `teacher` VALUES ('0014', '白文翰', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, 1, 0, '2020-03-25 15:17:23', '2020-03-25 15:17:23');
INSERT INTO `teacher` VALUES ('0015', '喻晗昱', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, 2, 0, '2020-03-25 15:17:23', '2020-03-25 15:17:23');
INSERT INTO `teacher` VALUES ('0016', '赖忆雪', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, 1, 0, '2020-03-25 15:17:23', '2020-03-25 15:17:23');
INSERT INTO `teacher` VALUES ('0017', '国康安', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, 0, '2020-03-25 15:17:23', '2020-03-25 15:17:23');
INSERT INTO `teacher` VALUES ('admin', 'admin', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, -1, 0, '2020-03-25 15:17:23', '2020-03-25 15:17:23');

-- ----------------------------
-- Table structure for term
-- ----------------------------
DROP TABLE IF EXISTS `term`;
CREATE TABLE `term`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` int(11) NULL DEFAULT 0,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `termId`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of term
-- ----------------------------
INSERT INTO `term` VALUES (1, '2019-2020上学期', NULL, '2020-03-25 15:17:23', '2020-03-25 15:17:23');
INSERT INTO `term` VALUES (2, '2019-2020下学期', 1, '2020-03-25 15:17:23', '2020-03-25 15:17:23');

SET FOREIGN_KEY_CHECKS = 1;
