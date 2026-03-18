-- users table
create table users(id uuid primary key default gen_random_uuid(),email varchar(255) not null unique, password varchar(255) not null,enabled boolean not null default false,role varchar(20) not null default 'USER' check ( role in ('USER','ADMIN') ),created_at timestamp not null default current_timestamp,updated_at timestamp,constraint check_password_len check ( length(password)>=5 ));

-- refresh tokens table
create table refresh_tokens(id uuid primary key default gen_random_uuid(),token varchar(255) not null ,user_id uuid not null unique references users(id) on delete cascade,issued_at timestamp not null default current_timestamp,expires_at timestamp not null, revoked boolean default false);