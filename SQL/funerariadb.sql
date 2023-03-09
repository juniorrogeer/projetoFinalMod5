-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Tempo de geração: 09-Mar-2023 às 00:06
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
-- Banco de dados: `funerariadb`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nome` varchar(99) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `idade` int(11) NOT NULL,
  `telefone` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `dependentes`
--

CREATE TABLE `dependentes` (
  `id` int(11) NOT NULL,
  `nome_dependente` varchar(7) DEFAULT NULL,
  `cpf_dependente` bigint(10) DEFAULT NULL,
  `grau_de_parentesco` varchar(8) DEFAULT NULL,
  `nome_titular` varchar(7) DEFAULT NULL,
  `cpf_titular` bigint(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `dependentes`
--

INSERT INTO `dependentes` (`id`, `nome_dependente`, `cpf_dependente`, `grau_de_parentesco`, `nome_titular`, `cpf_titular`) VALUES
(1, 'Anthony', 1542184512, 'filho', 'Antonio', 4154125410),
(2, 'Caique', 5415421552, 'pai', 'Mariana', 5251541542),
(3, 'Alan', 5421854154, 'sobrinho', 'Rafael', 5287412841),
(4, 'Yuri', 54254514, 'filho', 'Valeria', 1284154124),
(6, 'Susu', 412574584, 'filha', 'Samira', 8424984269),
(7, 'Ulisses', 12345678910, 'primo', 'Marcos ', 98765432110);

-- --------------------------------------------------------

--
-- Estrutura da tabela `locacoes`
--

CREATE TABLE `locacoes` (
  `id` int(11) NOT NULL,
  `cnpj` varchar(30) NOT NULL,
  `nome_locacao` varchar(100) NOT NULL,
  `endereco` varchar(120) NOT NULL,
  `localidade` varchar(100) NOT NULL,
  `capacidade` int(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `locacoes`
--

INSERT INTO `locacoes` (`id`, `cnpj`, `nome_locacao`, `endereco`, `localidade`, `capacidade`) VALUES
(4, '69.425.040/0001-81', 'Campo Grande', 'Av. Cesário de Melo, 435', 'Campo Grande', 50000),
(5, '75.122.248/0001-24', 'Guaratiba', 'Estrada da Ilha, 1575', 'Guaratiba', 40000),
(6, '63.805.471/0001-97', 'Inhaúma', 'Av. Pastor Martin Luther King Jr., 155', 'Inhaúma', 29000),
(7, '39.261.054/0001-46', 'Irajá', 'Prc. Nossa Senhora da Apresentação, 198', 'Irajá', 60000),
(8, '07.685.686/0001-40', 'Jardim da Saudade', 'Av. Carlos Pontes, 500', 'Sulacap', 60000),
(9, '47.162.147/0001-41', 'Memorial do Carmo', 'Rua Monsenhor Manoel Gomes, 287', 'Caju', 100000),
(10, '53.589.467/0001-85', 'Murundu', 'Rua Murundu 1140', 'Realengo', 70000),
(11, '92.587.489/0001-68', 'Paquetá', 'Rua Manuel de Macedo, 137', 'Paquetá', 25000),
(12, '47.507.611/0001-94', 'São João Batista', 'Rua Gen. Polidoro, 22', 'Botafogo', 90000),
(13, '44.806.864/0001-70', 'Cacuia', 'Estr. da Cacuia, 46', 'Cacuia', 20000);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `id` int(11) NOT NULL,
  `nome` varchar(99) NOT NULL,
  `qtd` int(11) NOT NULL,
  `fornecedor` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`id`, `nome`, `qtd`, `fornecedor`) VALUES
(4, 'Urna  em carvalho p/ cinzas', 15, 'Legend-Store'),
(5, 'Foguete p/ Lançamento Orbital', 3, 'Senac'),
(6, 'Urna em Aço p/ cinzas', 30, 'Wartigos Funerários'),
(7, 'Ulisses Silva Barbosa', 0, 'undefined'),
(8, 'Bruno Silva', 0, 'undefined'),
(9, 'Bruno Silva', 0, 'undefined');

-- --------------------------------------------------------

--
-- Estrutura da tabela `servico`
--

CREATE TABLE `servico` (
  `id` int(11) NOT NULL,
  `nome` varchar(99) NOT NULL,
  `preco` varchar(99) NOT NULL,
  `embrulho` varchar(99) NOT NULL,
  `locacao` varchar(99) NOT NULL,
  `descricao` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `servico`
--

INSERT INTO `servico` (`id`, `nome`, `preco`, `embrulho`, `locacao`, `descricao`) VALUES
(1, 'Disposição Indigente', 'Um pão e um suco', 'Saco plástico', 'Esgoto a céu aberto', 'Para quem não vale nem o enterro.'),
(2, 'Disposição Duvidosa', 'O seu vale-refeição', 'Caixa de papelão', 'Matagal em beira de estrada', 'Para quem quer se decepcionar até depois de morto.'),
(3, 'Disposição Baratinha', 'Uma pinga e um boquete', 'Barril de alumínio', 'Lixão de Santa Cruz', 'Quase cabe o corpo inteiro se empurrar bem.'),
(4, 'Disposição Insalubre', 'Um álbum de figurinhas da Copa de 98', 'Banheiro químico interditado', 'Praça suburbana da Zona Oeste do Rio de Janeiro', 'Para ser sincero, o cheiro não ia ter diferença de qualquer outro jeito.'),
(5, 'Disposição Falida', 'Mil reais em moedas de um centavo', 'Caixa de MDF', 'Armazém das Lojas Americanas', 'Para aqueles que já foram alguma coisa, até que não.'),
(6, 'Sepultamento Básico', 'Cinco mil reais', 'Caixão de Pinus', 'Cemitério da Zona Oeste do Rio de Janeiro', 'Básico que nem você'),
(7, 'Sepultamento Prepotente', 'Dez mil reais, só que em dólar', 'Caixão de carvalho', 'Cemitério na Zona Norte do Rio de Janeiro', 'Pague o dobro pelo mesmíssimo enterro e ganhe um champanhe.'),
(8, 'Sepultamento Oficial', 'Cem mil reais em dinheiro público desviado', 'Uma estátua sua de três metros de altura, em ouro', 'Cemitério na Zona Sul do Rio de Janeiro', 'Você morre, a sua presença não.'),
(9, 'Sepultamento Orbital', 'Acesso aos sistemas de monitoramento espacial da NASA', 'Uma cápsula espacial', 'Estratosfera', 'Tape a vista do sol dos seus inimigos e passe a eternidade acima de todos só porque você pode.'),
(10, 'Cremação para Compostagem', 'A sua imagem', 'Literalmente um saco de merda', 'Horta', 'Seja tão merda em morte quanto foi em vida.'),
(11, 'Cremação Microondas', 'Um baseado de qualidade duvidosa', 'Pneu queimado', 'Comunidade', 'Para os X9 do rolê. Não chega necessariamente a cremar, mas queima bastante.'),
(12, 'Cremação Precária', 'Uma fita cassete de Xuxa e os Duendes', 'Garrafa PET padrão', 'Varanda', 'Dá pra fazer muita coisa com garrafa PET, até urna.'),
(13, 'Cremação de Pobre', 'O número da sua irmã', 'Uma tupperware com tampa colorida', 'Cozinha', 'Fica até discreto na cozinha. Não usar como tempero.'),
(14, 'Cremação Razoável', 'Um emprego pro meu sobrinho vagabundo', 'Urna de Cerâmica', 'Sala de estar', 'Exatamente o que se espera, nada mais, nada menos.'),
(15, 'Cremação Frufru', 'Quinhentos reais em cupons promocionais', 'Velas aromática', 'Corredor', 'Para deixar o ambiente dos seus entes queridos aromatizados e agradáveis, pelo menos até as velas acabarem, e o que resta de você junto.'),
(16, 'Cremação do amor', 'Seu cartão de crédito', 'Um plug anal', 'Anus', 'Para estar intimamente com sua amada mesmo após a morte'),
(17, 'Cremação festiva', 'Um parquinho com balanço e escorrega', 'Uma Piñata', 'Quintal', 'Festa infantil, crianças brincando, aí aparece um bicho estufado pros seus filhos baterem pra descobrir o que tem dentro, e quando estouram, PÁ, você espalhado por toda a festa. Que jeito divertido de dizer que o papai morreu.'),
(18, 'Cremação Gamer', 'Uma RTX 3600 TI', 'Urna com LED RGB', 'Escritório', 'Para completar o setup gamer. Computador, óculos VR, Playstation 5 e os restos mortais do pai.'),
(19, 'Cremação Burguesa', 'Uma viagem pela Europa com tudo incluso', 'Urna de ouro ornamentada', 'Saguão', 'Seja a decoração mais cara da sua propriedade e compita de vez a atenção da sua família com aquele quadro horroroso do Romero Britto no salão principal.'),
(20, 'Cremação Magnânima', 'Um imóvel quitado no Leblon', 'Um retrato neoclássico seu, pintado com tintas com suas cinzas na composição', 'Escadaria', 'Transcenda o plano carnal e se torne uma obra de arte, eterna e deslumbrante, digna da reverência de todos que a vislumbrarem.'),
(21, 'Criogenia tropical', 'três casquinhas de sorvete', 'A geladeira da funerária', 'Funerária', 'Não tem dinheiro para uma criogenia padrão? Venha passar a eternidade na nossa geladeira então! A gente arruma um espaço entre os refrigerantes e as panelas para requentar.'),
(22, 'Criogenia Padrão', 'Um carro 2023 zero quilômetro', 'Uma câmara de criogenia', 'Galpão', 'Alimente as esperanças da sua família de que você não está morto de verdade e que só está esperando acordar num futuro onde já descobriram como estender seu tempo de vida.'),
(23, 'Criogenia Heroica', 'Um gibi da edição original do Capitão América número 1 de 1941', 'Um iceberg', 'Ártico', 'Você não quer simplesmente ser criogenado, você quer ser criogenado como um super-herói da Marvel.'),
(24, 'Criogenia Exagerada', 'Os direitos de imagem do personagem Mr. Freeze dos quadrinhos do Batman', 'Uma estação criogênica só para você, com monitoria 24h e trocas diárias de tanques de nitrogênio', 'Instituto de pesquisa', 'Fique confortavelmente congelado enquanto o resto do planeta aguenta o aquecimento global. Mas não se preocupe, até você acordar, eles vão ter resolvido isso... Né?'),
(25, 'Criogenia Galática', 'Ações majoritárias da SpaceX', 'Uma célula de animação suspensa em uma arca interestelar', 'Espaço sideral', 'A Terra não é suficiente para você. Passe os próximos séculos nos confins do espaço sideral e seja a prova de vida humana inteligente a ser encontrada por uma espécie alienígena milhares de anos-luz distante da Terra.'),
(26, 'Mumificação Brasileira', 'Uma cópia autografada do filme A Múmia de 1999', 'Papel higiênico', 'Parque do bairro', 'Acabe com o estoque de papel higiênico do supermercado aqui do lado e seja uma autêntica múmia brasileira!'),
(27, 'Mumificação Autêntica', 'Cem escaravelhos vivos', 'Um sarcófago', 'Museu Nacional', 'Seja devidamente embalsamado, enrole-se em esparadrapos e habite um adornado sarcófago que certamente não foi roubado do Museu Nacional.'),
(28, 'Mumificação Egípcia', 'Títulos de 96 hectares de terra egípcia', 'Uma pirâmide', 'Cairo, Egito', 'Você não se contenta só com os esparadrapos e o sarcófago. Você quer o funeral de um verdadeiro faraó, com tudo que isso tem direito.'),
(29, 'Ancoragem Costeira', 'Um veleiro', 'Âncora de ferro', 'Baía de Guanabara', 'Ir para debaixo da terra quando morrer é comum demais para você, então ao invés de digerido por insetos, você prefere ser comido por peixes.'),
(30, 'Ancoragem Oceânica', 'Uma roupa profissional de mergulho', 'Uma âncora de aço inoxidável', 'Oceano Atlântico', 'Se é para ser ancorado, que seja em águas internacionais, com a melhor vista para um dos belíssimos corais oceânicos do Atlântico.'),
(31, 'Ancoragem Abissal', 'Vinte mil reais submarinos', 'Âncora de Obsidiana', 'Fossas Abissais do Pacífico', 'Você é um aventureiro! Morrer no fundo do mar para você é realmente no fundo! Mais precisamente, no lugar mais profundo de toda a Terra. Que audacioso!'),
(32, 'Digitalização Virtual', 'Uma temporada nova de Black Mirror', 'Dados virtuais', 'Um servidor', 'Faça o upload da sua consciência e viva eternamente numa simulação virtual em um dos nossos servidores. Isso aqui que é Metaverso!'),
(33, 'Digitalização Robótica', 'Uma impressora 3D de resina', 'Um robô móvel de 1m com display em LED', 'Armário dos brinquedos', 'Continue a viver no mundo físico depois de morto como um robô de um metro com display de LED com seis expressões emotivas e funcionalidades simples como andar, girar e falar sim, não, talvez, aqui, ali, lá, porquê, como, quando, onde e números de 0 a 9.'),
(34, 'Digitalização Androide', 'Dez Apple Mac Pro de última geração', 'Um androide com sua aparência com pele, olhos e cabelo sintéticos', 'Onde você quiser', 'Continue a viver depois de morto como um androide, mantendo quase todas as suas atividades originais, salvo comer, beber, dormir e transar, nem sentir fome, sede, calor, frio, gostos ou cheiros.'),
(35, 'Hidrólise Doméstica', 'Dois pacotes de Omo Multiação', 'Detergente de cozinha', 'Tanque da área de serviço', 'Não vai dissolver o corpo, mas deixa ele tão ensaboadinho! Faz até bolhas.'),
(36, 'Hidrólise Profissional', 'Quarenta mil reais', 'Tanque de água e potássio a 160 graus', 'Estação de tratamento de materiais', 'Você se preocupa com o meio ambiente, quer deixar a vida sem causar prejuízo para as gerações futuras. Uma pena, isso aqui gasta tanta energia quanto a cremação, mas olha só, sem fumaça!'),
(37, 'Funeral Viking', 'Um hidromel artesanal superfaturado', 'Canoa', 'Mar', 'Para todo bom tupiniviking. Seja em morte o nórdico que não foi em vida (É sempre bom reiterar que Curitiba não fica na Noruega, e por mais loiro e branquelo que você seja, continua não sendo europeu)!'),
(38, 'Crucificação', 'Uma hóstia e e uma taça de vinho', 'Uma cruz', 'Morro', 'Aproveite a promoção da Páscoa e venha fazer cosplay de Jesus Cristo! Obs: Não garantimos ressuscitação depois de três dias.');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `dependentes`
--
ALTER TABLE `dependentes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `locacoes`
--
ALTER TABLE `locacoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `servico`
--
ALTER TABLE `servico`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `dependentes`
--
ALTER TABLE `dependentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `locacoes`
--
ALTER TABLE `locacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
