--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Debian 11.3-1.pgdg90+1)
-- Dumped by pg_dump version 11.3 (Debian 11.3-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account_emailaddress; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.account_emailaddress (
    id integer NOT NULL,
    email character varying(254) NOT NULL,
    verified boolean NOT NULL,
    "primary" boolean NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.account_emailaddress OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.account_emailaddress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_emailaddress_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.account_emailaddress_id_seq OWNED BY public.account_emailaddress.id;


--
-- Name: account_emailconfirmation; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.account_emailconfirmation (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    sent timestamp with time zone,
    key character varying(64) NOT NULL,
    email_address_id integer NOT NULL
);


ALTER TABLE public.account_emailconfirmation OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.account_emailconfirmation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_emailconfirmation_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.account_emailconfirmation_id_seq OWNED BY public.account_emailconfirmation.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_celery_beat_clockedschedule; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.django_celery_beat_clockedschedule (
    id integer NOT NULL,
    clocked_time timestamp with time zone NOT NULL,
    enabled boolean NOT NULL
);


ALTER TABLE public.django_celery_beat_clockedschedule OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_celery_beat_clockedschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.django_celery_beat_clockedschedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_celery_beat_clockedschedule_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_celery_beat_clockedschedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.django_celery_beat_clockedschedule_id_seq OWNED BY public.django_celery_beat_clockedschedule.id;


--
-- Name: django_celery_beat_crontabschedule; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.django_celery_beat_crontabschedule (
    id integer NOT NULL,
    minute character varying(240) NOT NULL,
    hour character varying(96) NOT NULL,
    day_of_week character varying(64) NOT NULL,
    day_of_month character varying(124) NOT NULL,
    month_of_year character varying(64) NOT NULL,
    timezone character varying(63) NOT NULL
);


ALTER TABLE public.django_celery_beat_crontabschedule OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_celery_beat_crontabschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.django_celery_beat_crontabschedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_celery_beat_crontabschedule_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_celery_beat_crontabschedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.django_celery_beat_crontabschedule_id_seq OWNED BY public.django_celery_beat_crontabschedule.id;


--
-- Name: django_celery_beat_intervalschedule; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.django_celery_beat_intervalschedule (
    id integer NOT NULL,
    every integer NOT NULL,
    period character varying(24) NOT NULL
);


ALTER TABLE public.django_celery_beat_intervalschedule OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_celery_beat_intervalschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.django_celery_beat_intervalschedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_celery_beat_intervalschedule_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_celery_beat_intervalschedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.django_celery_beat_intervalschedule_id_seq OWNED BY public.django_celery_beat_intervalschedule.id;


--
-- Name: django_celery_beat_periodictask; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.django_celery_beat_periodictask (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    task character varying(200) NOT NULL,
    args text NOT NULL,
    kwargs text NOT NULL,
    queue character varying(200),
    exchange character varying(200),
    routing_key character varying(200),
    expires timestamp with time zone,
    enabled boolean NOT NULL,
    last_run_at timestamp with time zone,
    total_run_count integer NOT NULL,
    date_changed timestamp with time zone NOT NULL,
    description text NOT NULL,
    crontab_id integer,
    interval_id integer,
    solar_id integer,
    one_off boolean NOT NULL,
    start_time timestamp with time zone,
    priority integer,
    headers text NOT NULL,
    clocked_id integer,
    expire_seconds integer,
    CONSTRAINT django_celery_beat_periodictask_expire_seconds_check CHECK ((expire_seconds >= 0)),
    CONSTRAINT django_celery_beat_periodictask_priority_check CHECK ((priority >= 0)),
    CONSTRAINT django_celery_beat_periodictask_total_run_count_check CHECK ((total_run_count >= 0))
);


ALTER TABLE public.django_celery_beat_periodictask OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_celery_beat_periodictask_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.django_celery_beat_periodictask_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_celery_beat_periodictask_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_celery_beat_periodictask_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.django_celery_beat_periodictask_id_seq OWNED BY public.django_celery_beat_periodictask.id;


--
-- Name: django_celery_beat_periodictasks; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.django_celery_beat_periodictasks (
    ident smallint NOT NULL,
    last_update timestamp with time zone NOT NULL
);


ALTER TABLE public.django_celery_beat_periodictasks OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_celery_beat_solarschedule; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.django_celery_beat_solarschedule (
    id integer NOT NULL,
    event character varying(24) NOT NULL,
    latitude numeric(9,6) NOT NULL,
    longitude numeric(9,6) NOT NULL
);


ALTER TABLE public.django_celery_beat_solarschedule OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_celery_beat_solarschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.django_celery_beat_solarschedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_celery_beat_solarschedule_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_celery_beat_solarschedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.django_celery_beat_solarschedule_id_seq OWNED BY public.django_celery_beat_solarschedule.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_site; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.django_site (
    id integer NOT NULL,
    domain character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.django_site OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_site_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.django_site_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_site_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: django_site_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.django_site_id_seq OWNED BY public.django_site.id;


--
-- Name: socialaccount_socialaccount; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.socialaccount_socialaccount (
    id integer NOT NULL,
    provider character varying(30) NOT NULL,
    uid character varying(191) NOT NULL,
    last_login timestamp with time zone NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    extra_data text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.socialaccount_socialaccount OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: socialaccount_socialaccount_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.socialaccount_socialaccount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.socialaccount_socialaccount_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: socialaccount_socialaccount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.socialaccount_socialaccount_id_seq OWNED BY public.socialaccount_socialaccount.id;


--
-- Name: socialaccount_socialapp; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.socialaccount_socialapp (
    id integer NOT NULL,
    provider character varying(30) NOT NULL,
    name character varying(40) NOT NULL,
    client_id character varying(191) NOT NULL,
    secret character varying(191) NOT NULL,
    key character varying(191) NOT NULL
);


ALTER TABLE public.socialaccount_socialapp OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: socialaccount_socialapp_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.socialaccount_socialapp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.socialaccount_socialapp_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: socialaccount_socialapp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.socialaccount_socialapp_id_seq OWNED BY public.socialaccount_socialapp.id;


--
-- Name: socialaccount_socialapp_sites; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.socialaccount_socialapp_sites (
    id integer NOT NULL,
    socialapp_id integer NOT NULL,
    site_id integer NOT NULL
);


ALTER TABLE public.socialaccount_socialapp_sites OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: socialaccount_socialapp_sites_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.socialaccount_socialapp_sites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.socialaccount_socialapp_sites_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: socialaccount_socialapp_sites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.socialaccount_socialapp_sites_id_seq OWNED BY public.socialaccount_socialapp_sites.id;


--
-- Name: socialaccount_socialtoken; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.socialaccount_socialtoken (
    id integer NOT NULL,
    token text NOT NULL,
    token_secret text NOT NULL,
    expires_at timestamp with time zone,
    account_id integer NOT NULL,
    app_id integer NOT NULL
);


ALTER TABLE public.socialaccount_socialtoken OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: socialaccount_socialtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.socialaccount_socialtoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.socialaccount_socialtoken_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: socialaccount_socialtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.socialaccount_socialtoken_id_seq OWNED BY public.socialaccount_socialtoken.id;


--
-- Name: sscpat_academicperiod; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_academicperiod (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    title character varying(255) NOT NULL,
    year character varying(4) NOT NULL,
    semester integer NOT NULL,
    date_init date NOT NULL,
    date_end date NOT NULL,
    CONSTRAINT sscpat_academicperiod_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_academicperiod_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_academicperiod_semester_check CHECK ((semester >= 0)),
    CONSTRAINT sscpat_academicperiod_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_academicperiod OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_academicperiod_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_academicperiod_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_academicperiod_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_academicperiod_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_academicperiod_id_seq OWNED BY public.sscpat_academicperiod.id;


--
-- Name: sscpat_academicproject; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_academicproject (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    CONSTRAINT sscpat_academicproject_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_academicproject_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_academicproject_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_academicproject OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_academicproject_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_academicproject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_academicproject_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_academicproject_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_academicproject_id_seq OWNED BY public.sscpat_academicproject.id;


--
-- Name: sscpat_document; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_document (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    time_send integer NOT NULL,
    CONSTRAINT sscpat_document_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_document_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_document_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_document OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_document_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_document_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_document_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_document_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_document_id_seq OWNED BY public.sscpat_document.id;


--
-- Name: sscpat_file; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_file (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    title character varying(255) NOT NULL,
    format character varying(32) NOT NULL,
    size integer NOT NULL,
    path character varying(100) NOT NULL,
    img_medium character varying(255),
    thumbnail character varying(255),
    CONSTRAINT sscpat_file_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_file_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_file_size_check CHECK ((size >= 0)),
    CONSTRAINT sscpat_file_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_file OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_file_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_file_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_file_id_seq OWNED BY public.sscpat_file.id;


--
-- Name: sscpat_inscription; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_inscription (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    state character varying(32) NOT NULL,
    title_academic_project text NOT NULL,
    description_project text NOT NULL,
    date_init date NOT NULL,
    date_end date NOT NULL,
    date_end_old date,
    extended boolean NOT NULL,
    academic_period_id integer,
    institution_id integer,
    modality_id integer NOT NULL,
    student_id integer NOT NULL,
    has_time_extension boolean NOT NULL,
    month_duration integer NOT NULL,
    month_extension integer NOT NULL,
    month_max_duration integer NOT NULL,
    CONSTRAINT sscpat_inscription_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_inscription_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_inscription_month_duration_check CHECK ((month_duration >= 0)),
    CONSTRAINT sscpat_inscription_month_extension_check CHECK ((month_extension >= 0)),
    CONSTRAINT sscpat_inscription_month_max_duration_check CHECK ((month_max_duration >= 0)),
    CONSTRAINT sscpat_inscription_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_inscription OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscription_external_tutors; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_inscription_external_tutors (
    id integer NOT NULL,
    inscription_id integer NOT NULL,
    externaltutor_id integer NOT NULL
);


ALTER TABLE public.sscpat_inscription_external_tutors OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscription_external_tutors_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_inscription_external_tutors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_inscription_external_tutors_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscription_external_tutors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_inscription_external_tutors_id_seq OWNED BY public.sscpat_inscription_external_tutors.id;


--
-- Name: sscpat_inscription_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_inscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_inscription_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_inscription_id_seq OWNED BY public.sscpat_inscription.id;


--
-- Name: sscpat_inscription_tutors; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_inscription_tutors (
    id integer NOT NULL,
    inscription_id integer NOT NULL,
    tutor_id integer NOT NULL
);


ALTER TABLE public.sscpat_inscription_tutors OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscription_tutors_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_inscription_tutors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_inscription_tutors_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscription_tutors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_inscription_tutors_id_seq OWNED BY public.sscpat_inscription_tutors.id;


--
-- Name: sscpat_inscriptiondocument; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_inscriptiondocument (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    file_id integer,
    reviewed boolean NOT NULL,
    document_id integer NOT NULL,
    inscription_id integer NOT NULL,
    deadline_date date,
    reviewed_date date,
    CONSTRAINT sscpat_inscriptiondocument_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_inscriptiondocument_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_inscriptiondocument_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_inscriptiondocument OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscriptiondocument_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_inscriptiondocument_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_inscriptiondocument_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscriptiondocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_inscriptiondocument_id_seq OWNED BY public.sscpat_inscriptiondocument.id;


--
-- Name: sscpat_inscriptioninitialdocument; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_inscriptioninitialdocument (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    deadline_date date,
    reviewed boolean NOT NULL,
    reviewed_date date,
    document_id integer NOT NULL,
    file_id integer,
    inscription_id integer NOT NULL,
    CONSTRAINT sscpat_inscriptioninitialdocument_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_inscriptioninitialdocument_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_inscriptioninitialdocument_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_inscriptioninitialdocument OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscriptioninitialdocument_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_inscriptioninitialdocument_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_inscriptioninitialdocument_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscriptioninitialdocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_inscriptioninitialdocument_id_seq OWNED BY public.sscpat_inscriptioninitialdocument.id;


--
-- Name: sscpat_inscriptiontutor; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_inscriptiontutor (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    type character varying(16) NOT NULL,
    inscription_id integer NOT NULL,
    tutor_id integer NOT NULL,
    CONSTRAINT sscpat_inscriptiontutor_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_inscriptiontutor_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_inscriptiontutor_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_inscriptiontutor OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscriptiontutor_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_inscriptiontutor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_inscriptiontutor_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_inscriptiontutor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_inscriptiontutor_id_seq OWNED BY public.sscpat_inscriptiontutor.id;


--
-- Name: sscpat_institution; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_institution (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    name character varying(255) NOT NULL,
    responsable character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    CONSTRAINT sscpat_institution_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_institution_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_institution_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_institution OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_institution_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_institution_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_institution_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_institution_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_institution_id_seq OWNED BY public.sscpat_institution.id;


--
-- Name: sscpat_modality; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_modality (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    CONSTRAINT sscpat_modality_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_modality_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_modality_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_modality OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_modality_document_inscription; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_modality_document_inscription (
    id integer NOT NULL,
    modality_id integer NOT NULL,
    document_id integer NOT NULL
);


ALTER TABLE public.sscpat_modality_document_inscription OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_modality_document_inscription_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_modality_document_inscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_modality_document_inscription_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_modality_document_inscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_modality_document_inscription_id_seq OWNED BY public.sscpat_modality_document_inscription.id;


--
-- Name: sscpat_modality_documents; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_modality_documents (
    id integer NOT NULL,
    modality_id integer NOT NULL,
    document_id integer NOT NULL
);


ALTER TABLE public.sscpat_modality_documents OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_modality_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_modality_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_modality_documents_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_modality_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_modality_documents_id_seq OWNED BY public.sscpat_modality_documents.id;


--
-- Name: sscpat_modality_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_modality_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_modality_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_modality_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_modality_id_seq OWNED BY public.sscpat_modality.id;


--
-- Name: sscpat_modalityconfig; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_modalityconfig (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    max_author integer NOT NULL,
    month_duration integer NOT NULL,
    month_max_duration integer NOT NULL,
    has_time_extension boolean NOT NULL,
    month_extension integer NOT NULL,
    has_tutors boolean NOT NULL,
    has_institution boolean NOT NULL,
    mandatory_month_report_progress_student boolean NOT NULL,
    frequency_report_student integer NOT NULL,
    mandatory_month_report_tutor boolean NOT NULL,
    frequency_report_tutor integer NOT NULL,
    mandatory_month_report_external_tutor boolean NOT NULL,
    frequency_report_external_tutor integer NOT NULL,
    mandatory_month_report_institution boolean NOT NULL,
    frequency_report_institution integer NOT NULL,
    send_final_document boolean NOT NULL,
    send_abstract_final_document boolean NOT NULL,
    send_resolution_commission_aproval boolean NOT NULL,
    modality_id integer NOT NULL,
    CONSTRAINT sscpat_modalityconfig_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_modalityconfig_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_modalityconfig_frequency_report_external_tutor_check CHECK ((frequency_report_external_tutor >= 0)),
    CONSTRAINT sscpat_modalityconfig_frequency_report_institution_check CHECK ((frequency_report_institution >= 0)),
    CONSTRAINT sscpat_modalityconfig_frequency_report_student_check CHECK ((frequency_report_student >= 0)),
    CONSTRAINT sscpat_modalityconfig_frequency_report_tutor_check CHECK ((frequency_report_tutor >= 0)),
    CONSTRAINT sscpat_modalityconfig_max_author_check CHECK ((max_author >= 0)),
    CONSTRAINT sscpat_modalityconfig_month_duration_check CHECK ((month_duration >= 0)),
    CONSTRAINT sscpat_modalityconfig_month_extension_check CHECK ((month_extension >= 0)),
    CONSTRAINT sscpat_modalityconfig_month_max_duration_check CHECK ((month_max_duration >= 0)),
    CONSTRAINT sscpat_modalityconfig_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_modalityconfig OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_modalityconfig_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_modalityconfig_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_modalityconfig_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_modalityconfig_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_modalityconfig_id_seq OWNED BY public.sscpat_modalityconfig.id;


--
-- Name: sscpat_modalityperiod; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_modalityperiod (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    fileconvocatory character varying(255),
    academicperiod_id integer NOT NULL,
    modality_id integer NOT NULL,
    CONSTRAINT sscpat_modalityperiod_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_modalityperiod_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_modalityperiod_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_modalityperiod OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_modalityperiod_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_modalityperiod_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_modalityperiod_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_modalityperiod_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_modalityperiod_id_seq OWNED BY public.sscpat_modalityperiod.id;


--
-- Name: sscpat_normative; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_normative (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    title character varying(255) NOT NULL,
    modality_id integer NOT NULL,
    format character varying(32) NOT NULL,
    path character varying(100) NOT NULL,
    CONSTRAINT sscpat_normative_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_normative_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_normative_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_normative OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_normative_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_normative_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_normative_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_normative_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_normative_id_seq OWNED BY public.sscpat_normative.id;


--
-- Name: sscpat_notification; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_notification (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    user_id integer NOT NULL,
    format character varying(2) NOT NULL,
    inscription_id integer,
    inscription_document_id integer,
    is_read boolean NOT NULL,
    tracing_progress_id integer,
    tracing_student_id integer,
    user_action_id integer,
    CONSTRAINT sscpat_notification_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_notification_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_notification_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_notification OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_notification_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_notification_id_seq OWNED BY public.sscpat_notification.id;


--
-- Name: sscpat_notificationtype; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_notificationtype (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    title character varying(255) NOT NULL,
    message_format character varying(1024) NOT NULL,
    CONSTRAINT sscpat_notificationtype_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_notificationtype_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_notificationtype_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_notificationtype OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_notificationtype_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_notificationtype_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_notificationtype_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_notificationtype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_notificationtype_id_seq OWNED BY public.sscpat_notificationtype.id;


--
-- Name: sscpat_tracingprogress; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_tracingprogress (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    typetracing character varying(20),
    institution_id integer,
    tracingstudent_id integer NOT NULL,
    user_id integer,
    description text NOT NULL,
    CONSTRAINT sscpat_tracingprogress_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_tracingprogress_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_tracingprogress_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_tracingprogress OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_tracingprogress_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_tracingprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_tracingprogress_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_tracingprogress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_tracingprogress_id_seq OWNED BY public.sscpat_tracingprogress.id;


--
-- Name: sscpat_tracingprogressfile; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_tracingprogressfile (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    title character varying(255) NOT NULL,
    format character varying(32) NOT NULL,
    path character varying(100) NOT NULL,
    img_medium character varying(255),
    thumbnail character varying(255),
    tracingprogress_id integer NOT NULL,
    CONSTRAINT sscpat_tracingprogressfile_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_tracingprogressfile_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_tracingprogressfile_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_tracingprogressfile OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_tracingprogressfile_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_tracingprogressfile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_tracingprogressfile_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_tracingprogressfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_tracingprogressfile_id_seq OWNED BY public.sscpat_tracingprogressfile.id;


--
-- Name: sscpat_tracingstudent; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_tracingstudent (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    description character varying(255) NOT NULL,
    month integer,
    is_final_document boolean NOT NULL,
    reviewed_by_tutor boolean NOT NULL,
    reviewed_by_admin boolean NOT NULL,
    inscription_id integer NOT NULL,
    number integer NOT NULL,
    institution_report_was_sent boolean NOT NULL,
    require_admin_review boolean NOT NULL,
    require_external_tutor_review boolean NOT NULL,
    require_institution_report boolean NOT NULL,
    require_tutor_review boolean NOT NULL,
    reviewed_by_external_tutor boolean NOT NULL,
    CONSTRAINT sscpat_tracingstudent_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_tracingstudent_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_tracingstudent_month_check CHECK ((month >= 0)),
    CONSTRAINT sscpat_tracingstudent_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_tracingstudent OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_tracingstudent_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_tracingstudent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_tracingstudent_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_tracingstudent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_tracingstudent_id_seq OWNED BY public.sscpat_tracingstudent.id;


--
-- Name: sscpat_tracingstudentfile; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_tracingstudentfile (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    title character varying(255) NOT NULL,
    format character varying(32) NOT NULL,
    path character varying(100) NOT NULL,
    tracingstudent_id integer NOT NULL,
    img_medium character varying(255),
    thumbnail character varying(255),
    CONSTRAINT sscpat_tracingstudentfile_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_tracingstudentfile_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_tracingstudentfile_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_tracingstudentfile OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_tracingstudentfile_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_tracingstudentfile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_tracingstudentfile_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_tracingstudentfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_tracingstudentfile_id_seq OWNED BY public.sscpat_tracingstudentfile.id;


--
-- Name: sscpat_user; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    last_name2 character varying(150) NOT NULL,
    type character varying(50) NOT NULL,
    "CI" character varying(255) NOT NULL,
    "RU" character varying(255) NOT NULL,
    "ID_TUTOR" character varying(255) NOT NULL,
    "position" character varying(255) NOT NULL,
    academic_degree character varying(255) NOT NULL,
    abbreviation character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    telf character varying(255) NOT NULL,
    email character varying(254) NOT NULL,
    address character varying(1024) NOT NULL,
    CONSTRAINT sscpat_user_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_user_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_user_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_user OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_user_groups; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.sscpat_user_groups OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_user_groups_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_user_groups_id_seq OWNED BY public.sscpat_user_groups.id;


--
-- Name: sscpat_user_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_user_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_user_id_seq OWNED BY public.sscpat_user.id;


--
-- Name: sscpat_user_user_permissions; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.sscpat_user_user_permissions OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_user_user_permissions_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_user_user_permissions_id_seq OWNED BY public.sscpat_user_user_permissions.id;


--
-- Name: sscpat_userpicture; Type: TABLE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE TABLE public.sscpat_userpicture (
    id integer NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    deleted_by integer,
    is_current_profile_picture boolean NOT NULL,
    img_l character varying(255),
    img_m character varying(255),
    thumbnail character varying(255),
    user_id integer NOT NULL,
    CONSTRAINT sscpat_userpicture_created_by_check CHECK ((created_by >= 0)),
    CONSTRAINT sscpat_userpicture_deleted_by_check CHECK ((deleted_by >= 0)),
    CONSTRAINT sscpat_userpicture_updated_by_check CHECK ((updated_by >= 0))
);


ALTER TABLE public.sscpat_userpicture OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_userpicture_id_seq; Type: SEQUENCE; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE SEQUENCE public.sscpat_userpicture_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sscpat_userpicture_id_seq OWNER TO "EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw";

--
-- Name: sscpat_userpicture_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER SEQUENCE public.sscpat_userpicture_id_seq OWNED BY public.sscpat_userpicture.id;


--
-- Name: account_emailaddress id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.account_emailaddress ALTER COLUMN id SET DEFAULT nextval('public.account_emailaddress_id_seq'::regclass);


--
-- Name: account_emailconfirmation id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.account_emailconfirmation ALTER COLUMN id SET DEFAULT nextval('public.account_emailconfirmation_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_celery_beat_clockedschedule id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_clockedschedule ALTER COLUMN id SET DEFAULT nextval('public.django_celery_beat_clockedschedule_id_seq'::regclass);


--
-- Name: django_celery_beat_crontabschedule id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_crontabschedule ALTER COLUMN id SET DEFAULT nextval('public.django_celery_beat_crontabschedule_id_seq'::regclass);


--
-- Name: django_celery_beat_intervalschedule id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_intervalschedule ALTER COLUMN id SET DEFAULT nextval('public.django_celery_beat_intervalschedule_id_seq'::regclass);


--
-- Name: django_celery_beat_periodictask id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_periodictask ALTER COLUMN id SET DEFAULT nextval('public.django_celery_beat_periodictask_id_seq'::regclass);


--
-- Name: django_celery_beat_solarschedule id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_solarschedule ALTER COLUMN id SET DEFAULT nextval('public.django_celery_beat_solarschedule_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: django_site id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_site ALTER COLUMN id SET DEFAULT nextval('public.django_site_id_seq'::regclass);


--
-- Name: socialaccount_socialaccount id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialaccount ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialaccount_id_seq'::regclass);


--
-- Name: socialaccount_socialapp id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialapp ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialapp_id_seq'::regclass);


--
-- Name: socialaccount_socialapp_sites id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialapp_sites_id_seq'::regclass);


--
-- Name: socialaccount_socialtoken id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialtoken ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialtoken_id_seq'::regclass);


--
-- Name: sscpat_academicperiod id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_academicperiod ALTER COLUMN id SET DEFAULT nextval('public.sscpat_academicperiod_id_seq'::regclass);


--
-- Name: sscpat_academicproject id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_academicproject ALTER COLUMN id SET DEFAULT nextval('public.sscpat_academicproject_id_seq'::regclass);


--
-- Name: sscpat_document id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_document ALTER COLUMN id SET DEFAULT nextval('public.sscpat_document_id_seq'::regclass);


--
-- Name: sscpat_file id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_file ALTER COLUMN id SET DEFAULT nextval('public.sscpat_file_id_seq'::regclass);


--
-- Name: sscpat_inscription id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription ALTER COLUMN id SET DEFAULT nextval('public.sscpat_inscription_id_seq'::regclass);


--
-- Name: sscpat_inscription_external_tutors id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription_external_tutors ALTER COLUMN id SET DEFAULT nextval('public.sscpat_inscription_external_tutors_id_seq'::regclass);


--
-- Name: sscpat_inscription_tutors id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription_tutors ALTER COLUMN id SET DEFAULT nextval('public.sscpat_inscription_tutors_id_seq'::regclass);


--
-- Name: sscpat_inscriptiondocument id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptiondocument ALTER COLUMN id SET DEFAULT nextval('public.sscpat_inscriptiondocument_id_seq'::regclass);


--
-- Name: sscpat_inscriptioninitialdocument id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptioninitialdocument ALTER COLUMN id SET DEFAULT nextval('public.sscpat_inscriptioninitialdocument_id_seq'::regclass);


--
-- Name: sscpat_inscriptiontutor id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptiontutor ALTER COLUMN id SET DEFAULT nextval('public.sscpat_inscriptiontutor_id_seq'::regclass);


--
-- Name: sscpat_institution id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_institution ALTER COLUMN id SET DEFAULT nextval('public.sscpat_institution_id_seq'::regclass);


--
-- Name: sscpat_modality id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality ALTER COLUMN id SET DEFAULT nextval('public.sscpat_modality_id_seq'::regclass);


--
-- Name: sscpat_modality_document_inscription id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality_document_inscription ALTER COLUMN id SET DEFAULT nextval('public.sscpat_modality_document_inscription_id_seq'::regclass);


--
-- Name: sscpat_modality_documents id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality_documents ALTER COLUMN id SET DEFAULT nextval('public.sscpat_modality_documents_id_seq'::regclass);


--
-- Name: sscpat_modalityconfig id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modalityconfig ALTER COLUMN id SET DEFAULT nextval('public.sscpat_modalityconfig_id_seq'::regclass);


--
-- Name: sscpat_modalityperiod id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modalityperiod ALTER COLUMN id SET DEFAULT nextval('public.sscpat_modalityperiod_id_seq'::regclass);


--
-- Name: sscpat_normative id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_normative ALTER COLUMN id SET DEFAULT nextval('public.sscpat_normative_id_seq'::regclass);


--
-- Name: sscpat_notification id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_notification ALTER COLUMN id SET DEFAULT nextval('public.sscpat_notification_id_seq'::regclass);


--
-- Name: sscpat_notificationtype id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_notificationtype ALTER COLUMN id SET DEFAULT nextval('public.sscpat_notificationtype_id_seq'::regclass);


--
-- Name: sscpat_tracingprogress id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingprogress ALTER COLUMN id SET DEFAULT nextval('public.sscpat_tracingprogress_id_seq'::regclass);


--
-- Name: sscpat_tracingprogressfile id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingprogressfile ALTER COLUMN id SET DEFAULT nextval('public.sscpat_tracingprogressfile_id_seq'::regclass);


--
-- Name: sscpat_tracingstudent id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingstudent ALTER COLUMN id SET DEFAULT nextval('public.sscpat_tracingstudent_id_seq'::regclass);


--
-- Name: sscpat_tracingstudentfile id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingstudentfile ALTER COLUMN id SET DEFAULT nextval('public.sscpat_tracingstudentfile_id_seq'::regclass);


--
-- Name: sscpat_user id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user ALTER COLUMN id SET DEFAULT nextval('public.sscpat_user_id_seq'::regclass);


--
-- Name: sscpat_user_groups id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user_groups ALTER COLUMN id SET DEFAULT nextval('public.sscpat_user_groups_id_seq'::regclass);


--
-- Name: sscpat_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.sscpat_user_user_permissions_id_seq'::regclass);


--
-- Name: sscpat_userpicture id; Type: DEFAULT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_userpicture ALTER COLUMN id SET DEFAULT nextval('public.sscpat_userpicture_id_seq'::regclass);


--
-- Data for Name: account_emailaddress; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.account_emailaddress (id, email, verified, "primary", user_id) FROM stdin;
\.


--
-- Data for Name: account_emailconfirmation; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.account_emailconfirmation (id, created, sent, key, email_address_id) FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add permission	1	add_permission
2	Can change permission	1	change_permission
3	Can delete permission	1	delete_permission
4	Can view permission	1	view_permission
5	Can add group	2	add_group
6	Can change group	2	change_group
7	Can delete group	2	delete_group
8	Can view group	2	view_group
9	Can add content type	3	add_contenttype
10	Can change content type	3	change_contenttype
11	Can delete content type	3	delete_contenttype
12	Can view content type	3	view_contenttype
13	Can add session	4	add_session
14	Can change session	4	change_session
15	Can delete session	4	delete_session
16	Can view session	4	view_session
17	Can add site	5	add_site
18	Can change site	5	change_site
19	Can delete site	5	delete_site
20	Can view site	5	view_site
21	Can add log entry	6	add_logentry
22	Can change log entry	6	change_logentry
23	Can delete log entry	6	delete_logentry
24	Can view log entry	6	view_logentry
25	Can add email address	7	add_emailaddress
26	Can change email address	7	change_emailaddress
27	Can delete email address	7	delete_emailaddress
28	Can view email address	7	view_emailaddress
29	Can add email confirmation	8	add_emailconfirmation
30	Can change email confirmation	8	change_emailconfirmation
31	Can delete email confirmation	8	delete_emailconfirmation
32	Can view email confirmation	8	view_emailconfirmation
33	Can add social account	9	add_socialaccount
34	Can change social account	9	change_socialaccount
35	Can delete social account	9	delete_socialaccount
36	Can view social account	9	view_socialaccount
37	Can add social application	10	add_socialapp
38	Can change social application	10	change_socialapp
39	Can delete social application	10	delete_socialapp
40	Can view social application	10	view_socialapp
41	Can add social application token	11	add_socialtoken
42	Can change social application token	11	change_socialtoken
43	Can delete social application token	11	delete_socialtoken
44	Can view social application token	11	view_socialtoken
45	Can add crontab	12	add_crontabschedule
46	Can change crontab	12	change_crontabschedule
47	Can delete crontab	12	delete_crontabschedule
48	Can view crontab	12	view_crontabschedule
49	Can add interval	13	add_intervalschedule
50	Can change interval	13	change_intervalschedule
51	Can delete interval	13	delete_intervalschedule
52	Can view interval	13	view_intervalschedule
53	Can add periodic task	14	add_periodictask
54	Can change periodic task	14	change_periodictask
55	Can delete periodic task	14	delete_periodictask
56	Can view periodic task	14	view_periodictask
57	Can add periodic tasks	15	add_periodictasks
58	Can change periodic tasks	15	change_periodictasks
59	Can delete periodic tasks	15	delete_periodictasks
60	Can view periodic tasks	15	view_periodictasks
61	Can add solar event	16	add_solarschedule
62	Can change solar event	16	change_solarschedule
63	Can delete solar event	16	delete_solarschedule
64	Can view solar event	16	view_solarschedule
65	Can add clocked	17	add_clockedschedule
66	Can change clocked	17	change_clockedschedule
67	Can delete clocked	17	delete_clockedschedule
68	Can view clocked	17	view_clockedschedule
69	Can add user	18	add_user
70	Can change user	18	change_user
71	Can delete user	18	delete_user
72	Can view user	18	view_user
73	Can add academic period	19	add_academicperiod
74	Can change academic period	19	change_academicperiod
75	Can delete academic period	19	delete_academicperiod
76	Can view academic period	19	view_academicperiod
77	Can add academic project	20	add_academicproject
78	Can change academic project	20	change_academicproject
79	Can delete academic project	20	delete_academicproject
80	Can view academic project	20	view_academicproject
81	Can add document	21	add_document
82	Can change document	21	change_document
83	Can delete document	21	delete_document
84	Can view document	21	view_document
85	Can add inscription	22	add_inscription
86	Can change inscription	22	change_inscription
87	Can delete inscription	22	delete_inscription
88	Can view inscription	22	view_inscription
89	Can add institution	23	add_institution
90	Can change institution	23	change_institution
91	Can delete institution	23	delete_institution
92	Can view institution	23	view_institution
93	Can add modality	24	add_modality
94	Can change modality	24	change_modality
95	Can delete modality	24	delete_modality
96	Can view modality	24	view_modality
97	Can add notification type	25	add_notificationtype
98	Can change notification type	25	change_notificationtype
99	Can delete notification type	25	delete_notificationtype
100	Can view notification type	25	view_notificationtype
101	Can add tracing progress	26	add_tracingprogress
102	Can change tracing progress	26	change_tracingprogress
103	Can delete tracing progress	26	delete_tracingprogress
104	Can view tracing progress	26	view_tracingprogress
105	Can add tracing student	27	add_tracingstudent
106	Can change tracing student	27	change_tracingstudent
107	Can delete tracing student	27	delete_tracingstudent
108	Can view tracing student	27	view_tracingstudent
109	Can add user picture	28	add_userpicture
110	Can change user picture	28	change_userpicture
111	Can delete user picture	28	delete_userpicture
112	Can view user picture	28	view_userpicture
113	Can add tracing student file	29	add_tracingstudentfile
114	Can change tracing student file	29	change_tracingstudentfile
115	Can delete tracing student file	29	delete_tracingstudentfile
116	Can view tracing student file	29	view_tracingstudentfile
117	Can add tracing progress file	30	add_tracingprogressfile
118	Can change tracing progress file	30	change_tracingprogressfile
119	Can delete tracing progress file	30	delete_tracingprogressfile
120	Can view tracing progress file	30	view_tracingprogressfile
121	Can add Notification	31	add_notification
122	Can change Notification	31	change_notification
123	Can delete Notification	31	delete_notification
124	Can view Notification	31	view_notification
125	Can add normative	32	add_normative
126	Can change normative	32	change_normative
127	Can delete normative	32	delete_normative
128	Can view normative	32	view_normative
129	Can add modality period	33	add_modalityperiod
130	Can change modality period	33	change_modalityperiod
131	Can delete modality period	33	delete_modalityperiod
132	Can view modality period	33	view_modalityperiod
133	Can add modality config	34	add_modalityconfig
134	Can change modality config	34	change_modalityconfig
135	Can delete modality config	34	delete_modalityconfig
136	Can view modality config	34	view_modalityconfig
137	Can add inscription tutor	35	add_inscriptiontutor
138	Can change inscription tutor	35	change_inscriptiontutor
139	Can delete inscription tutor	35	delete_inscriptiontutor
140	Can view inscription tutor	35	view_inscriptiontutor
141	Can add inscription document	36	add_inscriptiondocument
142	Can change inscription document	36	change_inscriptiondocument
143	Can delete inscription document	36	delete_inscriptiondocument
144	Can view inscription document	36	view_inscriptiondocument
145	Can add admin	37	add_admin
146	Can change admin	37	change_admin
147	Can delete admin	37	delete_admin
148	Can view admin	37	view_admin
149	Can add external tutor	38	add_externaltutor
150	Can change external tutor	38	change_externaltutor
151	Can delete external tutor	38	delete_externaltutor
152	Can view external tutor	38	view_externaltutor
153	Can add student	39	add_student
154	Can change student	39	change_student
155	Can delete student	39	delete_student
156	Can view student	39	view_student
157	Can add tutor	40	add_tutor
158	Can change tutor	40	change_tutor
159	Can delete tutor	40	delete_tutor
160	Can view tutor	40	view_tutor
161	Can add file	41	add_file
162	Can change file	41	change_file
163	Can delete file	41	delete_file
164	Can view file	41	view_file
165	Can add inscription initial document	42	add_inscriptioninitialdocument
166	Can change inscription initial document	42	change_inscriptioninitialdocument
167	Can delete inscription initial document	42	delete_inscriptioninitialdocument
168	Can view inscription initial document	42	view_inscriptioninitialdocument
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2021-07-08 01:11:15.3972+00	1	  	2	[{"changed": {"fields": ["type", "CI"]}}]	18	1
\.


--
-- Data for Name: django_celery_beat_clockedschedule; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.django_celery_beat_clockedschedule (id, clocked_time, enabled) FROM stdin;
\.


--
-- Data for Name: django_celery_beat_crontabschedule; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.django_celery_beat_crontabschedule (id, minute, hour, day_of_week, day_of_month, month_of_year, timezone) FROM stdin;
1	0	4	*	*	*	UTC
\.


--
-- Data for Name: django_celery_beat_intervalschedule; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.django_celery_beat_intervalschedule (id, every, period) FROM stdin;
\.


--
-- Data for Name: django_celery_beat_periodictask; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.django_celery_beat_periodictask (id, name, task, args, kwargs, queue, exchange, routing_key, expires, enabled, last_run_at, total_run_count, date_changed, description, crontab_id, interval_id, solar_id, one_off, start_time, priority, headers, clocked_id, expire_seconds) FROM stdin;
1	celery.backend_cleanup	celery.backend_cleanup	[]	{}	\N	\N	\N	\N	t	2021-07-07 05:05:42.500682+00	1	2021-07-08 01:00:28.598091+00		1	\N	\N	f	\N	\N	{}	\N	43200
\.


--
-- Data for Name: django_celery_beat_periodictasks; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.django_celery_beat_periodictasks (ident, last_update) FROM stdin;
1	2021-07-08 01:00:28.593947+00
\.


--
-- Data for Name: django_celery_beat_solarschedule; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.django_celery_beat_solarschedule (id, event, latitude, longitude) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	auth	permission
2	auth	group
3	contenttypes	contenttype
4	sessions	session
5	sites	site
6	admin	logentry
7	account	emailaddress
8	account	emailconfirmation
9	socialaccount	socialaccount
10	socialaccount	socialapp
11	socialaccount	socialtoken
12	django_celery_beat	crontabschedule
13	django_celery_beat	intervalschedule
14	django_celery_beat	periodictask
15	django_celery_beat	periodictasks
16	django_celery_beat	solarschedule
17	django_celery_beat	clockedschedule
18	sscpat	user
19	sscpat	academicperiod
20	sscpat	academicproject
21	sscpat	document
22	sscpat	inscription
23	sscpat	institution
24	sscpat	modality
25	sscpat	notificationtype
26	sscpat	tracingprogress
27	sscpat	tracingstudent
28	sscpat	userpicture
29	sscpat	tracingstudentfile
30	sscpat	tracingprogressfile
31	sscpat	notification
32	sscpat	normative
33	sscpat	modalityperiod
34	sscpat	modalityconfig
35	sscpat	inscriptiontutor
36	sscpat	inscriptiondocument
37	sscpat	admin
38	sscpat	externaltutor
39	sscpat	student
40	sscpat	tutor
41	sscpat	file
42	sscpat	inscriptioninitialdocument
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2021-07-06 17:36:49.176835+00
2	contenttypes	0002_remove_content_type_name	2021-07-06 17:36:49.19076+00
3	auth	0001_initial	2021-07-06 17:36:49.21611+00
4	auth	0002_alter_permission_name_max_length	2021-07-06 17:36:49.259265+00
5	auth	0003_alter_user_email_max_length	2021-07-06 17:36:49.26597+00
6	auth	0004_alter_user_username_opts	2021-07-06 17:36:49.273663+00
7	auth	0005_alter_user_last_login_null	2021-07-06 17:36:49.281221+00
8	auth	0006_require_contenttypes_0002	2021-07-06 17:36:49.285008+00
9	auth	0007_alter_validators_add_error_messages	2021-07-06 17:36:49.293579+00
10	auth	0008_alter_user_username_max_length	2021-07-06 17:36:49.303966+00
11	auth	0009_alter_user_last_name_max_length	2021-07-06 17:36:49.313234+00
12	auth	0010_alter_group_name_max_length	2021-07-06 17:36:49.351378+00
13	auth	0011_update_proxy_permissions	2021-07-06 17:36:49.360331+00
14	sscpat	0001_initial	2021-07-06 17:36:49.777213+00
15	account	0001_initial	2021-07-06 17:36:49.944174+00
16	account	0002_email_max_length	2021-07-06 17:36:49.972319+00
17	admin	0001_initial	2021-07-06 17:36:50.010274+00
18	admin	0002_logentry_remove_auto_add	2021-07-06 17:36:50.036104+00
19	admin	0003_logentry_add_action_flag_choices	2021-07-06 17:36:50.057049+00
20	django_celery_beat	0001_initial	2021-07-06 17:36:50.092389+00
21	django_celery_beat	0002_auto_20161118_0346	2021-07-06 17:36:50.115895+00
22	django_celery_beat	0003_auto_20161209_0049	2021-07-06 17:36:50.132725+00
23	django_celery_beat	0004_auto_20170221_0000	2021-07-06 17:36:50.14013+00
24	django_celery_beat	0005_add_solarschedule_events_choices	2021-07-06 17:36:50.148417+00
25	django_celery_beat	0006_auto_20180322_0932	2021-07-06 17:36:50.242558+00
26	django_celery_beat	0007_auto_20180521_0826	2021-07-06 17:36:50.262465+00
27	django_celery_beat	0008_auto_20180914_1922	2021-07-06 17:36:50.295373+00
28	django_celery_beat	0006_auto_20180210_1226	2021-07-06 17:36:50.319948+00
29	django_celery_beat	0006_periodictask_priority	2021-07-06 17:36:50.330377+00
30	django_celery_beat	0009_periodictask_headers	2021-07-06 17:36:50.343108+00
31	django_celery_beat	0010_auto_20190429_0326	2021-07-06 17:36:50.524488+00
32	django_celery_beat	0011_auto_20190508_0153	2021-07-06 17:36:50.537633+00
33	django_celery_beat	0012_periodictask_expire_seconds	2021-07-06 17:36:50.54857+00
34	sessions	0001_initial	2021-07-06 17:36:50.556612+00
35	sites	0001_initial	2021-07-06 17:36:50.569305+00
36	sites	0002_alter_domain_unique	2021-07-06 17:36:50.580671+00
37	sites	0003_set_site_domain_and_name	2021-07-06 17:36:50.63567+00
38	socialaccount	0001_initial	2021-07-06 17:36:50.741964+00
39	socialaccount	0002_token_max_lengths	2021-07-06 17:36:50.78995+00
40	socialaccount	0003_extra_data_default_dict	2021-07-06 17:36:50.805886+00
41	sscpat	0002_auto_20210503_1309	2021-07-06 17:36:50.850307+00
42	sscpat	0003_auto_20210505_0312	2021-07-06 17:36:50.991619+00
43	sscpat	0004_tracingstudent_number	2021-07-06 17:36:51.059498+00
44	sscpat	0005_auto_20210506_0304	2021-07-06 17:36:51.177145+00
45	sscpat	0006_auto_20210507_0056	2021-07-06 17:36:51.230727+00
46	sscpat	0007_auto_20210512_2120	2021-07-06 17:36:51.328973+00
47	sscpat	0008_auto_20210512_2127	2021-07-06 17:36:51.349842+00
48	sscpat	0009_auto_20210512_2204	2021-07-06 17:36:51.378011+00
49	sscpat	0010_auto_20210513_0042	2021-07-06 17:36:51.391234+00
50	sscpat	0011_auto_20210513_0046	2021-07-06 17:36:51.486021+00
51	sscpat	0012_auto_20210517_2319	2021-07-06 17:36:51.559552+00
52	sscpat	0013_auto_20210519_0237	2021-07-06 17:36:51.761492+00
53	sscpat	0014_auto_20210608_1802	2021-07-06 17:36:51.836712+00
54	sscpat	0015_auto_20210608_1939	2021-07-06 17:36:51.850958+00
55	sscpat	0016_auto_20210608_2050	2021-07-06 17:36:51.903239+00
56	sscpat	0017_auto_20210609_2116	2021-07-06 17:36:52.027823+00
57	sscpat	0018_auto_20210609_2118	2021-07-06 17:36:52.056403+00
58	sscpat	0019_inscriptioninitialdocument	2021-07-06 17:36:52.089127+00
59	sscpat	0020_auto_20210609_2343	2021-07-06 17:36:52.131647+00
60	sscpat	0021_auto_20210620_1408	2021-07-06 17:36:52.48718+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
veplwkir9zr7qghqrcjijqxxmdzfs4wk	YTI0MTg2YmM1MDJmMWQzMmIwOTg0MGE4MTEzZTk1OTZkNzUxMzE3OTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJhYzk0ODc0ZWIwNDBiZDJkNGZhNGVlNDdmZGQ3MDhhYWRiZTkwODViIn0=	2021-07-22 01:10:48.67295+00
\.


--
-- Data for Name: django_site; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.django_site (id, domain, name) FROM stdin;
1	sscpat.adm.edu.bo	sscpat
\.


--
-- Data for Name: socialaccount_socialaccount; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.socialaccount_socialaccount (id, provider, uid, last_login, date_joined, extra_data, user_id) FROM stdin;
\.


--
-- Data for Name: socialaccount_socialapp; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.socialaccount_socialapp (id, provider, name, client_id, secret, key) FROM stdin;
\.


--
-- Data for Name: socialaccount_socialapp_sites; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.socialaccount_socialapp_sites (id, socialapp_id, site_id) FROM stdin;
\.


--
-- Data for Name: socialaccount_socialtoken; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.socialaccount_socialtoken (id, token, token_secret, expires_at, account_id, app_id) FROM stdin;
\.


--
-- Data for Name: sscpat_academicperiod; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_academicperiod (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, title, year, semester, date_init, date_end) FROM stdin;
1	t	2021-07-08 01:24:12.243013+00	2021-07-08 01:24:12.243049+00	\N	\N	\N	\N	91303/123	2020	1	2021-07-09	2021-07-16
\.


--
-- Data for Name: sscpat_academicproject; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_academicproject (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, name, description) FROM stdin;
\.


--
-- Data for Name: sscpat_document; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_document (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, title, description, time_send) FROM stdin;
\.


--
-- Data for Name: sscpat_file; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_file (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, title, format, size, path, img_medium, thumbnail) FROM stdin;
\.


--
-- Data for Name: sscpat_inscription; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_inscription (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, state, title_academic_project, description_project, date_init, date_end, date_end_old, extended, academic_period_id, institution_id, modality_id, student_id, has_time_extension, month_duration, month_extension, month_max_duration) FROM stdin;
\.


--
-- Data for Name: sscpat_inscription_external_tutors; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_inscription_external_tutors (id, inscription_id, externaltutor_id) FROM stdin;
\.


--
-- Data for Name: sscpat_inscription_tutors; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_inscription_tutors (id, inscription_id, tutor_id) FROM stdin;
\.


--
-- Data for Name: sscpat_inscriptiondocument; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_inscriptiondocument (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, file_id, reviewed, document_id, inscription_id, deadline_date, reviewed_date) FROM stdin;
\.


--
-- Data for Name: sscpat_inscriptioninitialdocument; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_inscriptioninitialdocument (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, deadline_date, reviewed, reviewed_date, document_id, file_id, inscription_id) FROM stdin;
\.


--
-- Data for Name: sscpat_inscriptiontutor; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_inscriptiontutor (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, type, inscription_id, tutor_id) FROM stdin;
\.


--
-- Data for Name: sscpat_institution; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_institution (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, name, responsable, phone, address) FROM stdin;
\.


--
-- Data for Name: sscpat_modality; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_modality (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, title, description) FROM stdin;
\.


--
-- Data for Name: sscpat_modality_document_inscription; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_modality_document_inscription (id, modality_id, document_id) FROM stdin;
\.


--
-- Data for Name: sscpat_modality_documents; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_modality_documents (id, modality_id, document_id) FROM stdin;
\.


--
-- Data for Name: sscpat_modalityconfig; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_modalityconfig (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, max_author, month_duration, month_max_duration, has_time_extension, month_extension, has_tutors, has_institution, mandatory_month_report_progress_student, frequency_report_student, mandatory_month_report_tutor, frequency_report_tutor, mandatory_month_report_external_tutor, frequency_report_external_tutor, mandatory_month_report_institution, frequency_report_institution, send_final_document, send_abstract_final_document, send_resolution_commission_aproval, modality_id) FROM stdin;
\.


--
-- Data for Name: sscpat_modalityperiod; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_modalityperiod (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, fileconvocatory, academicperiod_id, modality_id) FROM stdin;
\.


--
-- Data for Name: sscpat_normative; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_normative (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, title, modality_id, format, path) FROM stdin;
\.


--
-- Data for Name: sscpat_notification; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_notification (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, user_id, format, inscription_id, inscription_document_id, is_read, tracing_progress_id, tracing_student_id, user_action_id) FROM stdin;
\.


--
-- Data for Name: sscpat_notificationtype; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_notificationtype (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, title, message_format) FROM stdin;
\.


--
-- Data for Name: sscpat_tracingprogress; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_tracingprogress (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, typetracing, institution_id, tracingstudent_id, user_id, description) FROM stdin;
\.


--
-- Data for Name: sscpat_tracingprogressfile; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_tracingprogressfile (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, title, format, path, img_medium, thumbnail, tracingprogress_id) FROM stdin;
\.


--
-- Data for Name: sscpat_tracingstudent; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_tracingstudent (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, description, month, is_final_document, reviewed_by_tutor, reviewed_by_admin, inscription_id, number, institution_report_was_sent, require_admin_review, require_external_tutor_review, require_institution_report, require_tutor_review, reviewed_by_external_tutor) FROM stdin;
\.


--
-- Data for Name: sscpat_tracingstudentfile; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_tracingstudentfile (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, title, format, path, tracingstudent_id, img_medium, thumbnail) FROM stdin;
\.


--
-- Data for Name: sscpat_user; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_user (id, password, last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, last_name2, type, "CI", "RU", "ID_TUTOR", "position", academic_degree, abbreviation, phone, telf, email, address) FROM stdin;
1	argon2$argon2i$v=19$m=512,t=2,p=2$QzB4cW9kYnJxTWJC$SjKt21b+TWWXRI2Sky2w8g	2021-07-08 01:10:48.668644+00	t	admin			t	t	2021-07-06 17:37:23.316175+00	t	2021-07-06 17:37:23.341397+00	2021-07-08 01:11:15.393931+00	\N	\N	1	\N		ADMIN	54321								admin@mail.com	
\.


--
-- Data for Name: sscpat_user_groups; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: sscpat_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: sscpat_userpicture; Type: TABLE DATA; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

COPY public.sscpat_userpicture (id, active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, is_current_profile_picture, img_l, img_m, thumbnail, user_id) FROM stdin;
\.


--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.account_emailaddress_id_seq', 1, false);


--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.account_emailconfirmation_id_seq', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 168, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, true);


--
-- Name: django_celery_beat_clockedschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.django_celery_beat_clockedschedule_id_seq', 1, false);


--
-- Name: django_celery_beat_crontabschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.django_celery_beat_crontabschedule_id_seq', 1, true);


--
-- Name: django_celery_beat_intervalschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.django_celery_beat_intervalschedule_id_seq', 1, false);


--
-- Name: django_celery_beat_periodictask_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.django_celery_beat_periodictask_id_seq', 1, true);


--
-- Name: django_celery_beat_solarschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.django_celery_beat_solarschedule_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 42, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 60, true);


--
-- Name: django_site_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.django_site_id_seq', 1, false);


--
-- Name: socialaccount_socialaccount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.socialaccount_socialaccount_id_seq', 1, false);


--
-- Name: socialaccount_socialapp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.socialaccount_socialapp_id_seq', 1, false);


--
-- Name: socialaccount_socialapp_sites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.socialaccount_socialapp_sites_id_seq', 1, false);


--
-- Name: socialaccount_socialtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.socialaccount_socialtoken_id_seq', 1, false);


--
-- Name: sscpat_academicperiod_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_academicperiod_id_seq', 1, true);


--
-- Name: sscpat_academicproject_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_academicproject_id_seq', 1, false);


--
-- Name: sscpat_document_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_document_id_seq', 1, false);


--
-- Name: sscpat_file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_file_id_seq', 1, false);


--
-- Name: sscpat_inscription_external_tutors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_inscription_external_tutors_id_seq', 1, false);


--
-- Name: sscpat_inscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_inscription_id_seq', 1, false);


--
-- Name: sscpat_inscription_tutors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_inscription_tutors_id_seq', 1, false);


--
-- Name: sscpat_inscriptiondocument_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_inscriptiondocument_id_seq', 1, false);


--
-- Name: sscpat_inscriptioninitialdocument_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_inscriptioninitialdocument_id_seq', 1, false);


--
-- Name: sscpat_inscriptiontutor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_inscriptiontutor_id_seq', 1, false);


--
-- Name: sscpat_institution_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_institution_id_seq', 1, false);


--
-- Name: sscpat_modality_document_inscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_modality_document_inscription_id_seq', 1, false);


--
-- Name: sscpat_modality_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_modality_documents_id_seq', 1, false);


--
-- Name: sscpat_modality_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_modality_id_seq', 1, false);


--
-- Name: sscpat_modalityconfig_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_modalityconfig_id_seq', 1, false);


--
-- Name: sscpat_modalityperiod_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_modalityperiod_id_seq', 1, false);


--
-- Name: sscpat_normative_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_normative_id_seq', 1, false);


--
-- Name: sscpat_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_notification_id_seq', 1, false);


--
-- Name: sscpat_notificationtype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_notificationtype_id_seq', 1, false);


--
-- Name: sscpat_tracingprogress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_tracingprogress_id_seq', 1, false);


--
-- Name: sscpat_tracingprogressfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_tracingprogressfile_id_seq', 1, false);


--
-- Name: sscpat_tracingstudent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_tracingstudent_id_seq', 1, false);


--
-- Name: sscpat_tracingstudentfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_tracingstudentfile_id_seq', 1, false);


--
-- Name: sscpat_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_user_groups_id_seq', 1, false);


--
-- Name: sscpat_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_user_id_seq', 6, true);


--
-- Name: sscpat_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_user_user_permissions_id_seq', 1, false);


--
-- Name: sscpat_userpicture_id_seq; Type: SEQUENCE SET; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

SELECT pg_catalog.setval('public.sscpat_userpicture_id_seq', 1, false);


--
-- Name: account_emailaddress account_emailaddress_email_key; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_email_key UNIQUE (email);


--
-- Name: account_emailaddress account_emailaddress_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_pkey PRIMARY KEY (id);


--
-- Name: account_emailconfirmation account_emailconfirmation_key_key; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_key_key UNIQUE (key);


--
-- Name: account_emailconfirmation account_emailconfirmation_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_celery_beat_clockedschedule django_celery_beat_clockedschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_clockedschedule
    ADD CONSTRAINT django_celery_beat_clockedschedule_pkey PRIMARY KEY (id);


--
-- Name: django_celery_beat_crontabschedule django_celery_beat_crontabschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_crontabschedule
    ADD CONSTRAINT django_celery_beat_crontabschedule_pkey PRIMARY KEY (id);


--
-- Name: django_celery_beat_intervalschedule django_celery_beat_intervalschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_intervalschedule
    ADD CONSTRAINT django_celery_beat_intervalschedule_pkey PRIMARY KEY (id);


--
-- Name: django_celery_beat_periodictask django_celery_beat_periodictask_name_key; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_periodictask_name_key UNIQUE (name);


--
-- Name: django_celery_beat_periodictask django_celery_beat_periodictask_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_periodictask_pkey PRIMARY KEY (id);


--
-- Name: django_celery_beat_periodictasks django_celery_beat_periodictasks_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_periodictasks
    ADD CONSTRAINT django_celery_beat_periodictasks_pkey PRIMARY KEY (ident);


--
-- Name: django_celery_beat_solarschedule django_celery_beat_solar_event_latitude_longitude_ba64999a_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_solarschedule
    ADD CONSTRAINT django_celery_beat_solar_event_latitude_longitude_ba64999a_uniq UNIQUE (event, latitude, longitude);


--
-- Name: django_celery_beat_solarschedule django_celery_beat_solarschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_solarschedule
    ADD CONSTRAINT django_celery_beat_solarschedule_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: django_site django_site_domain_a2e37b91_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_domain_a2e37b91_uniq UNIQUE (domain);


--
-- Name: django_site django_site_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialaccount socialaccount_socialaccount_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialaccount
    ADD CONSTRAINT socialaccount_socialaccount_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialaccount socialaccount_socialaccount_provider_uid_fc810c6e_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialaccount
    ADD CONSTRAINT socialaccount_socialaccount_provider_uid_fc810c6e_uniq UNIQUE (provider, uid);


--
-- Name: socialaccount_socialapp_sites socialaccount_socialapp__socialapp_id_site_id_71a9a768_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_socialapp__socialapp_id_site_id_71a9a768_uniq UNIQUE (socialapp_id, site_id);


--
-- Name: socialaccount_socialapp socialaccount_socialapp_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialapp
    ADD CONSTRAINT socialaccount_socialapp_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialapp_sites socialaccount_socialapp_sites_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_socialapp_sites_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialtoken socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq UNIQUE (app_id, account_id);


--
-- Name: socialaccount_socialtoken socialaccount_socialtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_socialtoken_pkey PRIMARY KEY (id);


--
-- Name: sscpat_academicperiod sscpat_academicperiod_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_academicperiod
    ADD CONSTRAINT sscpat_academicperiod_pkey PRIMARY KEY (id);


--
-- Name: sscpat_academicproject sscpat_academicproject_name_key; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_academicproject
    ADD CONSTRAINT sscpat_academicproject_name_key UNIQUE (name);


--
-- Name: sscpat_academicproject sscpat_academicproject_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_academicproject
    ADD CONSTRAINT sscpat_academicproject_pkey PRIMARY KEY (id);


--
-- Name: sscpat_document sscpat_document_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_document
    ADD CONSTRAINT sscpat_document_pkey PRIMARY KEY (id);


--
-- Name: sscpat_file sscpat_file_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_file
    ADD CONSTRAINT sscpat_file_pkey PRIMARY KEY (id);


--
-- Name: sscpat_inscription_external_tutors sscpat_inscription_exter_inscription_id_externalt_20942839_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription_external_tutors
    ADD CONSTRAINT sscpat_inscription_exter_inscription_id_externalt_20942839_uniq UNIQUE (inscription_id, externaltutor_id);


--
-- Name: sscpat_inscription_external_tutors sscpat_inscription_external_tutors_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription_external_tutors
    ADD CONSTRAINT sscpat_inscription_external_tutors_pkey PRIMARY KEY (id);


--
-- Name: sscpat_inscription sscpat_inscription_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription
    ADD CONSTRAINT sscpat_inscription_pkey PRIMARY KEY (id);


--
-- Name: sscpat_inscription sscpat_inscription_title_academic_project_1e9ede8d_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription
    ADD CONSTRAINT sscpat_inscription_title_academic_project_1e9ede8d_uniq UNIQUE (title_academic_project);


--
-- Name: sscpat_inscription_tutors sscpat_inscription_tutors_inscription_id_tutor_id_da9b1296_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription_tutors
    ADD CONSTRAINT sscpat_inscription_tutors_inscription_id_tutor_id_da9b1296_uniq UNIQUE (inscription_id, tutor_id);


--
-- Name: sscpat_inscription_tutors sscpat_inscription_tutors_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription_tutors
    ADD CONSTRAINT sscpat_inscription_tutors_pkey PRIMARY KEY (id);


--
-- Name: sscpat_inscriptiondocument sscpat_inscriptiondocument_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptiondocument
    ADD CONSTRAINT sscpat_inscriptiondocument_pkey PRIMARY KEY (id);


--
-- Name: sscpat_inscriptioninitialdocument sscpat_inscriptioninitialdocument_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptioninitialdocument
    ADD CONSTRAINT sscpat_inscriptioninitialdocument_pkey PRIMARY KEY (id);


--
-- Name: sscpat_inscriptiontutor sscpat_inscriptiontutor_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptiontutor
    ADD CONSTRAINT sscpat_inscriptiontutor_pkey PRIMARY KEY (id);


--
-- Name: sscpat_institution sscpat_institution_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_institution
    ADD CONSTRAINT sscpat_institution_pkey PRIMARY KEY (id);


--
-- Name: sscpat_modality_document_inscription sscpat_modality_document_inscription_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality_document_inscription
    ADD CONSTRAINT sscpat_modality_document_inscription_pkey PRIMARY KEY (id);


--
-- Name: sscpat_modality_document_inscription sscpat_modality_document_modality_id_document_id_8795c37e_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality_document_inscription
    ADD CONSTRAINT sscpat_modality_document_modality_id_document_id_8795c37e_uniq UNIQUE (modality_id, document_id);


--
-- Name: sscpat_modality_documents sscpat_modality_documents_modality_id_document_id_4849f5e9_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality_documents
    ADD CONSTRAINT sscpat_modality_documents_modality_id_document_id_4849f5e9_uniq UNIQUE (modality_id, document_id);


--
-- Name: sscpat_modality_documents sscpat_modality_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality_documents
    ADD CONSTRAINT sscpat_modality_documents_pkey PRIMARY KEY (id);


--
-- Name: sscpat_modality sscpat_modality_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality
    ADD CONSTRAINT sscpat_modality_pkey PRIMARY KEY (id);


--
-- Name: sscpat_modality sscpat_modality_title_key; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality
    ADD CONSTRAINT sscpat_modality_title_key UNIQUE (title);


--
-- Name: sscpat_modalityconfig sscpat_modalityconfig_modality_id_key; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modalityconfig
    ADD CONSTRAINT sscpat_modalityconfig_modality_id_key UNIQUE (modality_id);


--
-- Name: sscpat_modalityconfig sscpat_modalityconfig_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modalityconfig
    ADD CONSTRAINT sscpat_modalityconfig_pkey PRIMARY KEY (id);


--
-- Name: sscpat_modalityperiod sscpat_modalityperiod_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modalityperiod
    ADD CONSTRAINT sscpat_modalityperiod_pkey PRIMARY KEY (id);


--
-- Name: sscpat_normative sscpat_normative_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_normative
    ADD CONSTRAINT sscpat_normative_pkey PRIMARY KEY (id);


--
-- Name: sscpat_notification sscpat_notification_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_notification
    ADD CONSTRAINT sscpat_notification_pkey PRIMARY KEY (id);


--
-- Name: sscpat_notificationtype sscpat_notificationtype_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_notificationtype
    ADD CONSTRAINT sscpat_notificationtype_pkey PRIMARY KEY (id);


--
-- Name: sscpat_tracingprogress sscpat_tracingprogress_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingprogress
    ADD CONSTRAINT sscpat_tracingprogress_pkey PRIMARY KEY (id);


--
-- Name: sscpat_tracingprogressfile sscpat_tracingprogressfile_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingprogressfile
    ADD CONSTRAINT sscpat_tracingprogressfile_pkey PRIMARY KEY (id);


--
-- Name: sscpat_tracingstudent sscpat_tracingstudent_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingstudent
    ADD CONSTRAINT sscpat_tracingstudent_pkey PRIMARY KEY (id);


--
-- Name: sscpat_tracingstudentfile sscpat_tracingstudentfile_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingstudentfile
    ADD CONSTRAINT sscpat_tracingstudentfile_pkey PRIMARY KEY (id);


--
-- Name: sscpat_user sscpat_user_CI_key; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user
    ADD CONSTRAINT "sscpat_user_CI_key" UNIQUE ("CI");


--
-- Name: sscpat_user sscpat_user_email_key; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user
    ADD CONSTRAINT sscpat_user_email_key UNIQUE (email);


--
-- Name: sscpat_user_groups sscpat_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user_groups
    ADD CONSTRAINT sscpat_user_groups_pkey PRIMARY KEY (id);


--
-- Name: sscpat_user_groups sscpat_user_groups_user_id_group_id_9b086e5b_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user_groups
    ADD CONSTRAINT sscpat_user_groups_user_id_group_id_9b086e5b_uniq UNIQUE (user_id, group_id);


--
-- Name: sscpat_user sscpat_user_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user
    ADD CONSTRAINT sscpat_user_pkey PRIMARY KEY (id);


--
-- Name: sscpat_user_user_permissions sscpat_user_user_permiss_user_id_permission_id_8fdbd5d2_uniq; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user_user_permissions
    ADD CONSTRAINT sscpat_user_user_permiss_user_id_permission_id_8fdbd5d2_uniq UNIQUE (user_id, permission_id);


--
-- Name: sscpat_user_user_permissions sscpat_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user_user_permissions
    ADD CONSTRAINT sscpat_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: sscpat_user sscpat_user_username_key; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user
    ADD CONSTRAINT sscpat_user_username_key UNIQUE (username);


--
-- Name: sscpat_userpicture sscpat_userpicture_pkey; Type: CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_userpicture
    ADD CONSTRAINT sscpat_userpicture_pkey PRIMARY KEY (id);


--
-- Name: account_emailaddress_email_03be32b2_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX account_emailaddress_email_03be32b2_like ON public.account_emailaddress USING btree (email varchar_pattern_ops);


--
-- Name: account_emailaddress_user_id_2c513194; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX account_emailaddress_user_id_2c513194 ON public.account_emailaddress USING btree (user_id);


--
-- Name: account_emailconfirmation_email_address_id_5b7f8c58; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX account_emailconfirmation_email_address_id_5b7f8c58 ON public.account_emailconfirmation USING btree (email_address_id);


--
-- Name: account_emailconfirmation_key_f43612bd_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX account_emailconfirmation_key_f43612bd_like ON public.account_emailconfirmation USING btree (key varchar_pattern_ops);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_celery_beat_periodictask_clocked_id_47a69f82; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX django_celery_beat_periodictask_clocked_id_47a69f82 ON public.django_celery_beat_periodictask USING btree (clocked_id);


--
-- Name: django_celery_beat_periodictask_crontab_id_d3cba168; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX django_celery_beat_periodictask_crontab_id_d3cba168 ON public.django_celery_beat_periodictask USING btree (crontab_id);


--
-- Name: django_celery_beat_periodictask_interval_id_a8ca27da; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX django_celery_beat_periodictask_interval_id_a8ca27da ON public.django_celery_beat_periodictask USING btree (interval_id);


--
-- Name: django_celery_beat_periodictask_name_265a36b7_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX django_celery_beat_periodictask_name_265a36b7_like ON public.django_celery_beat_periodictask USING btree (name varchar_pattern_ops);


--
-- Name: django_celery_beat_periodictask_solar_id_a87ce72c; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX django_celery_beat_periodictask_solar_id_a87ce72c ON public.django_celery_beat_periodictask USING btree (solar_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: django_site_domain_a2e37b91_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX django_site_domain_a2e37b91_like ON public.django_site USING btree (domain varchar_pattern_ops);


--
-- Name: socialaccount_socialaccount_user_id_8146e70c; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX socialaccount_socialaccount_user_id_8146e70c ON public.socialaccount_socialaccount USING btree (user_id);


--
-- Name: socialaccount_socialapp_sites_site_id_2579dee5; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX socialaccount_socialapp_sites_site_id_2579dee5 ON public.socialaccount_socialapp_sites USING btree (site_id);


--
-- Name: socialaccount_socialapp_sites_socialapp_id_97fb6e7d; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX socialaccount_socialapp_sites_socialapp_id_97fb6e7d ON public.socialaccount_socialapp_sites USING btree (socialapp_id);


--
-- Name: socialaccount_socialtoken_account_id_951f210e; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX socialaccount_socialtoken_account_id_951f210e ON public.socialaccount_socialtoken USING btree (account_id);


--
-- Name: socialaccount_socialtoken_app_id_636a42d7; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX socialaccount_socialtoken_app_id_636a42d7 ON public.socialaccount_socialtoken USING btree (app_id);


--
-- Name: sscpat_academicproject_name_252fde2d_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_academicproject_name_252fde2d_like ON public.sscpat_academicproject USING btree (name varchar_pattern_ops);


--
-- Name: sscpat_inscription_academic_period_id_4dd0398c; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscription_academic_period_id_4dd0398c ON public.sscpat_inscription USING btree (academic_period_id);


--
-- Name: sscpat_inscription_external_tutors_externaltutor_id_82b11c96; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscription_external_tutors_externaltutor_id_82b11c96 ON public.sscpat_inscription_external_tutors USING btree (externaltutor_id);


--
-- Name: sscpat_inscription_external_tutors_inscription_id_01870da5; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscription_external_tutors_inscription_id_01870da5 ON public.sscpat_inscription_external_tutors USING btree (inscription_id);


--
-- Name: sscpat_inscription_institution_id_5da9eb2c; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscription_institution_id_5da9eb2c ON public.sscpat_inscription USING btree (institution_id);


--
-- Name: sscpat_inscription_modality_id_d6c1e307; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscription_modality_id_d6c1e307 ON public.sscpat_inscription USING btree (modality_id);


--
-- Name: sscpat_inscription_student_id_c8f59a6c; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscription_student_id_c8f59a6c ON public.sscpat_inscription USING btree (student_id);


--
-- Name: sscpat_inscription_title_academic_project_1e9ede8d_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscription_title_academic_project_1e9ede8d_like ON public.sscpat_inscription USING btree (title_academic_project text_pattern_ops);


--
-- Name: sscpat_inscription_tutors_inscription_id_d8ddb4ab; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscription_tutors_inscription_id_d8ddb4ab ON public.sscpat_inscription_tutors USING btree (inscription_id);


--
-- Name: sscpat_inscription_tutors_tutor_id_3ee1eb39; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscription_tutors_tutor_id_3ee1eb39 ON public.sscpat_inscription_tutors USING btree (tutor_id);


--
-- Name: sscpat_inscriptiondocument_document_id_9f16de6d; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscriptiondocument_document_id_9f16de6d ON public.sscpat_inscriptiondocument USING btree (document_id);


--
-- Name: sscpat_inscriptiondocument_file_id_15b00483; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscriptiondocument_file_id_15b00483 ON public.sscpat_inscriptiondocument USING btree (file_id);


--
-- Name: sscpat_inscriptiondocument_inscription_id_14533602; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscriptiondocument_inscription_id_14533602 ON public.sscpat_inscriptiondocument USING btree (inscription_id);


--
-- Name: sscpat_inscriptioninitialdocument_document_id_10e62084; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscriptioninitialdocument_document_id_10e62084 ON public.sscpat_inscriptioninitialdocument USING btree (document_id);


--
-- Name: sscpat_inscriptioninitialdocument_file_id_7f4cd21f; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscriptioninitialdocument_file_id_7f4cd21f ON public.sscpat_inscriptioninitialdocument USING btree (file_id);


--
-- Name: sscpat_inscriptioninitialdocument_inscription_id_77a680cb; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscriptioninitialdocument_inscription_id_77a680cb ON public.sscpat_inscriptioninitialdocument USING btree (inscription_id);


--
-- Name: sscpat_inscriptiontutor_inscription_id_96605992; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscriptiontutor_inscription_id_96605992 ON public.sscpat_inscriptiontutor USING btree (inscription_id);


--
-- Name: sscpat_inscriptiontutor_tutor_id_8f540b22; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_inscriptiontutor_tutor_id_8f540b22 ON public.sscpat_inscriptiontutor USING btree (tutor_id);


--
-- Name: sscpat_modality_document_inscription_document_id_add9619e; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_modality_document_inscription_document_id_add9619e ON public.sscpat_modality_document_inscription USING btree (document_id);


--
-- Name: sscpat_modality_document_inscription_modality_id_001eddd6; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_modality_document_inscription_modality_id_001eddd6 ON public.sscpat_modality_document_inscription USING btree (modality_id);


--
-- Name: sscpat_modality_documents_document_id_019e95b6; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_modality_documents_document_id_019e95b6 ON public.sscpat_modality_documents USING btree (document_id);


--
-- Name: sscpat_modality_documents_modality_id_af32148f; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_modality_documents_modality_id_af32148f ON public.sscpat_modality_documents USING btree (modality_id);


--
-- Name: sscpat_modality_title_1a010a6f_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_modality_title_1a010a6f_like ON public.sscpat_modality USING btree (title varchar_pattern_ops);


--
-- Name: sscpat_modalityperiod_academicperiod_id_001f7cc8; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_modalityperiod_academicperiod_id_001f7cc8 ON public.sscpat_modalityperiod USING btree (academicperiod_id);


--
-- Name: sscpat_modalityperiod_modality_id_d6a77ddf; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_modalityperiod_modality_id_d6a77ddf ON public.sscpat_modalityperiod USING btree (modality_id);


--
-- Name: sscpat_normative_modality_id_031e760c; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_normative_modality_id_031e760c ON public.sscpat_normative USING btree (modality_id);


--
-- Name: sscpat_notification_inscription_document_id_465bd153; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_notification_inscription_document_id_465bd153 ON public.sscpat_notification USING btree (inscription_document_id);


--
-- Name: sscpat_notification_inscription_id_848e8b53; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_notification_inscription_id_848e8b53 ON public.sscpat_notification USING btree (inscription_id);


--
-- Name: sscpat_notification_tracing_progress_id_6ad8e3d9; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_notification_tracing_progress_id_6ad8e3d9 ON public.sscpat_notification USING btree (tracing_progress_id);


--
-- Name: sscpat_notification_tracing_student_id_0bf16e67; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_notification_tracing_student_id_0bf16e67 ON public.sscpat_notification USING btree (tracing_student_id);


--
-- Name: sscpat_notification_user_action_id_a2749140; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_notification_user_action_id_a2749140 ON public.sscpat_notification USING btree (user_action_id);


--
-- Name: sscpat_notification_user_id_36ec146c; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_notification_user_id_36ec146c ON public.sscpat_notification USING btree (user_id);


--
-- Name: sscpat_tracingprogress_institution_id_0ab3609a; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_tracingprogress_institution_id_0ab3609a ON public.sscpat_tracingprogress USING btree (institution_id);


--
-- Name: sscpat_tracingprogress_tracingstudent_id_d4169fa3; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_tracingprogress_tracingstudent_id_d4169fa3 ON public.sscpat_tracingprogress USING btree (tracingstudent_id);


--
-- Name: sscpat_tracingprogress_tutor_id_032bcaa2; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_tracingprogress_tutor_id_032bcaa2 ON public.sscpat_tracingprogress USING btree (user_id);


--
-- Name: sscpat_tracingprogressfile_tracingprogress_id_f55e7afe; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_tracingprogressfile_tracingprogress_id_f55e7afe ON public.sscpat_tracingprogressfile USING btree (tracingprogress_id);


--
-- Name: sscpat_tracingstudent_inscription_id_6a460dfc; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_tracingstudent_inscription_id_6a460dfc ON public.sscpat_tracingstudent USING btree (inscription_id);


--
-- Name: sscpat_tracingstudentfile_tracingstudent_id_62ae8684; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_tracingstudentfile_tracingstudent_id_62ae8684 ON public.sscpat_tracingstudentfile USING btree (tracingstudent_id);


--
-- Name: sscpat_user_CI_d09525ea_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX "sscpat_user_CI_d09525ea_like" ON public.sscpat_user USING btree ("CI" varchar_pattern_ops);


--
-- Name: sscpat_user_email_fc536cd3_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_user_email_fc536cd3_like ON public.sscpat_user USING btree (email varchar_pattern_ops);


--
-- Name: sscpat_user_groups_group_id_a3977359; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_user_groups_group_id_a3977359 ON public.sscpat_user_groups USING btree (group_id);


--
-- Name: sscpat_user_groups_user_id_6853e9cd; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_user_groups_user_id_6853e9cd ON public.sscpat_user_groups USING btree (user_id);


--
-- Name: sscpat_user_user_permissions_permission_id_c06796e6; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_user_user_permissions_permission_id_c06796e6 ON public.sscpat_user_user_permissions USING btree (permission_id);


--
-- Name: sscpat_user_user_permissions_user_id_dbffd1d9; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_user_user_permissions_user_id_dbffd1d9 ON public.sscpat_user_user_permissions USING btree (user_id);


--
-- Name: sscpat_user_username_4d4a938a_like; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_user_username_4d4a938a_like ON public.sscpat_user USING btree (username varchar_pattern_ops);


--
-- Name: sscpat_userpicture_user_id_8cff13aa; Type: INDEX; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

CREATE INDEX sscpat_userpicture_user_id_8cff13aa ON public.sscpat_userpicture USING btree (user_id);


--
-- Name: account_emailaddress account_emailaddress_user_id_2c513194_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_user_id_2c513194_fk_sscpat_user_id FOREIGN KEY (user_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_emailconfirmation account_emailconfirm_email_address_id_5b7f8c58_fk_account_e; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirm_email_address_id_5b7f8c58_fk_account_e FOREIGN KEY (email_address_id) REFERENCES public.account_emailaddress(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_sscpat_user_id FOREIGN KEY (user_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_celery_beat_periodictask django_celery_beat_p_clocked_id_47a69f82_fk_django_ce; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_p_clocked_id_47a69f82_fk_django_ce FOREIGN KEY (clocked_id) REFERENCES public.django_celery_beat_clockedschedule(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_celery_beat_periodictask django_celery_beat_p_crontab_id_d3cba168_fk_django_ce; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_p_crontab_id_d3cba168_fk_django_ce FOREIGN KEY (crontab_id) REFERENCES public.django_celery_beat_crontabschedule(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_celery_beat_periodictask django_celery_beat_p_interval_id_a8ca27da_fk_django_ce; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_p_interval_id_a8ca27da_fk_django_ce FOREIGN KEY (interval_id) REFERENCES public.django_celery_beat_intervalschedule(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_celery_beat_periodictask django_celery_beat_p_solar_id_a87ce72c_fk_django_ce; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.django_celery_beat_periodictask
    ADD CONSTRAINT django_celery_beat_p_solar_id_a87ce72c_fk_django_ce FOREIGN KEY (solar_id) REFERENCES public.django_celery_beat_solarschedule(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialtoken socialaccount_social_account_id_951f210e_fk_socialacc; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_social_account_id_951f210e_fk_socialacc FOREIGN KEY (account_id) REFERENCES public.socialaccount_socialaccount(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialtoken socialaccount_social_app_id_636a42d7_fk_socialacc; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_social_app_id_636a42d7_fk_socialacc FOREIGN KEY (app_id) REFERENCES public.socialaccount_socialapp(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialapp_sites socialaccount_social_site_id_2579dee5_fk_django_si; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_social_site_id_2579dee5_fk_django_si FOREIGN KEY (site_id) REFERENCES public.django_site(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialapp_sites socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc FOREIGN KEY (socialapp_id) REFERENCES public.socialaccount_socialapp(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialaccount socialaccount_socialaccount_user_id_8146e70c_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.socialaccount_socialaccount
    ADD CONSTRAINT socialaccount_socialaccount_user_id_8146e70c_fk_sscpat_user_id FOREIGN KEY (user_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscription sscpat_inscription_academic_period_id_4dd0398c_fk_sscpat_ac; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription
    ADD CONSTRAINT sscpat_inscription_academic_period_id_4dd0398c_fk_sscpat_ac FOREIGN KEY (academic_period_id) REFERENCES public.sscpat_academicperiod(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscription_external_tutors sscpat_inscription_e_externaltutor_id_82b11c96_fk_sscpat_us; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription_external_tutors
    ADD CONSTRAINT sscpat_inscription_e_externaltutor_id_82b11c96_fk_sscpat_us FOREIGN KEY (externaltutor_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscription_external_tutors sscpat_inscription_e_inscription_id_01870da5_fk_sscpat_in; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription_external_tutors
    ADD CONSTRAINT sscpat_inscription_e_inscription_id_01870da5_fk_sscpat_in FOREIGN KEY (inscription_id) REFERENCES public.sscpat_inscription(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscription sscpat_inscription_institution_id_5da9eb2c_fk_sscpat_in; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription
    ADD CONSTRAINT sscpat_inscription_institution_id_5da9eb2c_fk_sscpat_in FOREIGN KEY (institution_id) REFERENCES public.sscpat_institution(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscription sscpat_inscription_modality_id_d6c1e307_fk_sscpat_modality_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription
    ADD CONSTRAINT sscpat_inscription_modality_id_d6c1e307_fk_sscpat_modality_id FOREIGN KEY (modality_id) REFERENCES public.sscpat_modality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscription sscpat_inscription_student_id_c8f59a6c_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription
    ADD CONSTRAINT sscpat_inscription_student_id_c8f59a6c_fk_sscpat_user_id FOREIGN KEY (student_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscription_tutors sscpat_inscription_t_inscription_id_d8ddb4ab_fk_sscpat_in; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription_tutors
    ADD CONSTRAINT sscpat_inscription_t_inscription_id_d8ddb4ab_fk_sscpat_in FOREIGN KEY (inscription_id) REFERENCES public.sscpat_inscription(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscription_tutors sscpat_inscription_tutors_tutor_id_3ee1eb39_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscription_tutors
    ADD CONSTRAINT sscpat_inscription_tutors_tutor_id_3ee1eb39_fk_sscpat_user_id FOREIGN KEY (tutor_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscriptiondocument sscpat_inscriptiondo_document_id_9f16de6d_fk_sscpat_do; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptiondocument
    ADD CONSTRAINT sscpat_inscriptiondo_document_id_9f16de6d_fk_sscpat_do FOREIGN KEY (document_id) REFERENCES public.sscpat_document(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscriptiondocument sscpat_inscriptiondo_inscription_id_14533602_fk_sscpat_in; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptiondocument
    ADD CONSTRAINT sscpat_inscriptiondo_inscription_id_14533602_fk_sscpat_in FOREIGN KEY (inscription_id) REFERENCES public.sscpat_inscription(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscriptiondocument sscpat_inscriptiondocument_file_id_15b00483_fk_sscpat_file_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptiondocument
    ADD CONSTRAINT sscpat_inscriptiondocument_file_id_15b00483_fk_sscpat_file_id FOREIGN KEY (file_id) REFERENCES public.sscpat_file(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscriptioninitialdocument sscpat_inscriptionin_document_id_10e62084_fk_sscpat_do; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptioninitialdocument
    ADD CONSTRAINT sscpat_inscriptionin_document_id_10e62084_fk_sscpat_do FOREIGN KEY (document_id) REFERENCES public.sscpat_document(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscriptioninitialdocument sscpat_inscriptionin_file_id_7f4cd21f_fk_sscpat_fi; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptioninitialdocument
    ADD CONSTRAINT sscpat_inscriptionin_file_id_7f4cd21f_fk_sscpat_fi FOREIGN KEY (file_id) REFERENCES public.sscpat_file(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscriptioninitialdocument sscpat_inscriptionin_inscription_id_77a680cb_fk_sscpat_in; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptioninitialdocument
    ADD CONSTRAINT sscpat_inscriptionin_inscription_id_77a680cb_fk_sscpat_in FOREIGN KEY (inscription_id) REFERENCES public.sscpat_inscription(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscriptiontutor sscpat_inscriptiontu_inscription_id_96605992_fk_sscpat_in; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptiontutor
    ADD CONSTRAINT sscpat_inscriptiontu_inscription_id_96605992_fk_sscpat_in FOREIGN KEY (inscription_id) REFERENCES public.sscpat_inscription(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_inscriptiontutor sscpat_inscriptiontutor_tutor_id_8f540b22_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_inscriptiontutor
    ADD CONSTRAINT sscpat_inscriptiontutor_tutor_id_8f540b22_fk_sscpat_user_id FOREIGN KEY (tutor_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_modality_documents sscpat_modality_docu_document_id_019e95b6_fk_sscpat_do; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality_documents
    ADD CONSTRAINT sscpat_modality_docu_document_id_019e95b6_fk_sscpat_do FOREIGN KEY (document_id) REFERENCES public.sscpat_document(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_modality_document_inscription sscpat_modality_docu_document_id_add9619e_fk_sscpat_do; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality_document_inscription
    ADD CONSTRAINT sscpat_modality_docu_document_id_add9619e_fk_sscpat_do FOREIGN KEY (document_id) REFERENCES public.sscpat_document(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_modality_document_inscription sscpat_modality_docu_modality_id_001eddd6_fk_sscpat_mo; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality_document_inscription
    ADD CONSTRAINT sscpat_modality_docu_modality_id_001eddd6_fk_sscpat_mo FOREIGN KEY (modality_id) REFERENCES public.sscpat_modality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_modality_documents sscpat_modality_docu_modality_id_af32148f_fk_sscpat_mo; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modality_documents
    ADD CONSTRAINT sscpat_modality_docu_modality_id_af32148f_fk_sscpat_mo FOREIGN KEY (modality_id) REFERENCES public.sscpat_modality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_modalityconfig sscpat_modalityconfi_modality_id_bf4674f1_fk_sscpat_mo; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modalityconfig
    ADD CONSTRAINT sscpat_modalityconfi_modality_id_bf4674f1_fk_sscpat_mo FOREIGN KEY (modality_id) REFERENCES public.sscpat_modality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_modalityperiod sscpat_modalityperio_academicperiod_id_001f7cc8_fk_sscpat_ac; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modalityperiod
    ADD CONSTRAINT sscpat_modalityperio_academicperiod_id_001f7cc8_fk_sscpat_ac FOREIGN KEY (academicperiod_id) REFERENCES public.sscpat_academicperiod(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_modalityperiod sscpat_modalityperio_modality_id_d6a77ddf_fk_sscpat_mo; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_modalityperiod
    ADD CONSTRAINT sscpat_modalityperio_modality_id_d6a77ddf_fk_sscpat_mo FOREIGN KEY (modality_id) REFERENCES public.sscpat_modality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_normative sscpat_normative_modality_id_031e760c_fk_sscpat_modality_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_normative
    ADD CONSTRAINT sscpat_normative_modality_id_031e760c_fk_sscpat_modality_id FOREIGN KEY (modality_id) REFERENCES public.sscpat_modality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_notification sscpat_notification_inscription_document_465bd153_fk_sscpat_in; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_notification
    ADD CONSTRAINT sscpat_notification_inscription_document_465bd153_fk_sscpat_in FOREIGN KEY (inscription_document_id) REFERENCES public.sscpat_inscriptiondocument(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_notification sscpat_notification_inscription_id_848e8b53_fk_sscpat_in; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_notification
    ADD CONSTRAINT sscpat_notification_inscription_id_848e8b53_fk_sscpat_in FOREIGN KEY (inscription_id) REFERENCES public.sscpat_inscription(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_notification sscpat_notification_tracing_progress_id_6ad8e3d9_fk_sscpat_tr; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_notification
    ADD CONSTRAINT sscpat_notification_tracing_progress_id_6ad8e3d9_fk_sscpat_tr FOREIGN KEY (tracing_progress_id) REFERENCES public.sscpat_tracingprogress(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_notification sscpat_notification_tracing_student_id_0bf16e67_fk_sscpat_tr; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_notification
    ADD CONSTRAINT sscpat_notification_tracing_student_id_0bf16e67_fk_sscpat_tr FOREIGN KEY (tracing_student_id) REFERENCES public.sscpat_tracingstudent(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_notification sscpat_notification_user_action_id_a2749140_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_notification
    ADD CONSTRAINT sscpat_notification_user_action_id_a2749140_fk_sscpat_user_id FOREIGN KEY (user_action_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_notification sscpat_notification_user_id_36ec146c_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_notification
    ADD CONSTRAINT sscpat_notification_user_id_36ec146c_fk_sscpat_user_id FOREIGN KEY (user_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_tracingprogress sscpat_tracingprogre_institution_id_0ab3609a_fk_sscpat_in; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingprogress
    ADD CONSTRAINT sscpat_tracingprogre_institution_id_0ab3609a_fk_sscpat_in FOREIGN KEY (institution_id) REFERENCES public.sscpat_institution(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_tracingprogressfile sscpat_tracingprogre_tracingprogress_id_f55e7afe_fk_sscpat_tr; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingprogressfile
    ADD CONSTRAINT sscpat_tracingprogre_tracingprogress_id_f55e7afe_fk_sscpat_tr FOREIGN KEY (tracingprogress_id) REFERENCES public.sscpat_tracingprogress(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_tracingprogress sscpat_tracingprogre_tracingstudent_id_d4169fa3_fk_sscpat_tr; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingprogress
    ADD CONSTRAINT sscpat_tracingprogre_tracingstudent_id_d4169fa3_fk_sscpat_tr FOREIGN KEY (tracingstudent_id) REFERENCES public.sscpat_tracingstudent(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_tracingprogress sscpat_tracingprogress_user_id_06d0c336_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingprogress
    ADD CONSTRAINT sscpat_tracingprogress_user_id_06d0c336_fk_sscpat_user_id FOREIGN KEY (user_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_tracingstudent sscpat_tracingstuden_inscription_id_6a460dfc_fk_sscpat_in; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingstudent
    ADD CONSTRAINT sscpat_tracingstuden_inscription_id_6a460dfc_fk_sscpat_in FOREIGN KEY (inscription_id) REFERENCES public.sscpat_inscription(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_tracingstudentfile sscpat_tracingstuden_tracingstudent_id_62ae8684_fk_sscpat_tr; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_tracingstudentfile
    ADD CONSTRAINT sscpat_tracingstuden_tracingstudent_id_62ae8684_fk_sscpat_tr FOREIGN KEY (tracingstudent_id) REFERENCES public.sscpat_tracingstudent(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_user_groups sscpat_user_groups_group_id_a3977359_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user_groups
    ADD CONSTRAINT sscpat_user_groups_group_id_a3977359_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_user_groups sscpat_user_groups_user_id_6853e9cd_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user_groups
    ADD CONSTRAINT sscpat_user_groups_user_id_6853e9cd_fk_sscpat_user_id FOREIGN KEY (user_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_user_user_permissions sscpat_user_user_per_permission_id_c06796e6_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user_user_permissions
    ADD CONSTRAINT sscpat_user_user_per_permission_id_c06796e6_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_user_user_permissions sscpat_user_user_permissions_user_id_dbffd1d9_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_user_user_permissions
    ADD CONSTRAINT sscpat_user_user_permissions_user_id_dbffd1d9_fk_sscpat_user_id FOREIGN KEY (user_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: sscpat_userpicture sscpat_userpicture_user_id_8cff13aa_fk_sscpat_user_id; Type: FK CONSTRAINT; Schema: public; Owner: EHCjwXpAoZFGdigvQmFkTaMEvkGxmGzw
--

ALTER TABLE ONLY public.sscpat_userpicture
    ADD CONSTRAINT sscpat_userpicture_user_id_8cff13aa_fk_sscpat_user_id FOREIGN KEY (user_id) REFERENCES public.sscpat_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

