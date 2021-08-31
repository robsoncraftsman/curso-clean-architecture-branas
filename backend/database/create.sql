create schema ccca;

create table ccca.produto (
    id varchar(32) PRIMARY KEY,
    nome text,
    peso integer,
    altura integer,
    largura integer,
    profundidade integer,
    valor numeric
);

insert into ccca.produto (id, nome, peso, altura, largura, profundidade, valor) 
    values ('1', 'Câmera', 1, 20, 15, 10, 1);

insert into ccca.produto (id, nome, peso, altura, largura, profundidade, valor) 
    values ('2', 'Guitarra', 3, 100, 30, 10, 1);

insert into ccca.produto (id, nome, peso, altura, largura, profundidade, valor) 
    values ('3', 'Geladeira', 40, 200, 100, 50, 1);
