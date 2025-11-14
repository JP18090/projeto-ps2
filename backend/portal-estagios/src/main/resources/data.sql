-- 1) Usuários (colunas explicitadas para evitar ordem errada)
-- Senhas criptografadas com BCrypt:
-- admin123 = $2a$10$cs22ZB5okGME54t2dzqmN.V9dx9BtyWF2Upl.6WKf.6jLlWlA3h9O
-- empresa123 = $2a$10$BTv8rr9vFji1rVY9C.cYMOJZmtEnsgP6YCuR9phVg1TCUcxId1zBe
-- aluno123 = $2a$10$APvw893Bk3jaIrbV8qgzMeaMTk5ZSV.qWPGpvCMT.yoVeGqBLojci
-- AlunoMack = $2a$10$4C9VmR0ohb2gIIAE9i2edOMYOeNlZqXMDuOkGf8RqOQxYbBrsl7Ky
INSERT INTO usuario (id, nome, email, senha, perfil) VALUES
  (1, 'Admin Master', 'admin@portal.com', '$2a$10$cs22ZB5okGME54t2dzqmN.V9dx9BtyWF2Upl.6WKf.6jLlWlA3h9O', 'ADMIN'),
  (2, 'Tech Solutions LTDA', 'contato@techsolutions.com', '$2a$10$BTv8rr9vFji1rVY9C.cYMOJZmtEnsgP6YCuR9phVg1TCUcxId1zBe', 'EMPRESA'),
  (3, 'CodeWave Ltda', 'hr@codewave.com', '$2a$10$BTv8rr9vFji1rVY9C.cYMOJZmtEnsgP6YCuR9phVg1TCUcxId1zBe', 'EMPRESA'),
  (4, 'Ana Souza', 'ana.souza@email.com', '$2a$10$APvw893Bk3jaIrbV8qgzMeaMTk5ZSV.qWPGpvCMT.yoVeGqBLojci', 'ESTUDANTE'),
  (5, 'João Lima', 'joao.lima@email.com', '$2a$10$APvw893Bk3jaIrbV8qgzMeaMTk5ZSV.qWPGpvCMT.yoVeGqBLojci', 'ESTUDANTE'),
  (6, 'José Pedro', 'pedrotkatchuk@gmail.com', '$2a$10$4C9VmR0ohb2gIIAE9i2edOMYOeNlZqXMDuOkGf8RqOQxYbBrsl7Ky', 'ESTUDANTE');

-- 2) Áreas de interesse (note: tabela criada pelo Hibernate é `area_interesse`)
INSERT INTO area_interesse (id, nome) VALUES
  (1, 'Desenvolvimento de Software'),
  (2, 'Design UX/UI'),
  (3, 'Marketing Digital'),
  (4, 'Engenharia Elétrica'),
  (5, 'Administração');

-- 3) Empresas (vinculadas a usuário_id)
INSERT INTO empresa (id, usuario_id, nome, cnpj, email, telefone, endereco) VALUES
  (1, 2, 'Tech Solutions LTDA', '12.345.678/0001-90', 'contato@techsolutions.com', '(11) 99999-0000', 'Rua A, 123'),
  (2, 3, 'CodeWave Ltda', '98.765.432/0001-11', 'hr@codewave.com', '(11) 98888-1111', 'Av B, 456');

-- 4) Estudantes (vinculados a usuário_id)
INSERT INTO estudante (id, usuario_id, nome, cpf, curso, email, telefone) VALUES
  (1, 4, 'Ana Souza', '123.456.789-00', 'Ciência da Computação', 'ana.souza@email.com', '(11) 97777-2222'),
  (2, 5, 'João Lima', '987.654.321-00', 'Engenharia de Software', 'joao.lima@email.com', '(11) 96666-3333'),
  (3, 6, 'José Pedro', '111.222.333-44', 'Sistemas de Informação', 'pedrotkatchuk@gmail.com', '(11) 95555-4444');

-- 5) Vagas (referenciando empresa_id e area_id)
INSERT INTO vaga (id, titulo, descricao, localizacao, modalidade, carga_horaria, requisitos, encerrada, empresa_id, area_id) VALUES
  (1, 'Desenvolvedor Java Jr', 'Vaga para desenvolvedor Java', 'São Paulo', 'Presencial', '40h', 'Java, Spring Boot', FALSE, 1, 1),
  (2, 'Estágio em UX/UI', 'Auxiliar no design de interfaces', 'Remoto', 'Remoto', '20h', 'Figma, noções de UX', FALSE, 2, 2);

-- Vagas públicas adicionais
INSERT INTO vaga (id, titulo, descricao, localizacao, modalidade, carga_horaria, requisitos, encerrada, empresa_id, area_id) VALUES
  (3, 'Estágio em Marketing Digital', 'Auxílio em campanhas e redes sociais', 'Remoto', 'Remoto', '20h', 'Noções de marketing, redes sociais', FALSE, 1, 3),
  (4, 'Estágio em Engenharia Elétrica', 'Suporte em projetos elétricos', 'Campinas', 'Presencial', '30h', 'Circuitos, elétrica básica', FALSE, 2, 4),
  (5, 'Auxiliar Administrativo', 'Rotinas administrativas e apoio', 'São Paulo', 'Presencial', '40h', 'Pacote Office, organização', FALSE, 1, 5),
  (6, 'Desenvolvedor Frontend React', 'Desenvolvimento de interfaces web modernas com React', 'São Paulo', 'Híbrido', '30h', 'React, JavaScript, CSS, Git', FALSE, 1, 1),
  (7, 'Designer Gráfico', 'Criação de materiais visuais e identidade visual', 'Remoto', 'Remoto', '20h', 'Photoshop, Illustrator, criatividade', FALSE, 2, 2),
  (8, 'Analista de Redes Sociais', 'Gestão e análise de métricas em redes sociais', 'São Paulo', 'Híbrido', '25h', 'Instagram, Facebook, Analytics', FALSE, 1, 3),
  (9, 'Desenvolvedor Python', 'Desenvolvimento backend com Python e Django', 'Remoto', 'Remoto', '30h', 'Python, Django, SQL', FALSE, 2, 1),
  (10, 'Assistente de RH', 'Apoio em processos de recrutamento e seleção', 'Campinas', 'Presencial', '40h', 'Comunicação, organização, Excel', FALSE, 1, 5);

-- 6) Relacionamentos empresa ↔ área (tabela criada pelo Hibernate: empresa_areas_atuacao)
INSERT INTO empresa_areas_atuacao (areas_atuacao_id, empresa_id) VALUES
  (1, 1),
  (2, 2);

-- 7) Relacionamentos estudante ↔ interesses (tabela: estudante_interesses)
INSERT INTO estudante_interesses (estudante_id, interesses_id) VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (1, 2),
  (3, 5);

-- 8) Inscrições (especificando id para manter previsibilidade)
INSERT INTO inscricao (id, estudante_id, vaga_id) VALUES
  (1, 1, 1),
  (2, 2, 1),
  (3, 3, 2);

-- 9) Reset auto-increment para permitir novos inserts via API
-- H2 usa auto-increment com IDENTITY, então resetamos o contador diretamente
ALTER TABLE usuario ALTER COLUMN id RESTART WITH 100;
ALTER TABLE empresa ALTER COLUMN id RESTART WITH 100;
ALTER TABLE estudante ALTER COLUMN id RESTART WITH 100;
ALTER TABLE vaga ALTER COLUMN id RESTART WITH 100;
ALTER TABLE inscricao ALTER COLUMN id RESTART WITH 100;
ALTER TABLE area_interesse ALTER COLUMN id RESTART WITH 100;
