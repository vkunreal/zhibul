DELIMITER $$

CREATE PROCEDURE remove_api_domain()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_table VARCHAR(255);
    DECLARE v_column VARCHAR(255);

    DECLARE cur CURSOR FOR
        SELECT TABLE_NAME, COLUMN_NAME
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()
          AND DATA_TYPE IN (
              'char',
              'varchar',
              'tinytext',
              'text',
              'mediumtext',
              'longtext'
          );

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO v_table, v_column;

        IF done THEN
            LEAVE read_loop;
        END IF;

        SET @sql = CONCAT(
            'UPDATE `', REPLACE(v_table, '`', '``'), '` ',
            'SET `', REPLACE(v_column, '`', '``'), '` = ',
            'REPLACE(`', REPLACE(v_column, '`', '``'),
            '`, ''https://api.zhbl.by'', '''') ',
            'WHERE `', REPLACE(v_column, '`', '``'),
            '` LIKE ''%https://api.zhbl.by%'''
        );

        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;

    END LOOP;

    CLOSE cur;
END$$

DELIMITER ;

CALL remove_api_domain();

DROP PROCEDURE remove_api_domain;