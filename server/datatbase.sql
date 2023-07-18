CREATE DATABASE IF NOT EXISTS your_database_name;
USE your_database_name;

CREATE TABLE code_blocks (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             title VARCHAR(255),
                             code TEXT,
                             solution TEXT

);

INSERT INTO code_blocks (title, code, solution) VALUES
                                          ('Async case', '//print hello world: \n console.log();', '//print hello world: \n console.log("hello world")'),
                                          ('Event handling', 'console.log("Event handling code");', ''),
                                          ('Data manipulation', 'console.log("Data manipulation code");', ''),
                                          ('Promises', 'console.log("Promises code");', '');
