CREATE DATABASE db_prueba_backend_sql;

USE db_prueba_backend_sql;

CREATE TABLE
    users (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        email_verified_at TIMESTAMP NULL DEFAULT NULL,
        estado TINYINT(4) NOT NULL,
        created_by BIGINT(20) UNSIGNED,
        update_by BIGINT(20) UNSIGNED,
        foto VARCHAR(255) NULL DEFAULT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL DEFAULT NULL
    );

CREATE TABLE
    bodegas (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) COLLATE utf8_bin NOT NULL UNIQUE,
        id_responsable BIGINT(20) UNSIGNED NOT NULL,
        estado TINYINT(4) NOT NULL,
        created_by BIGINT(20) UNSIGNED,
        update_by BIGINT(20) UNSIGNED,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL DEFAULT NULL,
        FOREIGN KEY (id_responsable) REFERENCES users(id),
        FOREIGN KEY (created_by) REFERENCES users(id),
        FOREIGN KEY (update_by) REFERENCES users(id)
    );

CREATE TABLE
    productos (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) COLLATE utf8_bin NOT NULL UNIQUE,
        descripcion VARCHAR(255) NOT NULL,
        estado TINYINT(4) NOT NULL,
        created_by BIGINT(20) UNSIGNED,
        update_by BIGINT(20) UNSIGNED,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL DEFAULT NULL,
        FOREIGN KEY (created_by) REFERENCES users(id),
        FOREIGN KEY (update_by) REFERENCES users(id)
    );

CREATE TABLE
    inventarios (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        id_bodega BIGINT(20) UNSIGNED NOT NULL,
        id_producto BIGINT(20) UNSIGNED NOT NULL,
        cantidad INT(11) NOT NULL,
        created_by BIGINT(20) UNSIGNED,
        update_by BIGINT(20) UNSIGNED,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL DEFAULT NULL,
        FOREIGN KEY (id_bodega) REFERENCES bodegas(id),
        FOREIGN KEY (id_producto) REFERENCES productos(id),
        FOREIGN KEY (created_by) REFERENCES users(id),
        FOREIGN KEY (update_by) REFERENCES users(id)
    );

CREATE TABLE
    historiales (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        cantidad INTEGER NOT NULL,
        id_bodega_origen BIGINT(20) UNSIGNED NOT NULL,
        id_bodega_destino BIGINT(20) UNSIGNED NOT NULL,
        id_inventario BIGINT(20) UNSIGNED NOT NULL,
        created_by BIGINT(20) UNSIGNED,
        update_by BIGINT(20) UNSIGNED,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL DEFAULT NULL,
        FOREIGN KEY (id_inventario) REFERENCES inventarios(id),
        FOREIGN KEY (id_bodega_origen) REFERENCES bodegas(id),
        FOREIGN KEY (id_bodega_destino) REFERENCES bodegas(id),
        FOREIGN KEY (created_by) REFERENCES users(id),
        FOREIGN KEY (update_by) REFERENCES users(id)
    );

ALTER TABLE historiales ADD COLUMN id_producto BIGINT(20) UNSIGNED NOT NULL;
