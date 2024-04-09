--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2024-04-08 05:58:11

SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = on;

SELECT pg_catalog.set_config ('search_path', '', false);

SET check_function_bodies = false;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5025 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';

--
-- TOC entry 867 (class 1247 OID 19984)
-- Name: roles; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.roles AS ENUM('admin', 'staff', 'customer');

ALTER TYPE public.roles OWNER TO postgres;

--
-- TOC entry 876 (class 1247 OID 20017)
-- Name: sizes; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.sizes AS ENUM('small', 'medium', 'large');

ALTER TYPE public.sizes OWNER TO postgres;

--
-- TOC entry 897 (class 1247 OID 20115)
-- Name: statuses; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.statuses AS ENUM(
    'on-process', 'delivered', 'canceled', 'ready-to-pick'
);

ALTER TYPE public.statuses OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 20074)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL, name character varying(30) NOT NULL, "createdAt" timestamp without time zone DEFAULT now(), "updatedAt" timestamp without time zone
);

ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 20073)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 227
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;

--
-- TOC entry 238 (class 1259 OID 20172)
-- Name: message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message (
    id integer NOT NULL, "recipientId" integer NOT NULL, "senderId" integer NOT NULL, text text NOT NULL, "createdAt" timestamp without time zone DEFAULT now(), "updatedAt" timestamp without time zone
);

ALTER TABLE public.message OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 20171)
-- Name: message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.message_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.message_id_seq OWNER TO postgres;

--
-- TOC entry 5027 (class 0 OID 0)
-- Dependencies: 237
-- Name: message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;

--
-- TOC entry 236 (class 1259 OID 20144)
-- Name: orderDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."orderDetails" (
    id integer NOT NULL,
    "productId" integer,
    "productSizeId" integer,
    "productVariantId" integer,
    quantity integer NOT NULL,
    "orderId" integer,
    "subTotal" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);

ALTER TABLE public."orderDetails" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 20143)
-- Name: orderDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."orderDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."orderDetails_id_seq" OWNER TO postgres;

--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 235
-- Name: orderDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."orderDetails_id_seq" OWNED BY public."orderDetails".id;

--
-- TOC entry 234 (class 1259 OID 20124)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "userId" integer,
    "orderNumber" character varying(30) NOT NULL,
    "promoId" integer,
    total integer,
    "taxAmount" integer,
    status public.statuses DEFAULT 'on-process'::public.statuses,
    "deliveryAddress" text,
    "fullName" character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);

ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 20123)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 233
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;

--
-- TOC entry 230 (class 1259 OID 20084)
-- Name: productCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productCategories" (
    id integer NOT NULL,
    "productId" integer,
    "categoryId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);

ALTER TABLE public."productCategories" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 20083)
-- Name: productCategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productCategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."productCategories_id_seq" OWNER TO postgres;

--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 229
-- Name: productCategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productCategories_id_seq" OWNED BY public."productCategories".id;

--
-- TOC entry 226 (class 1259 OID 20054)
-- Name: productRatings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productRatings" (
    id integer NOT NULL,
    "productId" integer,
    rate integer NOT NULL,
    "reviewMessage" text,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);

ALTER TABLE public."productRatings" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 20053)
-- Name: productRatings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productRatings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."productRatings_id_seq" OWNER TO postgres;

--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 225
-- Name: productRatings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productRatings_id_seq" OWNED BY public."productRatings".id;

--
-- TOC entry 220 (class 1259 OID 20024)
-- Name: productSize; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productSize" (
    id integer NOT NULL,
    size public.sizes NOT NULL,
    "additionalPrice" integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);

ALTER TABLE public."productSize" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 20023)
-- Name: productSize_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productSize_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."productSize_id_seq" OWNER TO postgres;

--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 219
-- Name: productSize_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productSize_id_seq" OWNED BY public."productSize".id;

--
-- TOC entry 240 (class 1259 OID 26965)
-- Name: productTags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productTags" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "tagId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);

ALTER TABLE public."productTags" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 20044)
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL, name character varying(30) NOT NULL, "createdAt" timestamp without time zone DEFAULT now(), "updatedAt" timestamp without time zone
);

ALTER TABLE public.tags OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 20043)
-- Name: productTags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productTags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."productTags_id_seq" OWNER TO postgres;

--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 223
-- Name: productTags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productTags_id_seq" OWNED BY public.tags.id;

--
-- TOC entry 239 (class 1259 OID 26964)
-- Name: productTags_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productTags_id_seq1"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."productTags_id_seq1" OWNER TO postgres;

--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 239
-- Name: productTags_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productTags_id_seq1" OWNED BY public."productTags".id;

--
-- TOC entry 222 (class 1259 OID 20033)
-- Name: productVariant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productVariant" (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    "additionalPrice" integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);

ALTER TABLE public."productVariant" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 20032)
-- Name: productVariant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productVariant_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."productVariant_id_seq" OWNER TO postgres;

--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 221
-- Name: productVariant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productVariant_id_seq" OWNED BY public."productVariant".id;

--
-- TOC entry 218 (class 1259 OID 20005)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL, name character varying(30) NOT NULL, description text NOT NULL, "basePrice" integer NOT NULL, image character varying(255), discount double precision, "isRecommended" boolean, "createdAt" timestamp without time zone DEFAULT now(), "updatedAt" timestamp without time zone
);

ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 20004)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 217
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;

--
-- TOC entry 232 (class 1259 OID 20102)
-- Name: promo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promo (
    id integer NOT NULL, name character varying(30) NOT NULL, code character varying(30) NOT NULL, description text NOT NULL, percentage double precision NOT NULL, "maximumPromo" integer NOT NULL, "minimumAmount" integer NOT NULL, "isExpired" boolean DEFAULT false, "createdAt" timestamp without time zone DEFAULT now(), "updatedAt" timestamp without time zone
);

ALTER TABLE public.promo OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 20101)
-- Name: promo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promo_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.promo_id_seq OWNER TO postgres;

--
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 231
-- Name: promo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.promo_id_seq OWNED BY public.promo.id;

--
-- TOC entry 242 (class 1259 OID 27791)
-- Name: resetPassword; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."resetPassword" (
    id integer NOT NULL,
    email character varying(80),
    otp character varying(6),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);

ALTER TABLE public."resetPassword" OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 27790)
-- Name: resetPassword_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."resetPassword_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."resetPassword_id_seq" OWNER TO postgres;

--
-- TOC entry 5038 (class 0 OID 0)
-- Dependencies: 241
-- Name: resetPassword_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."resetPassword_id_seq" OWNED BY public."resetPassword".id;

--
-- TOC entry 216 (class 1259 OID 19992)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "fullName" character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    address text,
    picture text,
    "phoneNumber" character varying(20),
    role public.roles DEFAULT 'customer'::public.roles,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);

ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 19991)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

--
-- TOC entry 4777 (class 2604 OID 20077)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);

--
-- TOC entry 4789 (class 2604 OID 20175)
-- Name: message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);

--
-- TOC entry 4787 (class 2604 OID 20147)
-- Name: orderDetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderDetails" ALTER COLUMN id SET DEFAULT nextval('public."orderDetails_id_seq"'::regclass);

--
-- TOC entry 4784 (class 2604 OID 20127)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);

--
-- TOC entry 4779 (class 2604 OID 20087)
-- Name: productCategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productCategories" ALTER COLUMN id SET DEFAULT nextval('public."productCategories_id_seq"'::regclass);

--
-- TOC entry 4775 (class 2604 OID 20057)
-- Name: productRatings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productRatings" ALTER COLUMN id SET DEFAULT nextval('public."productRatings_id_seq"'::regclass);

--
-- TOC entry 4767 (class 2604 OID 20027)
-- Name: productSize id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productSize" ALTER COLUMN id SET DEFAULT nextval('public."productSize_id_seq"'::regclass);

--
-- TOC entry 4791 (class 2604 OID 26968)
-- Name: productTags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productTags" ALTER COLUMN id SET DEFAULT nextval('public."productTags_id_seq1"'::regclass);

--
-- TOC entry 4770 (class 2604 OID 20036)
-- Name: productVariant id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productVariant" ALTER COLUMN id SET DEFAULT nextval('public."productVariant_id_seq"'::regclass);

--
-- TOC entry 4765 (class 2604 OID 20008)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);

--
-- TOC entry 4781 (class 2604 OID 20105)
-- Name: promo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo ALTER COLUMN id SET DEFAULT nextval('public.promo_id_seq'::regclass);

--
-- TOC entry 4793 (class 2604 OID 27794)
-- Name: resetPassword id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."resetPassword" ALTER COLUMN id SET DEFAULT nextval('public."resetPassword_id_seq"'::regclass);

--
-- TOC entry 4773 (class 2604 OID 20047)
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public."productTags_id_seq"'::regclass);

--
-- TOC entry 4762 (class 2604 OID 19995)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

--
-- TOC entry 5005 (class 0 OID 20074)
-- Dependencies: 228
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    public.categories
VALUES (
        1, 'coffee', '2023-11-14 16:09:41.533395', NULL
    );

INSERT INTO
    public.categories
VALUES (
        2, 'non coffee', '2023-11-14 16:09:41.533395', NULL
    );

INSERT INTO
    public.categories
VALUES (
        3, 'food', '2023-11-14 16:09:41.533395', NULL
    );

--
-- TOC entry 5015 (class 0 OID 20172)
-- Dependencies: 238
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    public.message
VALUES (
        1, 2, 4, 'grapes', '2023-11-22 16:25:39.483781', '2023-11-22 16:26:55.851382'
    );

INSERT INTO
    public.message
VALUES (
        3, 1, 91, 'halo', '2024-02-19 09:04:37.803443', NULL
    );

INSERT INTO
    public.message
VALUES (
        5, 91, 1, 'sebentar lagi kak', '2024-02-19 10:23:07.871815', NULL
    );

INSERT INTO
    public.message
VALUES (
        6, 4, 2, 'I love you so much', '2024-03-04 05:55:43.0993', NULL
    );

INSERT INTO
    public.message
VALUES (
        7, 4, 2, 'I love you so much', '2024-03-04 05:55:46.343317', NULL
    );

INSERT INTO
    public.message
VALUES (
        8, 4, 2, 'I love you so much', '2024-03-04 05:55:47.509563', NULL
    );

INSERT INTO
    public.message
VALUES (
        9, 4, 2, 'I love you so much', '2024-03-04 05:55:49.808855', NULL
    );

INSERT INTO
    public.message
VALUES (
        10, 4, 2, 'I love you so much', '2024-03-04 05:55:51.331149', NULL
    );

INSERT INTO
    public.message
VALUES (
        11, 4, 2, 'I love you so much', '2024-03-04 05:55:54.879033', NULL
    );

INSERT INTO
    public.message
VALUES (
        12, 4, 2, 'I love you so much', '2024-03-04 05:56:38.909764', NULL
    );

INSERT INTO
    public.message
VALUES (
        13, 2, 4, 'Test Case', '2024-03-04 06:07:22.35667', NULL
    );

INSERT INTO
    public.message
VALUES (
        14, 2, 4, 'Test Case', '2024-03-04 06:07:22.368445', NULL
    );

INSERT INTO
    public.message
VALUES (
        15, 4, 2, 'I love you so much', '2024-03-04 06:07:49.515673', NULL
    );

INSERT INTO
    public.message
VALUES (
        16, 2, 4, 'Test Case', '2024-03-04 06:08:19.63054', NULL
    );

INSERT INTO
    public.message
VALUES (
        17, 2, 4, 'Test Case', '2024-03-04 06:08:19.641786', NULL
    );

INSERT INTO
    public.message
VALUES (
        21, 2, 4, 'Test Case', '2024-03-04 06:12:54.693506', NULL
    );

INSERT INTO
    public.message
VALUES (
        22, 2, 4, 'Test Case', '2024-03-04 06:12:54.70493', NULL
    );

INSERT INTO
    public.message
VALUES (
        24, 2, 4, 'Test Case', '2024-03-04 06:13:02.44222', NULL
    );

INSERT INTO
    public.message
VALUES (
        25, 2, 4, 'Test Case', '2024-03-04 06:13:02.445954', NULL
    );

INSERT INTO
    public.message
VALUES (
        27, 2, 4, 'Test Case', '2024-03-04 06:13:15.411324', NULL
    );

INSERT INTO
    public.message
VALUES (
        28, 2, 4, 'Test Case', '2024-03-04 06:13:15.422963', NULL
    );

INSERT INTO
    public.message
VALUES (
        30, 2, 4, 'Test Case', '2024-03-04 06:13:42.262048', NULL
    );

INSERT INTO
    public.message
VALUES (
        31, 2, 4, 'Test Case', '2024-03-04 06:13:42.274044', NULL
    );

INSERT INTO
    public.message
VALUES (
        33, 2, 4, 'Test Case', '2024-03-04 06:14:56.974531', NULL
    );

INSERT INTO
    public.message
VALUES (
        34, 2, 4, 'Test Case', '2024-03-04 06:14:56.986664', NULL
    );

INSERT INTO
    public.message
VALUES (
        36, 2, 4, 'Test Case', '2024-03-04 06:15:45.242625', NULL
    );

INSERT INTO
    public.message
VALUES (
        37, 2, 4, 'Test Case', '2024-03-04 06:15:45.253155', NULL
    );

INSERT INTO
    public.message
VALUES (
        41, 2, 4, 'Test Case', '2024-03-04 06:15:57.704316', NULL
    );

INSERT INTO
    public.message
VALUES (
        42, 2, 4, 'Test Case', '2024-03-04 06:15:57.709486', NULL
    );

INSERT INTO
    public.message
VALUES (
        4, 2, 4, 'Test Case', '2024-02-19 10:22:24.131838', '2024-03-04 06:15:57.759939'
    );

--
-- TOC entry 5013 (class 0 OID 20144)
-- Dependencies: 236
-- Data for Name: orderDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."orderDetails" VALUES (116, 2, 1, 2, 1, 125, 25000, '2024-04-02 20:19:25.237763', NULL);

INSERT INTO public."orderDetails" VALUES (149, 2, 1, 2, 1, 143, 25000, '2024-04-02 20:42:45.868755', NULL);

INSERT INTO public."orderDetails" VALUES (150, 1, 1, 2, 1, 143, 28000, '2024-04-02 20:42:45.868755', NULL);

INSERT INTO public."orderDetails" VALUES (151, 2, 1, 2, 1, 144, 25000, '2024-04-02 20:44:09.38142', NULL);

INSERT INTO public."orderDetails" VALUES (152, 1, 1, 2, 1, 144, 28000, '2024-04-02 20:44:09.38142', NULL);

INSERT INTO public."orderDetails" VALUES (153, 2, 1, 2, 1, 145, 25000, '2024-04-02 20:44:31.490584', NULL);

INSERT INTO public."orderDetails" VALUES (154, 1, 1, 2, 1, 145, 28000, '2024-04-02 20:44:31.490584', NULL);

INSERT INTO public."orderDetails" VALUES (155, 3, 1, 2, 1, 145, 25000, '2024-04-02 20:44:31.490584', NULL);

INSERT INTO public."orderDetails" VALUES (92, 1, 1, 2, 1, 104, 28000, '2024-04-02 19:53:08.52264', NULL);

INSERT INTO public."orderDetails" VALUES (91, 2, 1, 2, 1, 104, 25000, '2024-04-02 19:53:08.522518', NULL);

INSERT INTO public."orderDetails" VALUES (109, 1, 1, 2, 1, 121, 28000, '2024-04-02 20:18:42.550116', NULL);

--
-- TOC entry 5011 (class 0 OID 20124)
-- Dependencies: 234
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    public.orders
VALUES (
        125, 91, '#1712063965236', NULL, 25000, 2500, 'on-process', NULL, 'Squidward Tentacles', 'squid@mail.com', '2024-04-02 20:19:25.237763', '2024-04-02 20:19:25.237763'
    );

INSERT INTO
    public.orders
VALUES (
        143, 91, '#1712065365867', NULL, 53000, 5300, 'on-process', NULL, 'Squidward Tentacles', 'squid@mail.com', '2024-04-02 20:42:45.868755', '2024-04-02 20:42:45.868755'
    );

INSERT INTO
    public.orders
VALUES (
        144, 91, '#1712065449381', NULL, 53000, 5300, 'on-process', NULL, 'Squidward Tentacles', 'squid@mail.com', '2024-04-02 20:44:09.38142', '2024-04-02 20:44:09.38142'
    );

INSERT INTO
    public.orders
VALUES (
        145, 91, '#1712065471490', NULL, 78000, 7800, 'on-process', NULL, 'Squidward Tentacles', 'squid@mail.com', '2024-04-02 20:44:31.490584', '2024-04-02 20:44:31.490584'
    );

INSERT INTO
    public.orders
VALUES (
        121, 91, '#1712063922551', NULL, 28000, 2800, 'delivered', NULL, 'Squidward Tentacles', 'squid@mail.com', '2024-04-02 20:18:42.550116', '2024-04-02 20:18:42.550116'
    );

INSERT INTO
    public.orders
VALUES (
        104, 91, '#1712062388507', NULL, 53000, 5300, 'on-process', NULL, 'Squidward Tentacles', 'squid@mail.com', '2024-04-02 19:53:08.507823', '2024-04-02 20:00:05.154025'
    );

--
-- TOC entry 5007 (class 0 OID 20084)
-- Dependencies: 230
-- Data for Name: productCategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."productCategories" VALUES (1, 1, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (2, 2, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (3, 3, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (4, 4, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (5, 5, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (6, 6, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (7, 7, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (8, 8, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (9, 9, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (10, 10, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (11, 11, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (12, 12, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (13, 13, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (14, 14, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (15, 15, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (16, 16, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (17, 17, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (18, 18, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (19, 19, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (20, 20, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (21, 21, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (22, 22, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (23, 23, 2, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (24, 24, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (25, 25, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (26, 26, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (27, 27, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (28, 28, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (29, 29, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (30, 30, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (31, 31, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (32, 32, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (33, 33, 2, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (34, 34, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (37, 37, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (38, 38, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (39, 39, 2, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (40, 40, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (41, 41, 2, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (42, 42, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (43, 43, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (44, 44, 2, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (45, 45, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (46, 46, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (47, 47, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (48, 48, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (49, 49, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (50, 50, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (51, 51, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (52, 52, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (53, 53, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (54, 54, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (55, 55, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (56, 56, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (57, 57, 1, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (58, 58, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (59, 59, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (60, 60, 2, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (61, 61, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (62, 62, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (63, 63, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (64, 64, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (65, 65, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (66, 66, 2, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (67, 67, 3, '2023-11-14 16:09:41.540177', NULL);

INSERT INTO public."productCategories" VALUES (68, 1, 2, '2024-01-09 15:22:26.586659', NULL);

--
-- TOC entry 5003 (class 0 OID 20054)
-- Dependencies: 226
-- Data for Name: productRatings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."productRatings" VALUES (1, 1, 4, 'Its a really good coffe', 3, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (2, 1, 4, 'Its a really good coffe', 3, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (3, 1, 4, 'Its a really good coffe', 8, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (4, 1, 5, 'Its a really good things', 2, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (5, 6, 5, 'Its a really good stuff', 2, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (6, 6, 4, 'Its a really good item', 6, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (7, 9, 5, 'Its a really good coffe', 8, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (8, 9, 5, 'Its a coffe', 3, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (9, 1, 4, 'Its a really good coffe', 9, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (10, 5, 4, 'Its a really good coffe', 9, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (11, 7, 5, 'Its a really good coffe', 2, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (12, 7, 5, 'Its a really good coffe', 10, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (13, 7, 5, 'Its a good coffe', 13, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (14, 1, 4, 'Its a really good coffe', 23, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (15, 1, 5, 'Its a really good coffe', 23, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (16, 5, 4, 'Its a good coffe', 3, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (17, 5, 5, 'Its a really good coffe', 4, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (18, 6, 4, 'Its a really good coffe', 6, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (19, 1, 5, 'Its a really good coffe', 7, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (20, 1, 5, 'Its really good coffe', 3, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (21, 1, 5, 'Its really good coffe', 9, '2023-11-14 16:09:41.549377', NULL);

INSERT INTO public."productRatings" VALUES (22, 1, 5, 'Nice', 1, '2024-03-03 03:18:41.927254', '2024-03-03 03:19:13.664047');

--
-- TOC entry 4997 (class 0 OID 20024)
-- Dependencies: 220
-- Data for Name: productSize; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."productSize" VALUES (1, 'small', 0, '2023-11-14 16:09:41.545476', NULL);

INSERT INTO public."productSize" VALUES (2, 'medium', 5000, '2023-11-14 16:09:41.545476', NULL);

INSERT INTO public."productSize" VALUES (3, 'large', 10000, '2023-11-14 16:09:41.545476', NULL);

--
-- TOC entry 5017 (class 0 OID 26965)
-- Dependencies: 240
-- Data for Name: productTags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."productTags" VALUES (2, 1, 1, '2024-02-16 15:50:37.686274', NULL);

--
-- TOC entry 4999 (class 0 OID 20033)
-- Dependencies: 222
-- Data for Name: productVariant; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."productVariant" VALUES (1, 'hot', 0, '2023-11-14 16:09:41.55657', NULL);

INSERT INTO public."productVariant" VALUES (2, 'ice', 3000, '2023-11-14 16:09:41.55657', NULL);

INSERT INTO public."productVariant" VALUES (3, 'spicy', 2000, '2023-11-14 16:09:41.55657', NULL);

INSERT INTO public."productVariant" VALUES (4, 'reguler', 0, '2023-11-14 16:09:41.55657', NULL);

--
-- TOC entry 4995 (class 0 OID 20005)
-- Dependencies: 218
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    public.products
VALUES (
        3, 'Americano', 'A simple yet strong black coffee made from espresso and water', 22000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        20, 'Caesar Salad', 'Fresh romaine lettuce, Caesar dressing, croutons, and Parmesan cheese', 35000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        21, 'Spaghetti Bolognese', 'Spaghetti pasta with rich meat sauce and Parmesan cheese', 40000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        22, 'Iced Tea', 'Refreshing iced tea with a hint of lemon', 15000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        23, 'Veggie Burger', 'A delicious vegetarian burger with lettuce, tomato, and special sauce', 35000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        24, 'Chocolate Brownie', 'A warm and gooey chocolate brownie', 20000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        25, 'Chicken Quesadilla', 'Grilled chicken and melted cheese in a tortilla', 30000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        26, 'Fruit Smoothie', 'Blend of fresh fruits, yogurt, and honey', 25000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        27, 'Club Sandwich', 'Triple-decker sandwich with turkey, bacon, lettuce, and tomato', 40000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        28, 'Fish and Chips', 'Crispy fish fillets with fries and tartar sauce', 45000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        30, 'Caprese Salad', 'Fresh tomatoes, mozzarella, basil, and balsamic glaze', 35000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        31, 'Beef Burrito', 'Flour tortilla filled with seasoned beef, rice, beans, and salsa', 35000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        32, 'Chicken Alfredo', 'Fettuccine pasta with creamy Alfredo sauce and grilled chicken', 40000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        33, 'Iced Latte Coffee', 'Chilled coffee with milk and sweetener', 20000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        34, 'Spinach and Artichoke Dip', 'Creamy dip with spinach, artichokes, and melted cheese', 30000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        37, 'Strawberry Cheesecake', 'Creamy cheesecake with fresh strawberries', 25000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        38, 'Vegetable Stir-Fry', 'Mixed vegetables stir-fried in a savory sauce', 35000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        39, 'Chai Latte', 'Spiced tea latte with steamed milk and honey', 25000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        40, 'BBQ Ribs', 'Slow-cooked ribs with BBQ sauce and coleslaw', 45000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        41, 'Nachos', 'Tortilla chips topped with melted cheese, jalapeños, and salsa', 30000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        42, 'Chicken Noodle Soup', 'Classic chicken soup with noodles and vegetables', 35000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        43, 'Pancakes', 'Fluffy pancakes with maple syrup and butter', 25000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        44, 'Beef Tacos', 'Soft tortillas filled with seasoned beef, lettuce, and salsa', 35000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        45, 'Greek Salad', 'Cucumber, tomatoes, olives, feta cheese, and Greek dressing', 30000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        46, 'Chocolate Milkshake', 'Creamy chocolate shake with whipped cream', 20000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        47, 'Shrimp Scampi', 'Shrimp cooked in garlic and butter sauce over pasta', 40000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        48, 'French Fries', 'Crispy and golden French fries', 15000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        49, 'Miso Soup', 'Traditional Japanese soup with tofu and seaweed', 20000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        50, 'BLT Sandwich', 'Bacon, lettuce, tomato, and mayo on toasted bread', 35000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        51, 'Capuccino', 'A classic Italian coffee with espresso, steamed milk and foam', 25000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        52, 'Garden Salad', 'Fresh mixed greens with a variety of vegetables and dressing', 30000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        53, 'Sushi Roll', 'Assorted sushi rolls with soy sauce and wasabi', 40000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        54, 'Chicken Wings', 'Crispy chicken wings with your choice of sauce', 35000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        55, 'Croissant', 'Buttery and flaky croissant', 15000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        56, 'Beef Stroganoff', 'Sliced beef in a creamy mushroom sauce over egg noodles', 45000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        57, 'Tiramisu', 'Classic Italian dessert with coffee-soaked ladyfingers', 25000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        58, 'Egg Fried Rice', 'Fried rice with eggs, vegetables, and soy sauce', 35000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        59, 'Milk Tea', 'Creamy milk tea with boba pearls', 25000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        60, 'Baked Potato', 'Baked potato topped with sour cream, cheese, and chives', 30000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        61, 'Sausage and Peppers', 'Sausages and bell peppers in a savory tomato sauce', 40000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        62, 'Fajitas', 'Grilled chicken or steak with sautéed onions and peppers', 35000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        63, 'Pumpkin Soup', 'Creamy pumpkin soup with a touch of nutmeg', 20000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        64, 'Mashed Potatoes', 'Creamy mashed potatoes with gravy', 25000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        65, 'Fruit Salad', 'Fresh fruit salad with a honey-lime dressing', 30000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        29, 'Espresso', 'A strong and aromatic shot of espresso', 15000, '29.jpeg', NULL, false, '2023-11-14 16:09:41.529314', '2023-11-27 14:42:24.578071'
    );

INSERT INTO
    public.products
VALUES (
        2, 'Mocha', 'A luscious combination of espresso, chocolate, and milk', 32000, NULL, 10000, true, '2023-11-14 16:09:41.529314', '2023-12-28 14:13:45.840217'
    );

INSERT INTO
    public.products
VALUES (
        5, 'Iced Coffee', 'Chilled coffee served with ice and optionally, cream and sugar', 27000, NULL, 10000, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        4, 'Macchiato', 'Macchiato', 10000, NULL, NULL, false, '2023-11-14 16:09:41.529314', '2024-03-04 05:51:11.261331'
    );

INSERT INTO
    public.products
VALUES (
        1, 'Cappuccino', 'A classic Italian coffee with espresso, steamed milk, and foam', 25000, 'https://res.cloudinary.com/dorxnzpea/image/upload/v1710907275/coffe-backend/products/isvxano8him72szgprl1.png', NULL, true, '2023-11-14 16:09:41.529314', '2024-03-20 11:01:17.76729'
    );

INSERT INTO
    public.products
VALUES (
        66, 'Pulled Pork Sandwich', 'Slow-cooked pulled pork with BBQ sauce on a bun', 35000, NULL, NULL, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        67, 'Green Tea Ice Cream', 'Matcha-flavored ice cream', 20000, NULL, NULL, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        117, 'kopi jahe 2', 'kopi pake jahe', 30000, '1701181609899.jpeg', NULL, NULL, '2023-11-28 21:26:49.945931', NULL
    );

INSERT INTO
    public.products
VALUES (
        6, 'Turkish Coffee', 'Finely ground coffee beans simmered with water and cardamom', 25000, NULL, 10000, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        7, 'Cold Brew', 'Coffee brewed with cold water for a smooth and less acidic taste', 32000, NULL, 10000, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        8, 'Irish Coffee', 'Hot coffee with Irish whiskey, sugar, and a layer of cream', 35000, NULL, 10000, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        9, 'Caramel Macchiato', 'Espresso with caramel syrup, steamed milk, and foam', 34000, NULL, 10000, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        10, 'Affogato', 'Espresso poured over a scoop of vanilla ice cream', 28000, NULL, 10000, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        11, 'French Press Coffee', 'Coarsely ground coffee steeped in hot water and pressed', 28000, NULL, 10000, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        12, 'Iced Caramel Latte', 'Iced latte with caramel syrup, milk, and espresso', 36000, NULL, 10000, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        13, 'Flat White', 'Espresso with steamed milk and a velvety microfoam', 32000, NULL, 10000, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        14, 'Decaf Coffee', 'Coffee with the caffeine removed for a milder taste', 24000, NULL, 10000, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        15, 'Cortado', 'Espresso "cut" with a small amount of warm milk', 30000, NULL, 10000, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        16, 'Ethiopian Yirgacheffe', 'Single-origin coffee with fruity and floral notes', 38000, NULL, 10000, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        17, 'Ristretto', 'An even shorter and more concentrated shot of espresso', 26000, NULL, 10000, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        81, 'Kopi Gula Aren 2', 'Kopi dengan Gula Aren', 30000, NULL, NULL, NULL, '2023-11-21 14:45:14.30421', '2023-11-22 07:38:58.892517'
    );

INSERT INTO
    public.products
VALUES (
        18, 'Vietnamese Coffee', 'Strong coffee with sweetened condensed milk', 26000, NULL, 10000, true, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        19, 'Margherita Pizza', 'Thin-crust pizza with tomato sauce, mozzarella cheese, and fresh basil', 45000, NULL, 10000, false, '2023-11-14 16:09:41.529314', NULL
    );

INSERT INTO
    public.products
VALUES (
        121, 'asd', 'asd', 10000, NULL, NULL, NULL, '2024-02-16 08:13:13.728682', NULL
    );

INSERT INTO
    public.products
VALUES (
        122, 'Kopi Gula Aren', 'Kopi Pakai Gula Aren', 10000, NULL, NULL, NULL, '2024-02-16 08:15:27.160257', NULL
    );

INSERT INTO
    public.products
VALUES (
        126, 'kopi jahe aa', 'kopi pake jahe', 30000, NULL, NULL, NULL, '2024-02-29 16:29:04.387687', NULL
    );

INSERT INTO
    public.products
VALUES (
        128, 'kopi jahe aaa', 'kopi pake jahe', 30000, '1709198963384.png', NULL, NULL, '2024-02-29 16:29:27.193338', NULL
    );

--
-- TOC entry 5009 (class 0 OID 20102)
-- Dependencies: 232
-- Data for Name: promo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    public.promo
VALUES (
        1, 'Selamat Hari Ibu', 'HARIIBU10', 'dapatkan diskon 10% special hari ibu', 0.1, 100000, 20000, false, '2023-11-14 16:09:41.553209', NULL
    );

INSERT INTO
    public.promo
VALUES (
        2, 'Selamat Hari Ibu', 'HARIIBU20', 'dapatkan diskon 20% special hari ibu', 0.2, 50000, 15000, false, '2023-11-14 16:09:41.553209', NULL
    );

INSERT INTO
    public.promo
VALUES (
        3, 'Selamat Hari Ibu', 'HARIIBU30', 'dapatkan diskon 30% special hari ibu', 0.3, 40000, 12000, false, '2023-11-14 16:09:41.553209', NULL
    );

INSERT INTO
    public.promo
VALUES (
        4, 'Selamat Hari Ibu', 'HARIIBU40', 'dapatkan diskon 40% special hari ibu', 0.4, 30000, 10000, false, '2023-11-14 16:09:41.553209', NULL
    );

INSERT INTO
    public.promo
VALUES (
        6, 'Test Case', 'SAJTWJ', 'Nice SIRRR', 0.1, 10000, 2000, false, '2024-03-03 03:22:14.007904', '2024-03-03 03:23:20.586978'
    );

--
-- TOC entry 5019 (class 0 OID 27791)
-- Dependencies: 242
-- Data for Name: resetPassword; Type: TABLE DATA; Schema: public; Owner: postgres
--

--
-- TOC entry 5001 (class 0 OID 20044)
-- Dependencies: 224
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    public.tags
VALUES (
        1, 'FLASH SALE', '2023-11-14 16:09:41.536155', NULL
    );

INSERT INTO
    public.tags
VALUES (
        2, 'grapes', '2024-01-15 05:29:30.02258', '2024-01-15 06:15:35.679052'
    );

--
-- TOC entry 4993 (class 0 OID 19992)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    public.users
VALUES (
        31, 'Addison Rodriguez', 'addison.rodriguez@example.com', 'S3rWkPz', '928 Oakwood St', NULL, '080123456789', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        32, 'Evelyn Lewis', 'evelyn.lewis@example.com', '6Np4QyT', '29 Cedar Dr', NULL, '081234567890', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        33, 'David Hernandez', 'david.hernandez@example.com', 'Fj5XwTz', '98 Elm Ave', NULL, '082345678901', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        34, 'Abigail Mitchell', 'abigail.mitchell@example.com', '9Lw7QrT', '74 Pine Ln', NULL, '083456789012', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        35, 'Alexander Thomas', 'alexander.thomas@example.com', '4Yn6VpJ', '7 Willow Rd', NULL, '084567890123', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        36, 'Elizabeth Johnson', 'elizabeth.johnson@example.com', 'j4Kx3Sv', '66 Oakwood Ct', NULL, '085678901234', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        37, 'Daniel Wright', 'daniel.wright@example.com', 'H2fNcQr', '13 Main St', NULL, '086789012345', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        38, 'Chloe Turner', 'chloe.turner@example.com', 'q8RfSv1', '28 Elm Rd', NULL, '087890123456', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        39, 'William Lopez', 'william.lopez@example.com', 'B1sTm9R', '83 Cedar Dr', NULL, '088901234567', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        40, 'Sofia Davis', 'sofia.davis@example.com', '4LxQfYr', '12 Oak Rd', NULL, '089012345678', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        41, 'Henry Adams', 'henry.adams@example.com', 'Yp3Rz1G', '78 Pine Ave', NULL, '080123456789', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        42, 'Victoria Perez', 'victoria.perez@example.com', 'V2yLsRq', '34 Willow Dr', NULL, '081234567890', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        43, 'Samuel White', 'samuel.white@example.com', '1Hc3SfR', '62 Spruce St', NULL, '082345678901', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        44, 'Madison Nelson', 'madison.nelson@example.com', '3JwR5vS', '47 Birch Rd', NULL, '083456789012', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        45, 'Joseph Miller', 'joseph.miller@example.com', 'L8tRwVp', '9 Pine Ln', NULL, '084567890123', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        46, 'Charlotte Jackson', 'charlotte.jackson@example.com', 'J6wBvQy', '42 Elm Ct', NULL, '085678901234', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        47, 'James Harris', 'james.harris@example.com', 'Z8qFvXk', '25 Willow Ave', NULL, '086789012345', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        48, 'Mia Thompson', 'mia.thompson@example.com', '1Pc9XvM', '33 Oakwood Rd', NULL, '087890123456', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        560, 'Test Case', '1709498065192@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Gd7axdSPDewwAFH3FRvdIQ$aWdD073fzY0Gjy7xAfVyU9JvwCgY5qKEYrEQ/EPBfsY', NULL, NULL, NULL, 'customer', '2024-03-04 03:34:25.268381', NULL
    );

INSERT INTO
    public.users
VALUES (
        2, 'Staff', 'staff.example@gmial.com', 'staff123', NULL, NULL, NULL, 'staff', '2023-11-14 16:09:41.516344', NULL
    );

INSERT INTO
    public.users
VALUES (
        3, 'Sarah Johnson', 'sarah.johnson@example.com', 'qWErT123', '456 Elm Ave', NULL, '082345678901', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        4, 'David Brown', 'david.brown@example.com', '7sD9F8w', '789 Oak Rd', NULL, '083456789012', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        5, 'Emily Davis', 'emily.davis@example.com', 'tRp2kQs', '101 Pine Ln', NULL, '084567890123', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        6, 'Michael Lee', 'michael.lee@example.com', 'MhK5fjQ', '202 Cedar St', NULL, '085678901234', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        7, 'Jessica Clark', 'jessica.clark@example.com', '1kA3pWx', '303 Birch Dr', NULL, '086789012345', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        8, 'James Taylor', 'james.taylor@example.com', 'hPQ4vN6', '404 Spruce Ct', NULL, '087890123456', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        9, 'Olivia Martinez', 'olivia.martinez@example.com', 'ZcRf6pL', '505 Willow Rd', NULL, '088901234567', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        10, 'Robert Hall', 'robert.hall@example.com', '9sBxT3m', '606 Oakwood Ave', NULL, '089012345678', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        11, 'Sophia White', 'sophia.white@example.com', 'Fg3A4Yi', '707 Maple St', NULL, '080123456789', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        12, 'Daniel Harris', 'daniel.harris@example.com', 'Qw6Y7r2', '808 Birch Ln', NULL, '081234567890', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        13, 'Ava Anderson', 'ava.anderson@example.com', 'P4uJySx', '909 Pine Ave', NULL, '082345678901', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        14, 'William Jackson', 'william.jackson@example.com', 'LpQ9RzS', '110 Cedar Dr', NULL, '083456789012', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        15, 'Mia Harris', 'mia.harris@example.com', '5Xc8zR7', '211 Elm Rd', NULL, '084567890123', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        16, 'Benjamin Johnson', 'benjamin.johnson@example.com', 'GpW2fSv', '313 Spruce St', NULL, '085678901234', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        17, 'Amelia Wilson', 'amelia.wilson@example.com', 'Tm6N7gZ', '414 Willow Ave', NULL, '086789012345', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        18, 'Matthew Adams', 'matthew.adams@example.com', 'H7tK1jR', '515 Oakwood Ct', NULL, '087890123456', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        20, 'Ethan Scott', 'ethan.scott@example.com', 'xYs4Vj6', '717 Pine Ln', NULL, '089012345678', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        21, 'Isabella Parker', 'isabella.parker@example.com', 'W1z2MvQ', '818 Cedar Rd', NULL, '080123456789', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        22, 'Samuel Rodriguez', 'samuel.rodriguez@example.com', 'PqFv3Z9', '919 Elm St', NULL, '081234567890', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        23, 'Elizabeth Evans', 'elizabeth.evans@example.com', 'L5sNfVr', '120 Main Ave', NULL, '082345678901', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        24, 'Christopher Moore', 'christopher.moore@example.com', 'Uw7Xy5B', '221 Oak Rd', NULL, '083456789012', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        25, 'Grace Young', 'grace.young@example.com', 'J3sRv6P', '322 Pine Ln', NULL, '084567890123', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        26, 'Joseph Turner', 'joseph.turner@example.com', 'Qk4RzGv', '423 Elm Dr', NULL, '085678901234', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        27, 'Lily Baker', 'lily.baker@example.com', '1YfB5qK', '524 Cedar St', NULL, '086789012345', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        28, 'Andrew Lewis', 'andrew.lewis@example.com', 'V5tRqBj', '625 Birch Ct', NULL, '087890123456', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        29, 'Harper Harris', 'harper.harris@example.com', 'C5vT6jA', '726 Spruce Rd', NULL, '088901234567', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        30, 'Christopher Allen', 'christopher.allen@example.com', '9Kw7GfT', '827 Willow Ave', NULL, '089012345678', 'customer', '2023-11-14 16:09:41.522737', NULL
    );

INSERT INTO
    public.users
VALUES (
        158, 'Haidar', 'haidarrrrrr@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$zR8EiwBjxDUmIf2wGJKS9g$8e+NqEcNprdsT/WEB5pvaAWHTVS5cRaA+OVQ2XwLslM', NULL, NULL, NULL, 'customer', '2024-02-28 10:39:29.243005', NULL
    );

INSERT INTO
    public.users
VALUES (
        561, 'Test Case', '1709498065283@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$RVHTqL3FMX09D4yMjMmkmQ$duPebNdR0vB4UNG1ZBFirvy6rL+e62qjGEZktqoz/1A', NULL, NULL, NULL, 'customer', '2024-03-04 03:34:25.349993', NULL
    );

INSERT INTO
    public.users
VALUES (
        688, 'Test Case', '1709499535464@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$DxR8CFDzPqZkryGfqSpF3w$1Ru5Iv8oMjgDxdFgO6D6KeYhHdTmtCehLZ9cZuwObEc', NULL, NULL, NULL, 'customer', '2024-03-04 03:58:55.530509', NULL
    );

INSERT INTO
    public.users
VALUES (
        576, 'Test Case', '1709498250613@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$G7V3+54MJq3MP13U+PjgOQ$E27VZ1+oMc47M7dyQ9i7GmmQnzuVZrz41n+e3IQJQQ8', NULL, NULL, NULL, 'customer', '2024-03-04 03:37:30.68223', NULL
    );

INSERT INTO
    public.users
VALUES (
        577, 'Test Case', '1709498250691@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$uYuDpi1CGMUYEdekGRwYEQ$pGn+9rptP7RgUaqxEAqNhJzoyDjyiYDvUE8zj/Cd7U0', NULL, NULL, NULL, 'customer', '2024-03-04 03:37:30.756828', NULL
    );

INSERT INTO
    public.users
VALUES (
        689, 'Test Case', '1709499535539@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$3XP19VCqHwgvgJ38uLSY8g$nuzrFalXf8VHGkIheKtNdcR2cYK+pLgjWypVwpurIuY', NULL, NULL, NULL, 'customer', '2024-03-04 03:58:55.602478', NULL
    );

INSERT INTO
    public.users
VALUES (
        84, 'Roaxane Boss', 'roxane@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$rix7BdGLhpPzixWjPmbU4Q$P2h9GRaOpE6IqmfQZA3huMcLWKdUTO7KomGrX76MxF0', NULL, NULL, NULL, 'customer', '2023-11-23 23:50:28.011883', '2024-01-04 09:44:34.228056'
    );

INSERT INTO
    public.users
VALUES (
        72, 'Spongebob Squarepants', 'boss@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$1WDZxMUN19J4dPdI/wTNPQ$ABqbD+kHdi74Zg6hJlJshZ1yvtB4UZvExDxJz89lmgU', 'bikini bottom', '1704327830936.png', '08122722654', 'admin', '2023-11-23 13:53:25.888526', '2024-01-04 09:52:37.218442'
    );

INSERT INTO
    public.users
VALUES (
        93, 'Joko Widodo', 'widodo@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$j18+AbE4ZQ6BxZ8jzp66pg$xG+yW52cTH8/Utyx0TfS2ED8yWT04abH1By+sqrhHVE', NULL, NULL, NULL, 'customer', '2023-12-22 05:19:25.04613', '2024-02-16 07:47:24.354257'
    );

INSERT INTO
    public.users
VALUES (
        96, 'Haidar', 'haidar@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$fnYl6aUSMUNfwIHwavjSsA$NUt/b/g1ovwHhUB3cnaAfjERE7Kef0T9ayTcdJkr17M', NULL, NULL, NULL, 'customer', '2024-01-04 09:53:27.246898', '2024-01-04 09:56:16.325342'
    );

INSERT INTO
    public.users
VALUES (
        845, 'Test Case', '1709534907594@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$xJHVC68RNRW4dp5yRnO09w$tY1LCWuS3tHOAFRhjjAa9llN6aacXbkRHNbXoGg6pGI', NULL, NULL, NULL, 'customer', '2024-03-04 13:48:27.685242', NULL
    );

INSERT INTO
    public.users
VALUES (
        104, 'Squidward Tentacles', 'test2@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$C66ew/NacG77kQXQvslnzQ$0qvpcYjtUt05dARxp92Ham7luUSWuKkHCKvbMy8wS10', NULL, '1704950328023.jpeg', '0123456789', 'customer', '2024-01-11 12:16:15.926782', '2024-01-11 12:19:08.312179'
    );

INSERT INTO
    public.users
VALUES (
        102, 'Stephen Hawking', 'hawking@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$CWvzsa57f6Q+GDxSLxXBOw$gZXSdaJELFQXjAhxr/PNMgMV/Y88Qz938mq4F1GqAgo', NULL, NULL, NULL, 'customer', '2024-01-04 10:47:17.292069', '2024-01-04 11:01:48.784276'
    );

INSERT INTO
    public.users
VALUES (
        846, 'Test Case', '1709534907695@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$qKKyIEje+Tw61bPcaC1gew$l1RLkxwE6IM3eDImGtXjgjNbn7eR2q4FoNGdYhQa67Y', NULL, NULL, NULL, 'customer', '2024-03-04 13:48:27.772383', NULL
    );

INSERT INTO
    public.users
VALUES (
        712, 'Test Case', '1709499773971@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$qi9d8+KIMzwdbreRnG38gw$we0+UidTVxbbSmNyod2pv14VYfQXGtLmwzdvZlmWyKs', NULL, NULL, NULL, 'customer', '2024-03-04 04:02:54.042286', NULL
    );

INSERT INTO
    public.users
VALUES (
        592, 'Test Case', '1709498812709@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$FirL/nFN5kEHA9nykul0gw$UUe/oZ3+O89GbS6UDhcB+h8CL0DACID0RwBOWqVwOcE', NULL, NULL, NULL, 'customer', '2024-03-04 03:46:52.782277', NULL
    );

INSERT INTO
    public.users
VALUES (
        593, 'Test Case', '1709498812791@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$NwmfMKyJ2wA4bGu7FkZVPQ$exMOiy8bClX/OeBb5trRhO2Ivg1YYHc/jZN75YfL6bY', NULL, NULL, NULL, 'customer', '2024-03-04 03:46:52.854848', NULL
    );

INSERT INTO
    public.users
VALUES (
        713, 'Test Case', '1709499774050@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$5zFUqfWDenZI+iZDcCIEsA$/5wQ+ZVA9q7r+RRPzJPlq9GyXsluGZE7UUUbqi2YGCk', NULL, NULL, NULL, 'customer', '2024-03-04 04:02:54.130061', NULL
    );

INSERT INTO
    public.users
VALUES (
        616, 'Test Case', '1709498965624@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$CqQEdq2uNwbf83RVJD+jBw$rhDGDzh8tZ5U17JVj8WfRbVb6xGsPwyx89/LCzwtN/8', NULL, NULL, NULL, 'customer', '2024-03-04 03:49:25.708889', NULL
    );

INSERT INTO
    public.users
VALUES (
        617, 'Test Case', '1709498965710@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ALbRibzc9FxLAupGmnbCcw$K4AYLLgs1fskICiYfZPDn9FKF4hBdPsDXryOUFATqV4', NULL, NULL, NULL, 'customer', '2024-03-04 03:49:25.839804', NULL
    );

INSERT INTO
    public.users
VALUES (
        736, 'Test Case', '1709499902547@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$OXDKccAMpSRF3BhTl/4XSg$KD08zD3i3GrdcDZPq0UUOjZqKJCn3QbEekTOdPXDgbM', NULL, NULL, NULL, 'customer', '2024-03-04 04:05:02.624129', NULL
    );

INSERT INTO
    public.users
VALUES (
        737, 'Test Case', '1709499902632@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$q39lRniLHplG/Gfv4b0Kcw$s4VQhca0ih7jYmLOFV4SwTSxi5c63eVL9C0lv6thAZ4', NULL, NULL, NULL, 'customer', '2024-03-04 04:05:02.695056', NULL
    );

INSERT INTO
    public.users
VALUES (
        640, 'Test Case', '1709499103351@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$UtKkyE8MlV2cHeFApUXoaA$tq4D9Mlr6m+gmhFRWJaLG/y1I+XK3NvaxZ/uxJGzWyY', NULL, NULL, NULL, 'customer', '2024-03-04 03:51:43.417485', NULL
    );

INSERT INTO
    public.users
VALUES (
        641, 'Test Case', '1709499103419@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$MDFIXTNTX3iyQwWK3ebDDw$pvbWs7E3AC0RMJpRDRpTYPRfj2YQBbgcOccYllQQHHw', NULL, NULL, NULL, 'customer', '2024-03-04 03:51:43.484656', NULL
    );

INSERT INTO
    public.users
VALUES (
        664, 'Test Case', '1709499388252@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$12r6XGdJrk0CAWIICYSHtQ$XfMN/TrJBKRNuSXnwfDcH8OLnUsyQ5tri9NjRq+aGaE', NULL, NULL, NULL, 'customer', '2024-03-04 03:56:28.330415', NULL
    );

INSERT INTO
    public.users
VALUES (
        665, 'Test Case', '1709499388339@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Mt94vwFNd4adcmv7iGqlrg$DMt5Ev54n/mVyIXw6qOFFD+EK2/Nc2XulNH3Tp/Zttw', NULL, NULL, NULL, 'customer', '2024-03-04 03:56:28.409757', NULL
    );

INSERT INTO
    public.users
VALUES (
        771, 'Test Case', '1709531953522@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Tpqm4QwAaiIYmygy5PDLkA$TLCKf0ufBb2tjgIvxXfEoT9+/AcMle1USpc0rGJ9vlA', NULL, NULL, NULL, 'customer', '2024-03-04 12:59:13.592661', NULL
    );

INSERT INTO
    public.users
VALUES (
        772, 'Test Case', '1709531953593@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$H31Es8DlfSCmjTtYim70WQ$FRf3xiow3Y85Ri0/zA+a+wjip5ed5p1GN/QaAseta68', NULL, NULL, NULL, 'customer', '2024-03-04 12:59:13.657838', NULL
    );

INSERT INTO
    public.users
VALUES (
        785, 'Test Case', '1709533096296@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Ubgl3JOGMdK0vMvdN6sfzA$O1AJjcF8EbIPvOdKKih/S6NOzqIML4qtbW23fpsI3gI', NULL, NULL, NULL, 'customer', '2024-03-04 13:18:16.396424', NULL
    );

INSERT INTO
    public.users
VALUES (
        103, 'test', 'test1@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$Q0Gz69X3mabPZjK+2tJ3Gg$0JqlzdkatVrrj8ytiyNeHQf5iyr47j9G988sZVrAdy4', NULL, NULL, NULL, 'customer', '2024-01-11 11:58:05.472538', NULL
    );

INSERT INTO
    public.users
VALUES (
        786, 'Test Case', '1709533096407@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$S5l8CNtRHLBvXms1JkffqQ$zQcUV2tJwWGXl9LBU0ZBz7mlHSQZqspTkAtRSC/JeHk', NULL, NULL, NULL, 'customer', '2024-03-04 13:18:16.508304', NULL
    );

INSERT INTO
    public.users
VALUES (
        813, 'Test Case', '1709534199159@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$GeHbv/gyJTcj6FrpyLUXtQ$CUfpqH7xz9xz52ofzZQ1xHDfe/XUt+xDIHktI5RwbQU', NULL, NULL, NULL, 'customer', '2024-03-04 13:36:39.254174', NULL
    );

INSERT INTO
    public.users
VALUES (
        814, 'Test Case', '1709534199264@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$3UI4Dez34Ca7RD+yeMzqUA$BiqEhKMyJaiM3Rdr1Azl/7Ceqd4wJGZlME7a1mcMNtM', NULL, NULL, NULL, 'customer', '2024-03-04 13:36:39.364629', NULL
    );

INSERT INTO
    public.users
VALUES (
        837, 'Test Case', '1709534803548@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$9fgR7kk4DIftNJpOzzN3Ig$JzQCZ29owZ8yLo+akLPK8HG6isJ0lkHwyURBiLElJ84', NULL, NULL, NULL, 'customer', '2024-03-04 13:46:43.648877', NULL
    );

INSERT INTO
    public.users
VALUES (
        838, 'Test Case', '1709534803659@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$BWSdi3qXOjFBvmggs3OqyQ$JJpJZttKw0M5IoR9kHrFVVY7QTuSNcp0lpEZvuSGuPc', NULL, NULL, NULL, 'customer', '2024-03-04 13:46:43.764381', NULL
    );

INSERT INTO
    public.users
VALUES (
        568, 'Test Case', '1709498072002@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$g/kEMz0ruaf6QZKL0n6rzA$KUk5zLDUTpY3xCkLCFd7gcwEqOr546bZanBMN6gx+7U', NULL, NULL, NULL, 'customer', '2024-03-04 03:34:32.07915', NULL
    );

INSERT INTO
    public.users
VALUES (
        569, 'Test Case', '1709498072089@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Ic/auVEzAskykr1IGLEG9g$PxAl99Dz1XN8UGngY9dj5bwjYZBLJBdckJR4aovLuSg', NULL, NULL, NULL, 'customer', '2024-03-04 03:34:32.156356', NULL
    );

INSERT INTO
    public.users
VALUES (
        848, 'Test Case', '1709534907936@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$YGwVTb/3I5z9VObSmBxeJw$I/5TBxQIQCWkOh7rD8c0RfcyhTWB8+5Me4Digtkv3YA', NULL, NULL, NULL, 'customer', '2024-03-04 13:48:28.021421', NULL
    );

INSERT INTO
    public.users
VALUES (
        584, 'Test Case', '1709498298391@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$xYsdH9SPQdhwADJ00qZcyQ$tz/IN/Rk+N1Zur4H7YbsPzf76nzFRsew5eZaiMeGj4Y', NULL, NULL, NULL, 'customer', '2024-03-04 03:38:18.455887', NULL
    );

INSERT INTO
    public.users
VALUES (
        585, 'Test Case', '1709498298458@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$LdrstV4ANvgsm60TmgqYRQ$MO7/J82X7M43uUtOwljLfG1QdOruu7S3nuVqPzkUoXs', NULL, NULL, NULL, 'customer', '2024-03-04 03:38:18.516777', NULL
    );

INSERT INTO
    public.users
VALUES (
        849, 'Test Case', '1709534908025@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$vM8YgRlPSo4kPstV7JOlfQ$FTroQ4og8qVQD52YNAtL0UGWaGfPSBtRNNCUlE3FY/Q', NULL, NULL, NULL, 'customer', '2024-03-04 13:48:28.121196', NULL
    );

INSERT INTO
    public.users
VALUES (
        704, 'Test Case', '1709499667492@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$jq/ovtFholriAfnZsUti6g$BweUhsrM3qTqVzcv6hLcT+HZh0eKRL7k+85Y9FTX8g0', NULL, NULL, NULL, 'customer', '2024-03-04 04:01:07.567292', NULL
    );

INSERT INTO
    public.users
VALUES (
        705, 'Test Case', '1709499667575@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$3OuIptbN+B5GBdwl2F5OVA$d++S1N5Xo43XQpItW8hr37xzZXkoWFCL20A7Va0e1wU', NULL, NULL, NULL, 'customer', '2024-03-04 04:01:07.64573', NULL
    );

INSERT INTO
    public.users
VALUES (
        608, 'Test Case', '1709498887542@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$OO4f2/pHKWHjf05m3faWSg$nBk+6UIVRGGBS1mJtEEZcWLvrQzz8j5A8rojEyvxEHA', NULL, NULL, NULL, 'customer', '2024-03-04 03:48:07.610628', NULL
    );

INSERT INTO
    public.users
VALUES (
        609, 'Test Case', '1709498887619@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$4lf93GrBMhdR0whv7WqXkQ$YcGnfw1T2oS/N7q2r2ItK1DA+cYvEzjSl7E5rzMUZuU', NULL, NULL, NULL, 'customer', '2024-03-04 03:48:07.6854', NULL
    );

INSERT INTO
    public.users
VALUES (
        632, 'Test Case', '1709499052597@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$tCVzn5iqXuG5Wx5KP9ih5A$OPT++WgJMCHFOSVYaK1kyRnh/u7hSm1Wm+PZh4/YkZk', NULL, NULL, NULL, 'customer', '2024-03-04 03:50:52.665632', NULL
    );

INSERT INTO
    public.users
VALUES (
        633, 'Test Case', '1709499052674@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Dtq64N9F3st7qNKHnzYzXw$4iK4OfzjLD0RT7UwPeYareXpNs5qh64bYmdYhcSdZbE', NULL, NULL, NULL, 'customer', '2024-03-04 03:50:52.737121', NULL
    );

INSERT INTO
    public.users
VALUES (
        728, 'Test Case', '1709499841109@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$5niWMZX05pUypnV3r5heMw$WOo0bPM2ZMZrUQY25iU13Gp14wv6o/Xyb3ozP7LKVbQ', NULL, NULL, NULL, 'customer', '2024-03-04 04:04:01.200865', NULL
    );

INSERT INTO
    public.users
VALUES (
        729, 'Test Case', '1709499841209@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Rtl/nUcTBAQsQWFMndY9Cg$1idoetD9XWovm1TbZwOrUkcaahmxs2Frvsx5UbPq0Zw', NULL, NULL, NULL, 'customer', '2024-03-04 04:04:01.279753', NULL
    );

INSERT INTO
    public.users
VALUES (
        91, 'Squidward Tentacles', 'squid@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$rdje0WupmozfvG5hA34N/A$oqdcSQHC0lbqbI7HI+3rsh/C70lCzF/dStDe+ehIVM8', 'goks', 'https://res.cloudinary.com/dorxnzpea/image/upload/v1710907461/coffe-backend/users/by771oko4dceqrhx1yrh.png', '+1234123123', 'admin', '2023-11-27 22:32:10.332718', '2024-03-28 09:46:36.99099'
    );

INSERT INTO
    public.users
VALUES (
        656, 'Test Case', '1709499366825@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$KnmMuDzEW8Nsvwp1+uVcJw$0Avgi0mKodn/MZjnt40NVkVCKDnyoo/mYnhTi5x4Feg', NULL, NULL, NULL, 'customer', '2024-03-04 03:56:06.894735', NULL
    );

INSERT INTO
    public.users
VALUES (
        657, 'Test Case', '1709499366903@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ElyrU1bla05awvo91lChNw$uW7XuhrQPcRBCaEeO7wUVzcyBD21At92KbOFKrr+zp0', NULL, NULL, NULL, 'customer', '2024-03-04 03:56:06.968133', NULL
    );

INSERT INTO
    public.users
VALUES (
        752, 'Test Case', '1709506270884@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$hAbu6VJQpfvbGKGID8fhMw$x4yegEPfbF2+xTmjQULxFYkVDjaFV2A/6q0LzAZ9DiM', NULL, NULL, NULL, 'customer', '2024-03-04 05:51:10.959007', NULL
    );

INSERT INTO
    public.users
VALUES (
        680, 'Test Case', '1709499467011@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$3ujbYBdEGu2nLl/E3pH4oA$0T0VZPgfrkWrijaF2j25FCqOsLG7EYPNczJRQ1GshcU', NULL, NULL, NULL, 'customer', '2024-03-04 03:57:47.08248', NULL
    );

INSERT INTO
    public.users
VALUES (
        681, 'Test Case', '1709499467091@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$pUCygCTiXvWUkhVW/lXrGg$qyePnrGMgD2zM6yJv0eIls9Y0ZZodInYfKFY8TfacwU', NULL, NULL, NULL, 'customer', '2024-03-04 03:57:47.159786', NULL
    );

INSERT INTO
    public.users
VALUES (
        753, 'Test Case', '1709506270968@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$c7uBORKK/npPG5HLGh+rsw$DAwQtXji1KBPvRD46EctGRaQQkCuOakoiozwWfgY6Yk', NULL, NULL, NULL, 'customer', '2024-03-04 05:51:11.032656', NULL
    );

INSERT INTO
    public.users
VALUES (
        791, 'Test Case', '1709533191797@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$6RIRiq93Gjb2z4/J9p9qfw$9WWxqTE5NVLocLp/2HwzXocCmeNAatLBiEhxLHejB08', NULL, NULL, NULL, 'customer', '2024-03-04 13:19:51.877567', NULL
    );

INSERT INTO
    public.users
VALUES (
        792, 'Test Case', '1709533191886@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$HPD9teFiZI5Vh0Psap+r+Q$Ucwd/gZoYWJvnTSmUNUxBIOt3PuFGitrNuo9UXiqF2w', NULL, NULL, NULL, 'customer', '2024-03-04 13:19:51.986533', NULL
    );

INSERT INTO
    public.users
VALUES (
        829, 'Test Case', '1709534609643@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Uh5TC+U5L++aSFO+Kv+fzg$AEd7fe5gtJzN+kgGAixa+pbTi4YVPsWjubGf6SMLWVI', NULL, NULL, NULL, 'customer', '2024-03-04 13:43:29.724691', NULL
    );

INSERT INTO
    public.users
VALUES (
        830, 'Test Case', '1709534609734@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$zB2uvu5YboJj5RvnW+4gJw$Csesm55lM7r62uFvwfUQmcxz5fAAsktknPt7Le0IzoM', NULL, NULL, NULL, 'customer', '2024-03-04 13:43:29.836406', NULL
    );

INSERT INTO
    public.users
VALUES (
        763, 'Test Case', '1709531872423@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$anTX4icsVhoNob/40gHdYw$OmDh+pCf4T9JsHMWhBARkRb3SBpj1HTZivkyhpZJcQ0', NULL, NULL, NULL, 'customer', '2024-03-04 12:57:52.490662', NULL
    );

INSERT INTO
    public.users
VALUES (
        764, 'Test Case', '1709531872505@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$zZ3QdHi67elamQYiQeJtEQ$pQSTupKBJhyfPgboeSTxCW1N2+iCkoYK/ZhuwnngueA', NULL, NULL, NULL, 'customer', '2024-03-04 12:57:52.572731', NULL
    );

INSERT INTO
    public.users
VALUES (
        805, 'Test Case', '1709534166361@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ASNJUnvgH3fbgu/cX6D9TA$F26Fe1uQHFFpAetg+KqF5QhliNIIRD40zm/TMfzWDfY', NULL, NULL, NULL, 'customer', '2024-03-04 13:36:06.444859', NULL
    );

INSERT INTO
    public.users
VALUES (
        806, 'Test Case', '1709534166453@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$GzTe3Qx/f2gdouY/76ug9A$HfQauzDmbBziK+bK4/+C5ogTu67t7Q/llytR8dY1iA4', NULL, NULL, NULL, 'customer', '2024-03-04 13:36:06.540907', NULL
    );

INSERT INTO
    public.users
VALUES (
        672, 'Test Case', '1709499403106@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$elwR82QzgQGlTP1FUHC8EA$FhR2qHE6+JuiesCHPZ2hP8vk9KwT4BzhB+t8PEA4mj0', NULL, NULL, NULL, 'customer', '2024-03-04 03:56:43.174183', NULL
    );

INSERT INTO
    public.users
VALUES (
        1, 'Admin', 'admin.example@gmial.com', '$argon2id$v=19$m=65536,t=3,p=4$2jepbAhRW7tX+m+s1MuFuQ$QHaWh9NbW+FqdhP8k5Pu6oFQWzjqfzRWDKa0TId1ZoA', NULL, 'uploads/profile/1ad24dd4-f6c9-4dac-b308-7667f2a6d225.png', NULL, 'admin', '2023-11-14 16:09:41.516344', '2024-03-04 13:48:28.803156'
    );

INSERT INTO
    public.users
VALUES (
        624, 'Test Case', '1709499016756@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$7SR5tP08BBo4hQvYgpC+Yg$1aDtnEb6GaPcAIQD21pVIGLHoLAumj6XPZ2r6VB96FQ', NULL, NULL, NULL, 'customer', '2024-03-04 03:50:16.834505', NULL
    );

INSERT INTO
    public.users
VALUES (
        625, 'Test Case', '1709499016837@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$mJcnb1LF7F6mMenNFkL5lw$eLe7NI5Ga0YmDwvsNJXvLaPNf6KrBbm3HcsVdiOAEDQ', NULL, NULL, NULL, 'customer', '2024-03-04 03:50:16.904343', NULL
    );

INSERT INTO
    public.users
VALUES (
        696, 'Test Case', '1709499593288@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Y4xogVixdx1eG0+umypcKg$o56W03gZ+OPfpdX9Hg/RCYGo+x9NDQSC9g/lhjffN1k', NULL, NULL, NULL, 'customer', '2024-03-04 03:59:53.362541', NULL
    );

INSERT INTO
    public.users
VALUES (
        697, 'Test Case', '1709499593371@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$uWtrarKRfM59ygKOPGtjqA$597QuUl2k3aJcT7Vioag2EpRBxrQjEvSFamTv5RHUio', NULL, NULL, NULL, 'customer', '2024-03-04 03:59:53.468268', NULL
    );

INSERT INTO
    public.users
VALUES (
        673, 'Test Case', '1709499403183@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$vjkMRtSZKUyNmVQjwOdTfw$A/Sa5f8TjolzZC8W9m1GDvsBsEGtXRgvlS/MeYSvNm0', NULL, NULL, NULL, 'customer', '2024-03-04 03:56:43.245283', NULL
    );

INSERT INTO
    public.users
VALUES (
        744, 'Test Case', '1709499917950@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$vP+v6GaQujtt1crQ04tOxg$vdmjxwOV2YUHoFNoC2cUPZzAqLQnmmkzdg2wsoQhMi0', NULL, NULL, NULL, 'customer', '2024-03-04 04:05:18.024955', NULL
    );

INSERT INTO
    public.users
VALUES (
        600, 'Test Case', '1709498858124@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$LktSnsk8vMO5qkUQR9kT5w$plceMomwNCVbAMjcnb6NPgLASuAofq+CCq3+oI0ae6M', NULL, NULL, NULL, 'customer', '2024-03-04 03:47:38.203713', NULL
    );

INSERT INTO
    public.users
VALUES (
        745, 'Test Case', '1709499918026@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$1WxXLdpD8/xJY6/4ChE9mA$YDkpYpNJqLsceR9tsZWDvgXWGeO5jabT7z2G5R/Seqo', NULL, NULL, NULL, 'customer', '2024-03-04 04:05:18.095657', NULL
    );

INSERT INTO
    public.users
VALUES (
        601, 'Test Case', '1709498858206@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$tu+YJfEYc24+Rr7dUC5VbQ$fAN7xss48MkbF/ke+s5RLDS1qDlpHifZAw+NwGTit5o', NULL, NULL, NULL, 'customer', '2024-03-04 03:47:38.269068', NULL
    );

INSERT INTO
    public.users
VALUES (
        720, 'Test Case', '1709499826724@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$jIaKkz7ShntQiKOoR4P08Q$n0d+cQWVV3No/pJhCR67l9CQeHC2IfGA2f1CSTWjgYA', NULL, NULL, NULL, 'customer', '2024-03-04 04:03:46.793353', NULL
    );

INSERT INTO
    public.users
VALUES (
        721, 'Test Case', '1709499826803@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$2BvHKH/sauqkGSQU14BmlQ$nSXG/tIsez/4YwbyPKBizxXZRE+mLXmaN7cjE3ijKTg', NULL, NULL, NULL, 'customer', '2024-03-04 04:03:46.885072', NULL
    );

INSERT INTO
    public.users
VALUES (
        779, 'Test Case', '1709532826883@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Qu0w++nK/QmUzjGyFM4NHg$mFMPySHGjQxiUwuszbnnWSdXdPi6iEJpCMvkLn+6tmk', NULL, NULL, NULL, 'customer', '2024-03-04 13:13:46.98007', NULL
    );

INSERT INTO
    public.users
VALUES (
        755, 'Test Case', '1709506271339@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$J4sVOrBu4xZYxF7fnZ9QZw$T3b8Y/bHDXLdeTXcVmdKDpZMaQD5XWuE4VPUAK3vILg', NULL, NULL, NULL, 'customer', '2024-03-04 05:51:11.406666', NULL
    );

INSERT INTO
    public.users
VALUES (
        648, 'Test Case', '1709499154372@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$19GRfNJ5QN+EG8ggD4xQjw$NKb4CiTPMoQqTZfEdYBwxQEMoCUsNhgTrvbHD+cfm1w', NULL, NULL, NULL, 'customer', '2024-03-04 03:52:34.4416', NULL
    );

INSERT INTO
    public.users
VALUES (
        649, 'Test Case', '1709499154449@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$jeBaLmRpor6GS8bHbNxuFQ$RLaxTbcZuIwqOTv3vwI7teIDCxFzxUlYqfLVtXziO0E', NULL, NULL, NULL, 'customer', '2024-03-04 03:52:34.516974', NULL
    );

INSERT INTO
    public.users
VALUES (
        756, 'Test Case', '1709506271407@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ZFufQhJ6PN91NfaltXtcmQ$/O61u7dX6hZxXPSnHd6mUdyKIRiuJJHOpqJYhfsHtpk', NULL, NULL, NULL, 'customer', '2024-03-04 05:51:11.472116', NULL
    );

INSERT INTO
    public.users
VALUES (
        780, 'Test Case', '1709532826990@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$HWd2AKiYdy27pIZrJKF4Xw$Q9NhdVnzk/eVTshzzog9M5edcZkwgdPBnyqlrxx5q0w', NULL, NULL, NULL, 'customer', '2024-03-04 13:13:47.109269', NULL
    );

INSERT INTO
    public.users
VALUES (
        797, 'Test Case', '1709533248067@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$/dRagTyBgOObvE4eAi5h0Q$0zSbweKs1VVQmfqx165njVcxRzUaUJr8EASL+EwubxE', NULL, NULL, NULL, 'customer', '2024-03-04 13:20:48.15351', NULL
    );

INSERT INTO
    public.users
VALUES (
        798, 'Test Case', '1709533248162@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$WzSHHEE3nWvbGLNECnkWeA$kB912CaH3o4RW3fruInvoBjCBWgvF/aVrpS1D7j6Hlw', NULL, NULL, NULL, 'customer', '2024-03-04 13:20:48.25401', NULL
    );

INSERT INTO
    public.users
VALUES (
        821, 'Test Case', '1709534506206@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$cLB54H+t2vWQEXpDnMTclQ$Y2bfr15+krjNbsxul6VXjhmJt01j0Bm0PgxckzmNTMU', NULL, NULL, NULL, 'customer', '2024-03-04 13:41:46.29245', NULL
    );

INSERT INTO
    public.users
VALUES (
        822, 'Test Case', '1709534506296@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$QCUBdFT7+ZFlS5y/aAjfig$ZQsYy9Ld1+p3IqfbuB+nNMgzNLd58BjBo2l7IM/4z8s', NULL, NULL, NULL, 'customer', '2024-03-04 13:41:46.370116', NULL
    );

--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 227
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public.categories_id_seq', 4, true );

--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 237
-- Name: message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public.message_id_seq', 45, true );

--
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 235
-- Name: orderDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public."orderDetails_id_seq"', 155, true );

--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 233
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public.orders_id_seq', 145, true );

--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 229
-- Name: productCategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval (
        'public."productCategories_id_seq"', 68, true
    );

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 225
-- Name: productRatings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public."productRatings_id_seq"', 22, true );

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 219
-- Name: productSize_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public."productSize_id_seq"', 3, true );

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 223
-- Name: productTags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public."productTags_id_seq"', 2, true );

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 239
-- Name: productTags_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public."productTags_id_seq1"', 2, true );

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 221
-- Name: productVariant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public."productVariant_id_seq"', 4, true );

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 217
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public.products_id_seq', 273, true );

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 231
-- Name: promo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public.promo_id_seq', 7, true );

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 241
-- Name: resetPassword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public."resetPassword_id_seq"', 4, true );

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval ( 'public.users_id_seq', 855, true );

--
-- TOC entry 4816 (class 2606 OID 20082)
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
ADD CONSTRAINT categories_name_key UNIQUE (name);

--
-- TOC entry 4818 (class 2606 OID 20080)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
ADD CONSTRAINT categories_pkey PRIMARY KEY (id);

--
-- TOC entry 4830 (class 2606 OID 20180)
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
ADD CONSTRAINT message_pkey PRIMARY KEY (id);

--
-- TOC entry 4828 (class 2606 OID 20150)
-- Name: orderDetails orderDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderDetails"
    ADD CONSTRAINT "orderDetails_pkey" PRIMARY KEY (id);

--
-- TOC entry 4826 (class 2606 OID 20132)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
ADD CONSTRAINT orders_pkey PRIMARY KEY (id);

--
-- TOC entry 4820 (class 2606 OID 20090)
-- Name: productCategories productCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productCategories"
    ADD CONSTRAINT "productCategories_pkey" PRIMARY KEY (id);

--
-- TOC entry 4814 (class 2606 OID 20062)
-- Name: productRatings productRatings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productRatings"
    ADD CONSTRAINT "productRatings_pkey" PRIMARY KEY (id);

--
-- TOC entry 4804 (class 2606 OID 20031)
-- Name: productSize productSize_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productSize"
    ADD CONSTRAINT "productSize_pkey" PRIMARY KEY (id);

--
-- TOC entry 4810 (class 2606 OID 20052)
-- Name: tags productTags_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
ADD CONSTRAINT "productTags_name_key" UNIQUE (name);

--
-- TOC entry 4812 (class 2606 OID 20050)
-- Name: tags productTags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
ADD CONSTRAINT "productTags_pkey" PRIMARY KEY (id);

--
-- TOC entry 4832 (class 2606 OID 26970)
-- Name: productTags productTags_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productTags"
    ADD CONSTRAINT "productTags_pkey1" PRIMARY KEY (id);

--
-- TOC entry 4806 (class 2606 OID 20042)
-- Name: productVariant productVariant_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productVariant"
    ADD CONSTRAINT "productVariant_name_key" UNIQUE (name);

--
-- TOC entry 4808 (class 2606 OID 20040)
-- Name: productVariant productVariant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productVariant"
    ADD CONSTRAINT "productVariant_pkey" PRIMARY KEY (id);

--
-- TOC entry 4800 (class 2606 OID 20015)
-- Name: products products_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
ADD CONSTRAINT products_name_key UNIQUE (name);

--
-- TOC entry 4802 (class 2606 OID 20013)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
ADD CONSTRAINT products_pkey PRIMARY KEY (id);

--
-- TOC entry 4822 (class 2606 OID 20113)
-- Name: promo promo_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo
ADD CONSTRAINT promo_code_key UNIQUE (code);

--
-- TOC entry 4824 (class 2606 OID 20111)
-- Name: promo promo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo
ADD CONSTRAINT promo_pkey PRIMARY KEY (id);

--
-- TOC entry 4834 (class 2606 OID 27797)
-- Name: resetPassword resetPassword_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."resetPassword"
    ADD CONSTRAINT "resetPassword_pkey" PRIMARY KEY (id);

--
-- TOC entry 4796 (class 2606 OID 20003)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
ADD CONSTRAINT users_email_key UNIQUE (email);

--
-- TOC entry 4798 (class 2606 OID 20001)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
ADD CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- TOC entry 4845 (class 2606 OID 20181)
-- Name: message message_recipientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
ADD CONSTRAINT "message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES public.users (id);

--
-- TOC entry 4846 (class 2606 OID 20186)
-- Name: message message_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
ADD CONSTRAINT "message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.users (id);

--
-- TOC entry 4841 (class 2606 OID 20166)
-- Name: orderDetails orderDetails_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderDetails"
    ADD CONSTRAINT "orderDetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id);

--
-- TOC entry 4842 (class 2606 OID 20151)
-- Name: orderDetails orderDetails_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderDetails"
    ADD CONSTRAINT "orderDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id);

--
-- TOC entry 4843 (class 2606 OID 20156)
-- Name: orderDetails orderDetails_productSizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderDetails"
    ADD CONSTRAINT "orderDetails_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES public."productSize"(id);

--
-- TOC entry 4844 (class 2606 OID 20161)
-- Name: orderDetails orderDetails_productVariantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderDetails"
    ADD CONSTRAINT "orderDetails_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES public."productVariant"(id);

--
-- TOC entry 4839 (class 2606 OID 20138)
-- Name: orders orders_promoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
ADD CONSTRAINT "orders_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES public.promo (id);

--
-- TOC entry 4840 (class 2606 OID 20133)
-- Name: orders orders_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users (id);

--
-- TOC entry 4837 (class 2606 OID 20096)
-- Name: productCategories productCategories_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productCategories"
    ADD CONSTRAINT "productCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id);

--
-- TOC entry 4838 (class 2606 OID 20091)
-- Name: productCategories productCategories_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productCategories"
    ADD CONSTRAINT "productCategories_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id);

--
-- TOC entry 4835 (class 2606 OID 20063)
-- Name: productRatings productRatings_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productRatings"
    ADD CONSTRAINT "productRatings_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id);

--
-- TOC entry 4836 (class 2606 OID 20068)
-- Name: productRatings productRatings_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productRatings"
    ADD CONSTRAINT "productRatings_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);

--
-- TOC entry 4847 (class 2606 OID 26971)
-- Name: productTags productTags_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productTags"
    ADD CONSTRAINT "productTags_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id);

--
-- TOC entry 4848 (class 2606 OID 26976)
-- Name: productTags productTags_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productTags"
    ADD CONSTRAINT "productTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.users(id);

-- Completed on 2024-04-08 05:58:11

--
-- PostgreSQL database dump complete
--