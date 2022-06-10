create database bascula;
drop database bascula;
use bascula;

create table bascula.persona(
	id_persona int auto_increment,
    cedula varchar(20) not null,
    nombres varchar(100) not null,
    apellidos varchar(100) not null,
    fecha_nacimiento date null,
    sexo varchar(20) null,
    estado_civil varchar(15) null,
    ciudadania varchar(50) null,
    instruccion varchar(100) null,
    lugar_expedicion varchar(100) null,
    fecha_expedicion date null,
    fecha_expiracion date null,
    activo int,
    primary key(id_persona,cedula)
);

create table bascula.credencial(
id_credencial int auto_increment,
id_persona int not null,
user varchar(20) not null,
password_user varchar(200),
fecha_creacion datetime default CURRENT_TIMESTAMP,
estado int,
primary key(id_credencial)
);

create table bascula.login(
id_login int auto_increment,
id_persona int not null,
fecha_inicio datetime default CURRENT_TIMESTAMP,
fecha_fin datetime default CURRENT_TIMESTAMP,
primary key(id_login)
);

create table bascula.transportista(
id_transportista int auto_increment,
vencimiento_licencia date null,
activo int not null,
id_persona int not null,
primary key(id_transportista)
);

create table bascula.proveedor(
id_proveedor int auto_increment,
activo int not null,
id_persona int not null,
primary key(id_proveedor)
);

create table bascula.tipovehiculo(
id_tipo_vehiculo int auto_increment,
nombre varchar(100),
primary key(id_tipo_vehiculo)
);

create table bascula.vehiculo(
id_vehiculo int auto_increment,
placa varchar(20) not null,
vencimiento_matricula date null,
activo int not null,
id_transportista int not null,
id_tipo_vehiculo int not null,
primary key(id_vehiculo)
); 

create table bascula.linea(
id_linea int auto_increment,
nombre varchar(100) not null,
primary key(id_linea)
);

create table bascula.proceso(
id_proceso int auto_increment,
nombre varchar(100) not null,
id_linea int not null,
primary key(id_proceso)
);

create table bascula.material(
id_material int auto_increment,
nombre varchar(100) not null,
id_proceso int not null,
primary key(id_material)
);

create table bascula.tipomaterial(
id_tipo_material int auto_increment,
nombre varchar(100) not null,
id_material int not null,
primary key(id_tipo_material)
);

create table bascula.peso(
id_peso int auto_increment,
tipo_peso varchar(20) not null,
forma_recepcion varchar(50) not null,
peso int not null,
peso_contaminacion decimal(6,2) null,
porcentaje_contaminacion decimal(5,2) null,
peso_total decimal(8,2) null,
fecha_hora datetime default current_timestamp,
id_ticket int not null,
id_tipo_material int null,
primary key(id_peso)
);

create table bascula.empresa(
id_empresa int auto_increment,
razon_social varchar(100) not null,
ruc varchar(100) not null,
representante_legal varchar(100) null,
actividad_principal varchar(200) null,
url_logo varchar(100) null,
primary key(id_empresa)
);

create table bascula.ticket(
id_ticket int auto_increment,
fecha_ticket datetime default current_timestamp,
observaciones varchar(200) null,
procesado int not null,
fecha_procesado datetime null,
id_vehiculo int not null,
id_proveedor int not null,
id_empresa int not null,
primary key(id_ticket)
);

create table bascula.tipocontaminacion(
id_tipo_contaminacion int auto_increment,
nombre varchar(100) not null,
primary key(id_tipo_contaminacion)
);

 create table bascula.contaminacion(
 id_contaminacion int auto_increment,
 id_tipo_contaminacion int not null,
 id_peso int not null,
 primary key(id_contaminacion)
 );
 
 create table bascula.formarecepcion(
 id_forma_recepcion int auto_increment,
 nombre varchar(100) not null,
 primary key(id_forma_recepcion)
 );

alter table bascula.credencial add FOREIGN KEY(id_persona) REFERENCES bascula.persona(id_persona) on delete cascade;
alter table bascula.login add FOREIGN KEY(id_persona) REFERENCES bascula.persona(id_persona) on delete cascade;
alter table bascula.proveedor add FOREIGN KEY(id_persona) REFERENCES bascula.persona(id_persona)on delete cascade;
alter table bascula.transportista add FOREIGN KEY(id_persona) REFERENCES bascula.persona(id_persona) on delete cascade;
alter table bascula.vehiculo add FOREIGN KEY(id_transportista) REFERENCES bascula.transportista(id_transportista )on delete cascade;
alter table bascula.vehiculo add FOREIGN KEY(id_tipo_vehiculo) REFERENCES bascula.tipovehiculo(id_tipo_vehiculo)on delete cascade;
alter table bascula.credencial add FOREIGN KEY(id_persona) REFERENCES bascula.persona(id_persona)on delete cascade;
alter table bascula.proceso add FOREIGN KEY(id_linea) REFERENCES bascula.linea(id_linea)on delete cascade;
alter table bascula.material add FOREIGN KEY(id_proceso) REFERENCES bascula.proceso(id_proceso)on delete cascade;
alter table bascula.tipomaterial add FOREIGN KEY(id_material) REFERENCES bascula.material(id_material)on delete cascade;
alter table bascula.peso add FOREIGN KEY(id_tipo_material) REFERENCES bascula.tipomaterial(id_tipo_material)on delete cascade;
alter table bascula.peso add FOREIGN KEY(id_ticket) REFERENCES bascula.ticket(id_ticket)on delete cascade;
alter table bascula.ticket add FOREIGN KEY(id_vehiculo) REFERENCES bascula.vehiculo(id_vehiculo)on delete cascade;
alter table bascula.ticket add FOREIGN KEY(id_proveedor) REFERENCES bascula.proveedor(id_proveedor)on delete cascade;
alter table bascula.ticket add FOREIGN KEY(id_empresa) REFERENCES bascula.empresa(id_empresa)on delete cascade;
alter table bascula.contaminacion add FOREIGN KEY(id_peso) REFERENCES bascula.peso(id_peso)on delete cascade;
alter table bascula.contaminacion add FOREIGN KEY(id_tipo_contaminacion) REFERENCES bascula.tipocontaminacion(id_tipo_contaminacion)on delete cascade;
alter table bascula.ticket auto_increment = 8869;


insert into persona(cedula,nombres,apellidos,activo) values('0955682315','Gilson Jefferson','Ponce Briones',1);
insert into persona(cedula,nombres,apellidos,activo) values('0955682316','Jose Pedro','Santillan Mendez',1);
insert into persona(cedula,nombres,apellidos,activo) values('0955682317','Josue Manuel','Velez Velez',1);
insert into credencial(id_persona,user,password_user,estado) values(1,'gjponce','admin1223',1);
insert into proveedor(activo,id_persona) values(1,2);
insert into transportista(activo,id_persona,vecimiento_licencia) values(1,18,null);
insert into linea(nombre) values('PLASTICO'),('METAL');
insert into proceso(id_linea,nombre) values(1,'PELLETIZADO'),(2,'COMPACTADO');
insert into material(id_proceso,nombre) values(1,'PEAD'),(2,'CHATARRA');
insert into tipomaterial(id_material,nombre) values(1,'HOGAR'),(2,'SEMIPROCESADA');
insert into tipocontaminacion(nombre) values('MADERA'),('NEVERA'),('BICICLETA'),('LODO');
insert into tipovehiculo(nombre) values('TRAILER');
insert into vehiculo(placa,activo,id_transportista,id_tipo_vehiculo) values('GAA-789',1,1,1);
insert into vehiculo(placa,activo,id_transportista,id_tipo_vehiculo) values('GAR-777',1,1,1);
insert into empresa(razon_social, ruc) values('Novared','09955682315001');
insert into formarecepcion(nombre) values('PLATAFORMA'),('SUELTO'),('PALLET'),('TULAS');
insert into ticket(id_ticket,procesado,id_vehiculo,id_proveedor,id_empresa) values(8869,0,1,3,1);
insert into peso(tipo_peso,forma_recepcion,peso,peso_contaminacion,porcentaje_contaminacion,id_ticket,id_tipo_material) values('ENTRADA','TRAILER',20000,4000,20,8869,null);
insert into peso(tipo_peso,forma_recepcion,peso,peso_contaminacion,porcentaje_contaminacion,id_ticket,id_tipo_material) values('SALIDA','TRAILER',10000,2000,20,8869,1);
insert into peso(tipo_peso,forma_recepcion,peso,peso_contaminacion,porcentaje_contaminacion,id_ticket,id_tipo_material) values('SALIDA','TRAILER',10000,2000,20,8869,1);


select * from linea;
select * from proceso;
select * from material;
select * from tipomaterial;
select *from peso;
select * from ticket;
select * from contaminacion;
select * from persona;
select * from proveedor;
select * from transportista;
select id_ticket, procesado from ticket;

SET SQL_SAFE_UPDATES = 0;
delete from peso where id_peso >= 30;
delete from peso;
delete from ticket;
delete from contaminacion;
delete from persona where id_persona = 2;

select
 tic.id_ticket, veh.placa , pro.nombre as proveedor, tran.nombre as transportista, sum(pe.peso), pe.tipo_peso
from 
(select prov.id_proveedor, concat(per.apellidos,' ',per.nombres) as nombre from persona per inner join proveedor prov on per.id_persona = prov.id_persona ) pro,
(select trans.id_transportista, concat(per.apellidos,' ',per.nombres) as nombre from persona per inner join transportista trans on per.id_persona = trans.id_persona ) tran,
ticket tic, vehiculo veh, peso pe
where veh.id_vehiculo = tic.id_vehiculo and pro.id_proveedor = tic.id_proveedor and tran.id_transportista = veh.id_transportista and tic.id_ticket = pe.id_ticket group by pe.tipo_peso;


select pe.id_peso, tpcon.nombre from tipocontaminacion tpcon, 
    contaminacion con, peso pe, ticket tic where tpcon.id_tipo_contaminacion = con.id_tipo_contaminacion 
    and  pe.id_peso = con.id_peso and tic.id_ticket = pe.id_ticket and tic.id_ticket = 8869;

select pe.id_peso,
pe.peso, pe.peso_contaminacion, pe.porcentaje_contaminacion, pe.peso_total, pe.tipo_peso, pe.forma_recepcion, pe.fecha_hora,
li.nombre as linea, pro.nombre as proceso, ma.nombre as material, tma.nombre as tipomaterial
from ticket tic left join peso pe on tic.id_ticket = pe.id_ticket 
left join tipomaterial tma on tma.id_tipo_material = pe.id_tipo_material
left join material ma on tma.id_material = ma.id_material 
left join proceso pro on ma.id_proceso = pro.id_proceso
left join linea li on pro.id_linea = li.id_linea 
where tic.id_ticket = 8869;



 
