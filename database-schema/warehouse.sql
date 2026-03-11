--
-- PostgreSQL database dump
--

\restrict M5dSYBSSC1nZXhEp1Ze3JaXMA01x84pQjpxkGbiS5f7t51S8BxEKIHpgWaZ50CD

-- Dumped from database version 14.20 (Homebrew)
-- Dumped by pg_dump version 14.20 (Homebrew)

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

--
-- Name: postatus; Type: TYPE; Schema: public; Owner: ismaeelshujaat
--

CREATE TYPE public.postatus AS ENUM (
    'DRAFT',
    'SUBMITTED',
    'RECEIVED'
);


ALTER TYPE public.postatus OWNER TO ismaeelshujaat;

--
-- Name: trans_type; Type: TYPE; Schema: public; Owner: ismaeelshujaat
--

CREATE TYPE public.trans_type AS ENUM (
    'IN',
    'OUT'
);


ALTER TYPE public.trans_type OWNER TO ismaeelshujaat;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: inventory_transaction; Type: TABLE; Schema: public; Owner: ismaeelshujaat
--

CREATE TABLE public.inventory_transaction (
    id integer NOT NULL,
    product_id integer NOT NULL,
    transaction_type public.trans_type DEFAULT 'IN'::public.trans_type,
    quantity integer NOT NULL,
    reference_type character varying(50),
    reference_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT inventory_transaction_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.inventory_transaction OWNER TO ismaeelshujaat;

--
-- Name: inventory_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: ismaeelshujaat
--

CREATE SEQUENCE public.inventory_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_transaction_id_seq OWNER TO ismaeelshujaat;

--
-- Name: inventory_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ismaeelshujaat
--

ALTER SEQUENCE public.inventory_transaction_id_seq OWNED BY public.inventory_transaction.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: ismaeelshujaat
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    sku character varying(100) NOT NULL,
    description text,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.product OWNER TO ismaeelshujaat;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: ismaeelshujaat
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO ismaeelshujaat;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ismaeelshujaat
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: product_supplier; Type: TABLE; Schema: public; Owner: ismaeelshujaat
--

CREATE TABLE public.product_supplier (
    id integer NOT NULL,
    product_id integer NOT NULL,
    supplier_id integer NOT NULL,
    price numeric(12,2) NOT NULL
);


ALTER TABLE public.product_supplier OWNER TO ismaeelshujaat;

--
-- Name: product_supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: ismaeelshujaat
--

CREATE SEQUENCE public.product_supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_supplier_id_seq OWNER TO ismaeelshujaat;

--
-- Name: product_supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ismaeelshujaat
--

ALTER SEQUENCE public.product_supplier_id_seq OWNED BY public.product_supplier.id;


--
-- Name: purchase_order; Type: TABLE; Schema: public; Owner: ismaeelshujaat
--

CREATE TABLE public.purchase_order (
    id integer NOT NULL,
    po_number character varying(100) NOT NULL,
    supplier_id integer NOT NULL,
    status public.postatus DEFAULT 'DRAFT'::public.postatus,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.purchase_order OWNER TO ismaeelshujaat;

--
-- Name: purchase_order_id_seq; Type: SEQUENCE; Schema: public; Owner: ismaeelshujaat
--

CREATE SEQUENCE public.purchase_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.purchase_order_id_seq OWNER TO ismaeelshujaat;

--
-- Name: purchase_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ismaeelshujaat
--

ALTER SEQUENCE public.purchase_order_id_seq OWNED BY public.purchase_order.id;


--
-- Name: purchase_order_item; Type: TABLE; Schema: public; Owner: ismaeelshujaat
--

CREATE TABLE public.purchase_order_item (
    id integer NOT NULL,
    purchase_order_id integer NOT NULL,
    product_id integer NOT NULL,
    ordered_qty integer NOT NULL,
    received_qty integer DEFAULT 0,
    price numeric(12,2) NOT NULL,
    CONSTRAINT purchase_order_item_ordered_qty_check CHECK ((ordered_qty > 0))
);


ALTER TABLE public.purchase_order_item OWNER TO ismaeelshujaat;

--
-- Name: purchase_order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: ismaeelshujaat
--

CREATE SEQUENCE public.purchase_order_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.purchase_order_item_id_seq OWNER TO ismaeelshujaat;

--
-- Name: purchase_order_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ismaeelshujaat
--

ALTER SEQUENCE public.purchase_order_item_id_seq OWNED BY public.purchase_order_item.id;


--
-- Name: supplier; Type: TABLE; Schema: public; Owner: ismaeelshujaat
--

CREATE TABLE public.supplier (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255),
    phone character varying(50),
    address text,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.supplier OWNER TO ismaeelshujaat;

--
-- Name: supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: ismaeelshujaat
--

CREATE SEQUENCE public.supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.supplier_id_seq OWNER TO ismaeelshujaat;

--
-- Name: supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ismaeelshujaat
--

ALTER SEQUENCE public.supplier_id_seq OWNED BY public.supplier.id;


--
-- Name: inventory_transaction id; Type: DEFAULT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.inventory_transaction ALTER COLUMN id SET DEFAULT nextval('public.inventory_transaction_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: product_supplier id; Type: DEFAULT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.product_supplier ALTER COLUMN id SET DEFAULT nextval('public.product_supplier_id_seq'::regclass);


--
-- Name: purchase_order id; Type: DEFAULT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.purchase_order ALTER COLUMN id SET DEFAULT nextval('public.purchase_order_id_seq'::regclass);


--
-- Name: purchase_order_item id; Type: DEFAULT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.purchase_order_item ALTER COLUMN id SET DEFAULT nextval('public.purchase_order_item_id_seq'::regclass);


--
-- Name: supplier id; Type: DEFAULT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.supplier ALTER COLUMN id SET DEFAULT nextval('public.supplier_id_seq'::regclass);


--
-- Name: inventory_transaction inventory_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.inventory_transaction
    ADD CONSTRAINT inventory_transaction_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: product product_sku_key; Type: CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_sku_key UNIQUE (sku);


--
-- Name: product_supplier product_supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.product_supplier
    ADD CONSTRAINT product_supplier_pkey PRIMARY KEY (id);


--
-- Name: purchase_order_item purchase_order_item_pkey; Type: CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.purchase_order_item
    ADD CONSTRAINT purchase_order_item_pkey PRIMARY KEY (id);


--
-- Name: purchase_order purchase_order_pkey; Type: CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_pkey PRIMARY KEY (id);


--
-- Name: purchase_order purchase_order_po_number_key; Type: CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_po_number_key UNIQUE (po_number);


--
-- Name: supplier supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (id);


--
-- Name: product_supplier unique_product_supplier; Type: CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.product_supplier
    ADD CONSTRAINT unique_product_supplier UNIQUE (product_id, supplier_id);


--
-- Name: inventory_transaction fk_inventory_product; Type: FK CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.inventory_transaction
    ADD CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: purchase_order fk_po_supplier; Type: FK CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT fk_po_supplier FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: purchase_order_item fk_poi_order; Type: FK CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.purchase_order_item
    ADD CONSTRAINT fk_poi_order FOREIGN KEY (purchase_order_id) REFERENCES public.purchase_order(id) ON DELETE CASCADE;


--
-- Name: purchase_order_item fk_poi_product; Type: FK CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.purchase_order_item
    ADD CONSTRAINT fk_poi_product FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product_supplier fk_product; Type: FK CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.product_supplier
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- Name: product_supplier fk_supplier; Type: FK CONSTRAINT; Schema: public; Owner: ismaeelshujaat
--

ALTER TABLE ONLY public.product_supplier
    ADD CONSTRAINT fk_supplier FOREIGN KEY (supplier_id) REFERENCES public.supplier(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict M5dSYBSSC1nZXhEp1Ze3JaXMA01x84pQjpxkGbiS5f7t51S8BxEKIHpgWaZ50CD

