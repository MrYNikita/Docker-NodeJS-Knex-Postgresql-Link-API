create table links (
    id serial primary key,
    link varchar (255) unique not null 
);

insert into links (link) values ('/Hello/World');