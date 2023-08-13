-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14-Mar-2023 às 23:15
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `banco-crud`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `marcas`
--

CREATE TABLE `marcas` (
  `id` int(11) NOT NULL,
  `nome_marca` varchar(220) NOT NULL,
  `data_alteracao` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `marcas`
--

INSERT INTO `marcas` (`id`, `nome_marca`, `data_alteracao`) VALUES
(2, 'ACERO', '2023-03-14 22:18:15'),
(3, 'ALIPERTI', '2023-01-21 22:18:15'),
(4, 'ATE', '2023-02-07 22:18:15'),
(5, 'AUTHO MIX', '2022-05-16 22:18:15'),
(6, 'AZP', '2023-06-20 22:18:15'),
(7, 'BASTOS', '2023-07-17 22:18:15'),
(8, 'BREMBO', '2023-09-12 22:18:15'),
(9, 'GONEL', '2023-11-10 22:18:15'),
(10, 'HIPPER FREIOS', '2023-03-14 22:18:15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(220) NOT NULL,
  `id_marca` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `data_alteracao` datetime NOT NULL,
  `preco_compra` decimal(10,2) NOT NULL,
  `preco_venda` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `id_marca`, `quantidade`, `data_alteracao`, `preco_compra`, `preco_venda`) VALUES
(146, 'Tanque Reservatório Combustível VW', 2, 50, '2023-03-14 22:40:15', '450.00', '513.00'),
(149, 'Tanque Reservatório Combustível Palio Siena Punto Idea Aço 48 Litros', 2, 30, '2023-03-14 22:40:15', '480.00', '544.00'),
(150, 'Jogo 4 Mola Esportiva Ford Fusion 2006 a 2009 Dianteiro Traseiro', 3, 10, '2023-03-14 22:43:56', '1590.00', '1690.00'),
(151, 'Jogo 2 Mola GNV Honda City Fit 2009 a 2018 Traseiro Aliperti AL-456G', 3, 40, '2023-03-14 22:43:56', '314.00', '334.00'),
(152, 'Cilindro Mestre Freio Duplo Crossfox Fox Spacefox 2002 a 2014 ATE 7628', 4, 15, '2023-03-14 22:43:56', '438.00', '498.00'),
(153, 'Amortecedor Volkswagen Fox 2010 a 2018 Traseiro SP271 Monroe SP271', 4, 90, '2023-03-14 22:43:56', '121.00', '151.00'),
(154, 'Kit Embreagem Fiat Palio 1.0 1.3 96 a 2016 Valeo 228091', 4, 42, '2023-03-14 22:43:56', '200.00', '240.00'),
(155, 'Filtro Ar Gol G5 G6 Fox Voyage Saveiro 1.6 8V 2006 a 2019 MANN-', 4, 88, '2023-03-14 22:43:56', '15.00', '22.00'),
(156, 'Filtro Óleo HB20 Picanto 1.0 1.1 2011 a 2022 MANN-FILTER W6030', 4, 200, '2023-03-14 22:43:56', '22.00', '30.00'),
(157, 'Kit Pastilha Disco Freio Toyota Corolla 2003 a 2007 Dianteiro Trw Ventilado', 4, 43, '2023-03-14 22:43:56', '319.00', '359.00'),
(166, 'Coxim Motor Palio Siena Strada 96 a 2002 Dianteiro Passageiro Autho Mix', 5, 66, '2023-03-14 22:50:56', '500.00', '600.00'),
(167, 'Bucha Bandeja Balança Mobi Palio Siena Uno 2005 a 2021 Dianteiro', 5, 32, '2023-03-14 22:50:56', '900.00', '1200.00'),
(168, 'Coxim Motor Fiorino Uno 91 a 2003 Dianteiro Motorista Passageiro Autho', 5, 200, '2023-03-14 22:50:56', '260.00', '360.00'),
(172, 'Braço Oscilante Fiat Uno 86 a 2010 Dianteiro AZP', 6, 75, '2023-03-14 22:56:23', '100.00', '138.00'),
(173, 'Bandeja Balança 206 207 2000 a 2015 Dianteiro Motorista Com Pivô e', 6, 112, '2023-03-14 22:56:23', '150.00', '200.00'),
(174, 'Kit Reparo Braço Oscilante Palio Weekend Tipo Brava 97 a 2020', 6, 65, '2023-03-14 22:56:23', '800.00', '900.00'),
(175, 'Junta Cabeçote Motor Ecosport Fiesta Courier ka 1.6 99 a 2014', 7, 11, '2023-03-14 22:57:52', '200.00', '223.00'),
(176, 'Par Selo Bloco Motor 63,3mm Fiat 500 Doblo Fiorino 2001 a 2022 Bastos', 7, 400, '2023-03-14 22:57:52', '5.00', '10.00'),
(177, 'Junta Tampa Válvula Motor Citroen C4 Xsara Peugeot 206 1.6 2005 a', 7, 55, '2023-03-14 22:57:52', '200.00', '250.00'),
(178, 'Jogo Junta Motor Fiorino Palio 2000 a 2017 Parcial Sem Retentor Bastos', 7, 78, '2023-03-14 22:57:52', '129.00', '149.00'),
(179, 'Kit Embreagem Toyota Etios 1.3 1.5 2013 a 2015 Brembo 3000001340', 8, 67, '2023-03-14 22:59:11', '500.00', '527.00'),
(180, 'Reservatório Água Limpador Parabrisa Gol G6 Trend 2013 a 2016', 9, 56, '2023-03-14 23:00:10', '100.00', '137.00'),
(181, 'Reservatório Água Radiador Prisma 2007 a 2018 2 Saídas Gonel', 9, 67, '2023-03-14 23:00:10', '60.00', '70.00'),
(182, 'Reservatório Água Radiador Ford Verona 90 a 92 2 Saídas Gonel', 9, 87, '2023-03-14 23:00:10', '48.00', '58.00'),
(183, 'Reservatório Água Radiador Novo Uno 1.6 2011 a 2018 Gonel', 9, 35, '2023-03-14 23:00:10', '69.00', '79.00'),
(184, 'Reservatório Água Radiador Peugeot 207 2009 a 2015 2 Saídas', 9, 18, '2023-03-14 23:00:10', '101.00', '141.00'),
(185, 'Cubo Roda Uno Mille 1.0 90 a 2013 Traseiro Com Rolamento Hipper', 10, 120, '2023-03-14 23:08:49', '51.00', '71.00'),
(186, 'Disco Freio Chevrolet Opala 81 a 92 Dianteiro Ventilado Hipper Freios', 10, 78, '2023-03-14 23:08:49', '203.00', '233.00'),
(187, 'Par Tambor Freio Chevrolet Tracker 2020 a 2023 Traseiro Sem Cubo 5', 10, 0, '2023-03-14 23:08:49', '400.00', '422.00'),
(188, 'Kit Pastilha Disco Freio Argo Mobi Palio Uno Grand Siena 2010 a 2021', 10, 51, '2023-03-14 23:08:49', '200.00', '240.00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(220) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `nascimento` date NOT NULL,
  `senha` varchar(220) NOT NULL,
  `tipo_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `cpf`, `nascimento`, `senha`, `tipo_usuario`) VALUES
(1, '1', '123.123.123-12', '2013-03-08', '123456789', 1),
(33, '2', '111.222.333-44', '2023-03-01', '123456789', 1),
(34, '3', '111.111.111-11', '2023-02-28', '123456789', 2),
(35, '4', '222.222.222-22', '2023-03-01', '123456789', 2),
(36, '5', '333.333.333-33', '2023-03-03', '123456789', 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_marca` (`id_marca`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `produtos`
--
ALTER TABLE `produtos`
  ADD CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
