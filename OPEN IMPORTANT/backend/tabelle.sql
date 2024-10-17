-- Creazione della tabella users
CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL,  -- Usare SERIAL per creare automaticamente la sequenza
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    nome character varying(255) COLLATE pg_catalog."default",
    cognome character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Creazione della tabella posts
CREATE TABLE IF NOT EXISTS public.posts
(
    id SERIAL NOT NULL,  -- Usare SERIAL per la sequenza
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    descrizione character varying COLLATE pg_catalog."default" NOT NULL,
    mipiace integer DEFAULT 0,
    nonmipiace integer DEFAULT 0,
    tag character varying(255) COLLATE pg_catalog."default",
    userid integer NOT NULL,
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT userid FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to postgres;

-- Creazione della tabella commenti
CREATE TABLE IF NOT EXISTS public.commenti
(
    id SERIAL NOT NULL,  -- Usare SERIAL per la sequenza
    testo character varying(255) COLLATE pg_catalog."default",
    idpost integer,
    userid integer NOT NULL,
    CONSTRAINT commenti_pkey PRIMARY KEY (id),
    CONSTRAINT commenti_idpost_fkey FOREIGN KEY (idpost)
        REFERENCES public.posts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT userid FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.commenti
    OWNER to postgres;

-- Creazione della tabella likes
CREATE TABLE IF NOT EXISTS public.likes
(
    id SERIAL NOT NULL,  -- Usare SERIAL per la sequenza
    idpost integer,
    iduser integer,
    CONSTRAINT likes_pkey PRIMARY KEY (id),
    CONSTRAINT likes_idpost_fkey FOREIGN KEY (idpost)
        REFERENCES public.posts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT likes_iduser_fkey FOREIGN KEY (iduser)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.likes
    OWNER to postgres;

-- Creazione della tabella dislike
CREATE TABLE IF NOT EXISTS public.dislike
(
    id SERIAL NOT NULL,  -- Usare SERIAL per la sequenza
    idpost integer,
    iduser integer,
    CONSTRAINT dislike_pkey PRIMARY KEY (id),
    CONSTRAINT dislike_idpost_fkey FOREIGN KEY (idpost)
        REFERENCES public.posts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT dislike_iduser_fkey FOREIGN KEY (iduser)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.dislike
    OWNER to postgres;
