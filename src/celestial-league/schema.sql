CREATE TABLE celestial_users (
    user_id INT(11) NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    current_point INT(11) NOT NULL,
    betting_player TINYINT(4),
    betting_point INT(11) NOT NULL DEFAULT 0,
    last_attendance DATE NOT NULL,
    PRIMARY KEY (user_id),
    INDEX idx_user_name (user_name)
); 