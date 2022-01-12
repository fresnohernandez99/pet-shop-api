-- Database: petshop

-- DROP DATABASE petshop;

CREATE DATABASE petshop
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.person

-- DROP TABLE public.person;

CREATE TABLE public.person
(
    id integer NOT NULL DEFAULT nextval('person_id_seq'::regclass),
    displayname character varying COLLATE pg_catalog."default" NOT NULL,
    username character varying(25) COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    photo character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY (id),
    CONSTRAINT "UQ_7879bb4fcc21ec892dbcfe2cfc3" UNIQUE (displayname),
    CONSTRAINT "UQ_e4475bde6806df5ab6999b47e5b" UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE public.person
    OWNER to postgres;

-- Table: public.role

-- DROP TABLE public.role;

CREATE TABLE public.role
(
    id integer NOT NULL DEFAULT nextval('role_id_seq'::regclass),
    name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.role
    OWNER to postgres;

-- Table: public.person_roles

-- DROP TABLE public.person_roles;

CREATE TABLE public.person_roles
(
    "personId" integer NOT NULL,
    "roleId" integer NOT NULL,
    CONSTRAINT "PK_854c936822ff5507cfa8053e07b" PRIMARY KEY ("personId", "roleId"),
    CONSTRAINT "FK_32b22e80cb9f872f9c2239edcc3" FOREIGN KEY ("roleId")
        REFERENCES public.role (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_9a12accee1507f0bba26e7788f0" FOREIGN KEY ("personId")
        REFERENCES public.person (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.person_roles
    OWNER to postgres;
-- Index: IDX_32b22e80cb9f872f9c2239edcc

-- DROP INDEX public."IDX_32b22e80cb9f872f9c2239edcc";

CREATE INDEX "IDX_32b22e80cb9f872f9c2239edcc"
    ON public.person_roles USING btree
    ("roleId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: IDX_9a12accee1507f0bba26e7788f

-- DROP INDEX public."IDX_9a12accee1507f0bba26e7788f";

CREATE INDEX "IDX_9a12accee1507f0bba26e7788f"
    ON public.person_roles USING btree
    ("personId" ASC NULLS LAST)
    TABLESPACE pg_default;