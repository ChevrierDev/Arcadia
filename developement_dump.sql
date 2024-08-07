PGDMP      #                |           Arcadia    16.2    16.2 a    e           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            f           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            g           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            h           1262    16485    Arcadia    DATABASE     |   CREATE DATABASE "Arcadia" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE "Arcadia";
                postgres    false            �            1259    16732    admin    TABLE     �   CREATE TABLE public.admin (
    admin_id integer NOT NULL,
    email character varying(250) NOT NULL,
    password character varying(250) NOT NULL,
    role character varying(150) NOT NULL
);
    DROP TABLE public.admin;
       public         heap    postgres    false            �            1259    16731    admin_admin_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.admin_admin_id_seq;
       public          postgres    false    238            i           0    0    admin_admin_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.admin_admin_id_seq OWNED BY public.admin.admin_id;
          public          postgres    false    237            �            1259    16632    animal    TABLE     �   CREATE TABLE public.animal (
    animal_id integer NOT NULL,
    name character varying(250) NOT NULL,
    race character varying(250) NOT NULL,
    images text,
    habitat_id integer
);
    DROP TABLE public.animal;
       public         heap    postgres    false            �            1259    16631    animal_animal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.animal_animal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.animal_animal_id_seq;
       public          postgres    false    226            j           0    0    animal_animal_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.animal_animal_id_seq OWNED BY public.animal.animal_id;
          public          postgres    false    225            �            1259    16675    consommation    TABLE       CREATE TABLE public.consommation (
    consommation_id integer NOT NULL,
    date date DEFAULT CURRENT_TIMESTAMP,
    heure time without time zone DEFAULT CURRENT_TIMESTAMP,
    grammage integer NOT NULL,
    animal_id integer,
    employee_id integer,
    food_id integer
);
     DROP TABLE public.consommation;
       public         heap    postgres    false            �            1259    16674     consommation_consommation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.consommation_consommation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.consommation_consommation_id_seq;
       public          postgres    false    234            k           0    0     consommation_consommation_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.consommation_consommation_id_seq OWNED BY public.consommation.consommation_id;
          public          postgres    false    233            �            1259    16523    employee    TABLE     $  CREATE TABLE public.employee (
    employee_id integer NOT NULL,
    first_name character varying(250) NOT NULL,
    last_name character varying(250) NOT NULL,
    email character varying(250) NOT NULL,
    password character varying(250) NOT NULL,
    role character varying(50) NOT NULL
);
    DROP TABLE public.employee;
       public         heap    postgres    false            �            1259    16522    employee_employee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employee_employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.employee_employee_id_seq;
       public          postgres    false    220            l           0    0    employee_employee_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.employee_employee_id_seq OWNED BY public.employee.employee_id;
          public          postgres    false    219            �            1259    16646    food    TABLE     �   CREATE TABLE public.food (
    food_id integer NOT NULL,
    name character varying(250) NOT NULL,
    type character varying(250) NOT NULL,
    quantity integer
);
    DROP TABLE public.food;
       public         heap    postgres    false            �            1259    16645    food_food_id_seq    SEQUENCE     �   CREATE SEQUENCE public.food_food_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.food_food_id_seq;
       public          postgres    false    228            m           0    0    food_food_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.food_food_id_seq OWNED BY public.food.food_id;
          public          postgres    false    227            �            1259    16609    habitat    TABLE     �   CREATE TABLE public.habitat (
    habitat_id integer NOT NULL,
    name character varying(250),
    description text,
    veterinarian_comment text,
    images text
);
    DROP TABLE public.habitat;
       public         heap    postgres    false            �            1259    16608    habitat_habitat_id_seq    SEQUENCE     �   CREATE SEQUENCE public.habitat_habitat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.habitat_habitat_id_seq;
       public          postgres    false    224            n           0    0    habitat_habitat_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.habitat_habitat_id_seq OWNED BY public.habitat.habitat_id;
          public          postgres    false    223            �            1259    16694    health_record    TABLE     5  CREATE TABLE public.health_record (
    health_record_id integer NOT NULL,
    date date DEFAULT CURRENT_TIMESTAMP,
    content text NOT NULL,
    detail_etat text NOT NULL,
    animal_id integer,
    veterinarian_id integer,
    food_offered character varying(255),
    food_amount character varying(255)
);
 !   DROP TABLE public.health_record;
       public         heap    postgres    false            �            1259    16693 "   health_record_health_record_id_seq    SEQUENCE     �   CREATE SEQUENCE public.health_record_health_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.health_record_health_record_id_seq;
       public          postgres    false    236            o           0    0 "   health_record_health_record_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.health_record_health_record_id_seq OWNED BY public.health_record.health_record_id;
          public          postgres    false    235            �            1259    16487    knex_migrations    TABLE     �   CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);
 #   DROP TABLE public.knex_migrations;
       public         heap    postgres    false            �            1259    16486    knex_migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.knex_migrations_id_seq;
       public          postgres    false    216            p           0    0    knex_migrations_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;
          public          postgres    false    215            �            1259    16494    knex_migrations_lock    TABLE     `   CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);
 (   DROP TABLE public.knex_migrations_lock;
       public         heap    postgres    false            �            1259    16493    knex_migrations_lock_index_seq    SEQUENCE     �   CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.knex_migrations_lock_index_seq;
       public          postgres    false    218            q           0    0    knex_migrations_lock_index_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;
          public          postgres    false    217            �            1259    16664    review    TABLE     %  CREATE TABLE public.review (
    review_id integer NOT NULL,
    pseudo character varying(250) NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    approved boolean DEFAULT false NOT NULL,
    email character varying(250) NOT NULL
);
    DROP TABLE public.review;
       public         heap    postgres    false            �            1259    16663    review_review_id_seq    SEQUENCE     �   CREATE SEQUENCE public.review_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.review_review_id_seq;
       public          postgres    false    232            r           0    0    review_review_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.review_review_id_seq OWNED BY public.review.review_id;
          public          postgres    false    231            �            1259    16655    service    TABLE     �   CREATE TABLE public.service (
    service_id integer NOT NULL,
    name character varying(250) NOT NULL,
    description text NOT NULL,
    images text
);
    DROP TABLE public.service;
       public         heap    postgres    false            �            1259    16654    service_service_id_seq    SEQUENCE     �   CREATE SEQUENCE public.service_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.service_service_id_seq;
       public          postgres    false    230            s           0    0    service_service_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.service_service_id_seq OWNED BY public.service.service_id;
          public          postgres    false    229            �            1259    16534    veterinarian    TABLE     ,  CREATE TABLE public.veterinarian (
    veterinarian_id integer NOT NULL,
    first_name character varying(250) NOT NULL,
    last_name character varying(250) NOT NULL,
    email character varying(250) NOT NULL,
    password character varying(250) NOT NULL,
    role character varying(50) NOT NULL
);
     DROP TABLE public.veterinarian;
       public         heap    postgres    false            �            1259    16533     veterinarian_veterinarian_id_seq    SEQUENCE     �   CREATE SEQUENCE public.veterinarian_veterinarian_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.veterinarian_veterinarian_id_seq;
       public          postgres    false    222            t           0    0     veterinarian_veterinarian_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.veterinarian_veterinarian_id_seq OWNED BY public.veterinarian.veterinarian_id;
          public          postgres    false    221            �           2604    16735    admin admin_id    DEFAULT     p   ALTER TABLE ONLY public.admin ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_admin_id_seq'::regclass);
 =   ALTER TABLE public.admin ALTER COLUMN admin_id DROP DEFAULT;
       public          postgres    false    238    237    238            �           2604    16635    animal animal_id    DEFAULT     t   ALTER TABLE ONLY public.animal ALTER COLUMN animal_id SET DEFAULT nextval('public.animal_animal_id_seq'::regclass);
 ?   ALTER TABLE public.animal ALTER COLUMN animal_id DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    16678    consommation consommation_id    DEFAULT     �   ALTER TABLE ONLY public.consommation ALTER COLUMN consommation_id SET DEFAULT nextval('public.consommation_consommation_id_seq'::regclass);
 K   ALTER TABLE public.consommation ALTER COLUMN consommation_id DROP DEFAULT;
       public          postgres    false    233    234    234            �           2604    16526    employee employee_id    DEFAULT     |   ALTER TABLE ONLY public.employee ALTER COLUMN employee_id SET DEFAULT nextval('public.employee_employee_id_seq'::regclass);
 C   ALTER TABLE public.employee ALTER COLUMN employee_id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    16649    food food_id    DEFAULT     l   ALTER TABLE ONLY public.food ALTER COLUMN food_id SET DEFAULT nextval('public.food_food_id_seq'::regclass);
 ;   ALTER TABLE public.food ALTER COLUMN food_id DROP DEFAULT;
       public          postgres    false    227    228    228            �           2604    16612    habitat habitat_id    DEFAULT     x   ALTER TABLE ONLY public.habitat ALTER COLUMN habitat_id SET DEFAULT nextval('public.habitat_habitat_id_seq'::regclass);
 A   ALTER TABLE public.habitat ALTER COLUMN habitat_id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    16697    health_record health_record_id    DEFAULT     �   ALTER TABLE ONLY public.health_record ALTER COLUMN health_record_id SET DEFAULT nextval('public.health_record_health_record_id_seq'::regclass);
 M   ALTER TABLE public.health_record ALTER COLUMN health_record_id DROP DEFAULT;
       public          postgres    false    235    236    236            �           2604    16490    knex_migrations id    DEFAULT     x   ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);
 A   ALTER TABLE public.knex_migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    16497    knex_migrations_lock index    DEFAULT     �   ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);
 I   ALTER TABLE public.knex_migrations_lock ALTER COLUMN index DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    16667    review review_id    DEFAULT     t   ALTER TABLE ONLY public.review ALTER COLUMN review_id SET DEFAULT nextval('public.review_review_id_seq'::regclass);
 ?   ALTER TABLE public.review ALTER COLUMN review_id DROP DEFAULT;
       public          postgres    false    231    232    232            �           2604    16658    service service_id    DEFAULT     x   ALTER TABLE ONLY public.service ALTER COLUMN service_id SET DEFAULT nextval('public.service_service_id_seq'::regclass);
 A   ALTER TABLE public.service ALTER COLUMN service_id DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    16537    veterinarian veterinarian_id    DEFAULT     �   ALTER TABLE ONLY public.veterinarian ALTER COLUMN veterinarian_id SET DEFAULT nextval('public.veterinarian_veterinarian_id_seq'::regclass);
 K   ALTER TABLE public.veterinarian ALTER COLUMN veterinarian_id DROP DEFAULT;
       public          postgres    false    222    221    222            b          0    16732    admin 
   TABLE DATA           @   COPY public.admin (admin_id, email, password, role) FROM stdin;
    public          postgres    false    238   �s       V          0    16632    animal 
   TABLE DATA           K   COPY public.animal (animal_id, name, race, images, habitat_id) FROM stdin;
    public          postgres    false    226   qt       ^          0    16675    consommation 
   TABLE DATA           o   COPY public.consommation (consommation_id, date, heure, grammage, animal_id, employee_id, food_id) FROM stdin;
    public          postgres    false    234   �u       P          0    16523    employee 
   TABLE DATA           ]   COPY public.employee (employee_id, first_name, last_name, email, password, role) FROM stdin;
    public          postgres    false    220   v       X          0    16646    food 
   TABLE DATA           =   COPY public.food (food_id, name, type, quantity) FROM stdin;
    public          postgres    false    228   �v       T          0    16609    habitat 
   TABLE DATA           ^   COPY public.habitat (habitat_id, name, description, veterinarian_comment, images) FROM stdin;
    public          postgres    false    224   qw       `          0    16694    health_record 
   TABLE DATA           �   COPY public.health_record (health_record_id, date, content, detail_etat, animal_id, veterinarian_id, food_offered, food_amount) FROM stdin;
    public          postgres    false    236   �z       L          0    16487    knex_migrations 
   TABLE DATA           J   COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
    public          postgres    false    216   A~       N          0    16494    knex_migrations_lock 
   TABLE DATA           @   COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
    public          postgres    false    218   d       \          0    16664    review 
   TABLE DATA           ]   COPY public.review (review_id, pseudo, description, created_at, approved, email) FROM stdin;
    public          postgres    false    232   �       Z          0    16655    service 
   TABLE DATA           H   COPY public.service (service_id, name, description, images) FROM stdin;
    public          postgres    false    230   D�       R          0    16534    veterinarian 
   TABLE DATA           e   COPY public.veterinarian (veterinarian_id, first_name, last_name, email, password, role) FROM stdin;
    public          postgres    false    222   ��       u           0    0    admin_admin_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.admin_admin_id_seq', 1, true);
          public          postgres    false    237            v           0    0    animal_animal_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.animal_animal_id_seq', 18, true);
          public          postgres    false    225            w           0    0     consommation_consommation_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.consommation_consommation_id_seq', 7, true);
          public          postgres    false    233            x           0    0    employee_employee_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.employee_employee_id_seq', 16, true);
          public          postgres    false    219            y           0    0    food_food_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.food_food_id_seq', 20, true);
          public          postgres    false    227            z           0    0    habitat_habitat_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.habitat_habitat_id_seq', 19, true);
          public          postgres    false    223            {           0    0 "   health_record_health_record_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.health_record_health_record_id_seq', 19, true);
          public          postgres    false    235            |           0    0    knex_migrations_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.knex_migrations_id_seq', 16, true);
          public          postgres    false    215            }           0    0    knex_migrations_lock_index_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);
          public          postgres    false    217            ~           0    0    review_review_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.review_review_id_seq', 7, true);
          public          postgres    false    231                       0    0    service_service_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.service_service_id_seq', 61, true);
          public          postgres    false    229            �           0    0     veterinarian_veterinarian_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.veterinarian_veterinarian_id_seq', 13, true);
          public          postgres    false    221            �           2606    16741    admin admin_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_email_key;
       public            postgres    false    238            �           2606    16739    admin admin_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    238            �           2606    16639    animal animal_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.animal
    ADD CONSTRAINT animal_pkey PRIMARY KEY (animal_id);
 <   ALTER TABLE ONLY public.animal DROP CONSTRAINT animal_pkey;
       public            postgres    false    226            �           2606    16682    consommation consommation_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.consommation
    ADD CONSTRAINT consommation_pkey PRIMARY KEY (consommation_id);
 H   ALTER TABLE ONLY public.consommation DROP CONSTRAINT consommation_pkey;
       public            postgres    false    234            �           2606    16532    employee employee_email_unique 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_email_unique UNIQUE (email);
 H   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_email_unique;
       public            postgres    false    220            �           2606    16530    employee employee_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (employee_id);
 @   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_pkey;
       public            postgres    false    220            �           2606    16653    food food_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.food
    ADD CONSTRAINT food_pkey PRIMARY KEY (food_id);
 8   ALTER TABLE ONLY public.food DROP CONSTRAINT food_pkey;
       public            postgres    false    228            �           2606    16616    habitat habitat_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.habitat
    ADD CONSTRAINT habitat_pkey PRIMARY KEY (habitat_id);
 >   ALTER TABLE ONLY public.habitat DROP CONSTRAINT habitat_pkey;
       public            postgres    false    224            �           2606    16702     health_record health_record_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.health_record
    ADD CONSTRAINT health_record_pkey PRIMARY KEY (health_record_id);
 J   ALTER TABLE ONLY public.health_record DROP CONSTRAINT health_record_pkey;
       public            postgres    false    236            �           2606    16499 .   knex_migrations_lock knex_migrations_lock_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);
 X   ALTER TABLE ONLY public.knex_migrations_lock DROP CONSTRAINT knex_migrations_lock_pkey;
       public            postgres    false    218            �           2606    16492 $   knex_migrations knex_migrations_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.knex_migrations DROP CONSTRAINT knex_migrations_pkey;
       public            postgres    false    216            �           2606    16673    review review_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (review_id);
 <   ALTER TABLE ONLY public.review DROP CONSTRAINT review_pkey;
       public            postgres    false    232            �           2606    16662    service service_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (service_id);
 >   ALTER TABLE ONLY public.service DROP CONSTRAINT service_pkey;
       public            postgres    false    230            �           2606    16543 &   veterinarian veterinarian_email_unique 
   CONSTRAINT     b   ALTER TABLE ONLY public.veterinarian
    ADD CONSTRAINT veterinarian_email_unique UNIQUE (email);
 P   ALTER TABLE ONLY public.veterinarian DROP CONSTRAINT veterinarian_email_unique;
       public            postgres    false    222            �           2606    16541    veterinarian veterinarian_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.veterinarian
    ADD CONSTRAINT veterinarian_pkey PRIMARY KEY (veterinarian_id);
 H   ALTER TABLE ONLY public.veterinarian DROP CONSTRAINT veterinarian_pkey;
       public            postgres    false    222            �           2606    16640     animal animal_habitat_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.animal
    ADD CONSTRAINT animal_habitat_id_foreign FOREIGN KEY (habitat_id) REFERENCES public.habitat(habitat_id);
 J   ALTER TABLE ONLY public.animal DROP CONSTRAINT animal_habitat_id_foreign;
       public          postgres    false    4773    224    226            �           2606    16683 +   consommation consommation_animal_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.consommation
    ADD CONSTRAINT consommation_animal_id_foreign FOREIGN KEY (animal_id) REFERENCES public.animal(animal_id);
 U   ALTER TABLE ONLY public.consommation DROP CONSTRAINT consommation_animal_id_foreign;
       public          postgres    false    226    234    4775            �           2606    16688 -   consommation consommation_employee_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.consommation
    ADD CONSTRAINT consommation_employee_id_foreign FOREIGN KEY (employee_id) REFERENCES public.employee(employee_id);
 W   ALTER TABLE ONLY public.consommation DROP CONSTRAINT consommation_employee_id_foreign;
       public          postgres    false    4767    234    220            �           2606    16713    consommation fk_food    FK CONSTRAINT     w   ALTER TABLE ONLY public.consommation
    ADD CONSTRAINT fk_food FOREIGN KEY (food_id) REFERENCES public.food(food_id);
 >   ALTER TABLE ONLY public.consommation DROP CONSTRAINT fk_food;
       public          postgres    false    4777    234    228            �           2606    16703 -   health_record health_record_animal_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.health_record
    ADD CONSTRAINT health_record_animal_id_foreign FOREIGN KEY (animal_id) REFERENCES public.animal(animal_id);
 W   ALTER TABLE ONLY public.health_record DROP CONSTRAINT health_record_animal_id_foreign;
       public          postgres    false    4775    236    226            �           2606    16708 3   health_record health_record_veterinarian_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.health_record
    ADD CONSTRAINT health_record_veterinarian_id_foreign FOREIGN KEY (veterinarian_id) REFERENCES public.veterinarian(veterinarian_id);
 ]   ALTER TABLE ONLY public.health_record DROP CONSTRAINT health_record_veterinarian_id_foreign;
       public          postgres    false    222    4771    236            b   i   x�3�,HM)ʏ�Ϸ�p��/�M���K���T1JR14P��0K��q��u�2�	���ϳ,�4��J��͈t��vrI��6+v5�6��LL�������� 
(]      V     x���MN�0�דS�Tqb����J�����7�Ƥ����#���rof5z���L���<̮�~��Z�6fGZ/��!�3ZO#�ZOh��E�c�6�W����WL2!��eɪ�[����ۢ��%|5I�(y-����Ѐp<��۠�P�](��{�y �\
�UQB�d�
X� �!�1��|Qq�/�%�6؄=�a�R D.���8�|��"R?�CKI�E)E�7�ʘ�'���sC�I������Ĩ��B?��x�f���GL�S+U�3J��,��	/�      ^   e   x�]���PC�o�%�/�	��mZ��*����!sCmh�b2l�a�u���3&`�cI���@�5�0'�\x�g/�/{�����<P�u3��T����      P   �   x�]ͻ�0@�<s��Dݴ�D�x!.Em)bQ���1q9g�E����ŧ� ��x�$2if�L����PB�glG�<Nh���q�	�1;�a�T4��zeܹ���"��P-�q����МW��npR�_g`-�[���D�"`Vx��x���{^�����`����;-~���ǼEv      X   �   x�5�M
�0���SxI��(�]u�f�t"�<R�ыY����M�Q|Ș���М�0Fu�c�!{�$���o,�b����vb��*��(�u����Ս;�c��-)�_o�߱W���Eg�'�.�.'      T   W  x��T;�G�����Ɋ0ai�R&���!��&)�9���n�g@���3/}��K�zf�P��î���{�j�[�g�>J��^rΫ����e��z�qM�Q�c�˩D�.�d%������R�\֜�B7=�AW�J���_�V!��ON���p/iCwp�xo3#:�樂_"���3J>f�ą̗ϸ�h������X$]���%�1�c�V7=����s�Z[Ҫp�l���P�F�6	��zh`�l��������y�wV�q.Qz�QD�Ek:�k9���8#d�Ab��lVͯ��7M�G��i�:c���䧈�y�`\��m4�Zn�z�-\Q�Qҋ�n�j����n��f��ǫ��
��zێ(V����^��1ѱg3]�~��73���t��Z`��N�Q��9z_������a�<gT�ޥls��;:�v�% =��}�6V�
0ʡ y��A�t�� WZm�K��lʕ̅�j?p2�-Sϰ���#�޵6�䔡�anzAG��<j����\�^h��&�� �PlJ���C�@'�t-��@\kbڃ�<���g�j�歷�?��;+�f��Gv�;������zM�s���z~=s6]B_xb� +��y&o�+��EN��{ȕl��}�����%�̪�Y�(�F�
�2|3��҇�~�`��X(Fj���M���N<��8����G8�ҍ/�.�����cd�W� >�g��}����g�y��k6l��� RN�՝����M] XA��>�N �� 5]׵��E��-���X/-X��zN9�|z,)LzS]�[9���.ܾܽz}S5�l������ud      `   Y  x�}UMo�F=/��zQR��� vQ m���)�5�X�*�!8�&����c�Y�2YLX��}�͛a���z�ھ���GK�6�cD��F��-���:B�-ڨ��q�+n�����H΂�E,'P��8{�C���9����=�{`�6�����D�Q���`�r��Y���C��[!ep;���	YX�@��YL>��=� �wE`�|����Ї~3#~�Lh��dz~BH��dN�vG�#v�vt�Þ1���]�#A��<�ѺR}rV�Wu����{�O������t�Nr�A���Is	�0�N�� t"L"ֽ�@��ga��NM�/�����|�q�X��.@�O�Gj�ɜ�wx�K!b(��DJ}!�ę|��з�C���>��zYÃ��|���6+ ?��K��$���Ϛ�U�.��3А�W��⸅�Yj��=��S/�'l@��$	aP3��G������ tE�(ud��'�A�۪�_/2��~��E$?�	^c�:�f4�=���P��^!M�yw� ^�R�z-��zMv,�u����
^�Ɨŷó�c{��������y�o�`˨7WQ-��M�Ò�F��tl�Lݰ��U�1�G΢�9>S/Q�Ժ����,�3ap�s;��0�/0��/r���(�2���xpLU�N�y.��Ǟ���il��h��X҇5��*��K9�$O|p�ted˭šσ��Dj�=�j�M���v[U�z�u2Af0��k���7���
�����f�Ԏ�SUYo�z6���lJB���y��)�b�����E
Mb)�+�ł���9��F���^F�Пh)�&���X(���uU|+���d�      L     x���An�0�u8E�U���c��R䐩�
pD�T�}R�e�������C@�tP�QB�C8�q8�p�D}]wz:ۃ��!x2���־VTdfC�K�~DV7k��,Ӄ�q���M��qc�K���r+��n���sȫB��<�r�E�A����3�>t��[=����,2K=�)�V�l�=���$Tf}�*�-��q�%c�gf�[��
�I1���,C�i���9�b�zc{Eϡt]Xd���$t�|֦�h�n��>�j��>TUU�ո�      N      x�3�4������ V      \   �   x�]�1�0���q���`h�Rh餮:���<��*�"]����bJHLp��O��:�9y����/����K��5%=@r�b��\��V�6Q��L�z�%�@����J�f��	XS��Qw���{pJ�-�L�s3*�pL[�ߜ`n����
c���3�%���q�����(� �E@�      Z   0  x��T�r7<S_1>�"��ؤ���8����^����j��آ�59R߱?��Ү���p��t��z���eW�l��H<E)�PI���~��#M��6$KVȇ����PU/ģ�Rqj872��K�%e�%�u-��+\��>����I��q�3��I�a:"�e�Q����\셒�|@���k��˰�%=WXc^�!��"����\s�^Ѐ�ѥ�h�<k#��>s�1ZmMj;d�\��� �$ϕ�`g���
�\�%ǘ�[��9�u�Zыh2��h(6��ͽ��s �ji���e�f�Z
��!�	~R�m/+�S��{y�j�j;=�P��P�l��w{����1����%Ue��{�u_2H{S����C�Y����v�s����lq�%_��ެoo6��^߮7����X�.��4:�Z@�\�&..�p�az�׬��!+��'�*�j��
O"�і!e�/��3���O��bh|��!j�L�U
"�&IͪkL�Sd���BX@�]:��G� <��G�bj@~�J�յ$R��OM���9��i֝M�]��׼�i�4�~��ǧy�5��F�iv��Q��O���]_����fV��^���F�}<�y����e�ηn�q~�����Y�=�R�4�kjV9�˥���{�Jk��u�aMա�̘�6ǥ�
�	�J|
3u�!J�jv��Q�M�H��	��J��6X���ҷ�ޥ��	üw�;;��T�P0�j����r����n���E]$>9s�Ҝ�rJ��R��Jk��~�58���-��9�������[]\\�5�g�      R   y   x�34�t-*O���I���L�(�-�w��/�M���K+�T1JR14P1M5�N/*�.��u,��,6��+
�s4rqK)5.0	���.I44N�L��p	��,;����ʢ̼�̢T�=... 39%W     