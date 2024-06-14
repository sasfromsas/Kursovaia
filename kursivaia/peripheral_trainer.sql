-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.0
-- Время создания: Июн 15 2024 г., 00:34
-- Версия сервера: 8.0.35
-- Версия PHP: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `peripheral_trainer`
--

-- --------------------------------------------------------

--
-- Структура таблицы `tests_results`
--

CREATE TABLE `tests_results` (
  `try_id` int NOT NULL,
  `test_id` int NOT NULL,
  `user_id` int NOT NULL,
  `result` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `tests_results`
--

INSERT INTO `tests_results` (`try_id`, `test_id`, `user_id`, `result`) VALUES
(24, 1, 1, 10),
(25, 2, 1, 100),
(26, 2, 5, 100),
(27, 2, 5, 100),
(28, 2, 5, 100),
(29, 1, 5, 100),
(30, 3, 5, 100),
(31, 3, 5, 100),
(32, 3, 3, 100),
(33, 3, 3, 100),
(34, 3, 3, 100),
(35, 3, 3, 100),
(36, 3, 3, 100);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(30) NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `token`) VALUES
(1, 'IvanIvanov', 'ivan@example.com', 'securepassword123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpdmFuQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE4MDQ2NTc1LCJleHAiOjE3MTgwNTAxNzV9.R2U3iqriyKxDcjyXrVXzQ7bXyducNKW0nPiYNmTfVNk'),
(2, 'IvanIvanov', 'ivan@exaple.com', 'securepassword123', NULL),
(3, 'ESH', 'ESH@kefteme.com', 'qwerty', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJFU0hAa2VmdGVtZS5jb20iLCJpYXQiOjE3MTgxMzY0NTIsImV4cCI6MTcxODE0MDA1Mn0.uAuCqnecYkPtq_VASyY-is3DDpJKmIO0PGNZyTS5pcQ'),
(4, 'ESH2', 'ESH@kefteme2.com', 'qwerty2', NULL),
(5, 'Димка', 'Dimka@sas.com', 'ESHESHKEFTEME', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJEaW1rYUBzYXMuY29tIiwiaWF0IjoxNzE4MDQ2OTMwLCJleHAiOjE3MTgwNTA1MzB9.oEaQi2NKs3nKY4LTVfMzL8izmhp5rAk9BdnTL76OOMc'),
(6, 'sadsad', 'ksks@jisdakjisda.com', '123uhi123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJrc2tzQGppc2Rha2ppc2RhLmNvbSIsImlhdCI6MTcxNzg1OTY0NywiZXhwIjoxNzE3ODYzMjQ3fQ.wame75WiIWNOJTPpKd8V8G9BqEJrgdOVWqXGIEY_qPc');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `tests_results`
--
ALTER TABLE `tests_results`
  ADD PRIMARY KEY (`try_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `tests_results`
--
ALTER TABLE `tests_results`
  MODIFY `try_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
